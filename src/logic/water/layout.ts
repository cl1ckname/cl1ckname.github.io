// Раскладка дырок на CPU: взвешенная диаграмма Вороного (power diagram) с честными
// многоугольниками и точными соседями. Результат пакуется в float-текстуры для шейдера.
import {
  BUBBLE_GAP,
  BUBBLE_R,
  CELL,
  CELL_TEXELS,
  SHADOW_MAX,
  SHADOW_SOFT,
  FOAM_W,
  JITTER,
  MAX_PER_BUCKET,
  MAX_VERTS,
  MIN_HOLE,
  ROUND,
  SIZE_VAR,
  toPlane,
} from "./config";

export interface Layout {
  // CELL_TEXELS x cellCount texels RGBA: [cx, cy, vertexCount, round], [inradius, 0, 0, 0],
  // затем вершины ядра дырки по две на тексель. У пузырька ядро — одна точка.
  cells: Float32Array;
  cellCount: number;
  bubbleCount: number;
  buckets: Float32Array; // (MAX_PER_BUCKET / 4) x (nx * ny) texels RGBA
  grid: { x0: number; y0: number; size: number; nx: number; ny: number };
}

interface Site {
  i: number;
  j: number;
  x: number;
  y: number;
  w: number; // вес в px²
}

interface Vertex {
  x: number;
  y: number;
  edge: number; // индекс соседа, по чьей границе идёт ребро к следующей вершине; -1 — рамка
}

// Детерминированный хеш → [0, 1). Раскладка зависит только от seed и номера клетки,
// поэтому при ресайзе узор не перетасовывается, а лишь достраивается.
function hash(seed: number, a: number, b: number, c: number) {
  let x = seed ^ Math.imul(a, 0x27d4eb2d) ^ Math.imul(b, 0x165667b1) ^ Math.imul(c, 0x9e3779b9);
  x = Math.imul(x ^ (x >>> 15), 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

// Знаковое расстояние до многоугольника (точный аналог sdPolygon в шейдере).
function sdPolygon(px: number, py: number, v: [number, number][]) {
  let d = (px - v[0]![0]) ** 2 + (py - v[0]![1]) ** 2;
  let s = 1;
  for (let i = 0, j = v.length - 1; i < v.length; j = i, i++) {
    const [ix, iy] = v[i]!;
    const [jx, jy] = v[j]!;
    const ex = jx - ix;
    const ey = jy - iy;
    const wx = px - ix;
    const wy = py - iy;
    const t = Math.min(1, Math.max(0, (wx * ex + wy * ey) / (ex * ex + ey * ey || 1)));
    d = Math.min(d, (wx - ex * t) ** 2 + (wy - ey * t) ** 2);
    const c = [py >= iy, py < jy, ex * wy > ey * wx];
    if (c.every(Boolean) || c.every((x) => !x)) s = -s;
  }
  return s * Math.sqrt(d);
}

// Дырка для шейдера: ядро (многоугольник или одна точка у пузырька), раздутое на round.
interface Hole {
  core: [number, number][];
  round: number;
  cx: number;
  cy: number;
  inradius: number;
  bbox: [number, number, number, number];
}

// Расстояние от точки до края дырки (< 0 внутри).
const holeDist = (h: Hole, x: number, y: number) =>
  (h.core.length === 1 ? Math.hypot(x - h.cx, y - h.cy) : sdPolygon(x, y, h.core)) - h.round;

// Обрезка выпуклого многоугольника полуплоскостью dot(n, v) <= k (Сазерленд — Ходжман).
function clip(poly: Vertex[], nx: number, ny: number, k: number, label: number): Vertex[] {
  const out: Vertex[] = [];
  for (let a = 0; a < poly.length; a++) {
    const P = poly[a]!;
    const Q = poly[(a + 1) % poly.length]!;
    const dp = nx * P.x + ny * P.y - k;
    const dq = nx * Q.x + ny * Q.y - k;
    const at = (t: number, edge: number): Vertex => ({
      x: P.x + (Q.x - P.x) * t,
      y: P.y + (Q.y - P.y) * t,
      edge,
    });
    if (dp <= 0) {
      out.push(P);
      if (dq > 0) out.push(at(dp / (dp - dq), label));
    } else if (dq <= 0) {
      out.push(at(dp / (dp - dq), P.edge));
    }
  }
  return out;
}

export function buildLayout(screenW: number, screenH: number, scale: number, tilt: number, seed: number): Layout {
  const cs = CELL * scale;

  // Видимая область на плоскости (трапеция из-за наклона) + запас на тень и соседей.
  const corners = [
    toPlane(-screenW / 2, -screenH / 2, screenH, tilt),
    toPlane(screenW / 2, -screenH / 2, screenH, tilt),
    toPlane(-screenW / 2, screenH / 2, screenH, tilt),
    toPlane(screenW / 2, screenH / 2, screenH, tilt),
  ];
  const margin = SHADOW_MAX + 2 * cs;
  const minX = Math.min(...corners.map((c) => c[0])) - margin;
  const maxX = Math.max(...corners.map((c) => c[0])) + margin;
  const minY = Math.min(...corners.map((c) => c[1])) - margin;
  const maxY = Math.max(...corners.map((c) => c[1])) + margin;

  // Центры ячеек: по одному на клетку сетки, плюс ещё 3 клетки за краем для соседей.
  const i0 = Math.floor(minX / cs) - 3;
  const i1 = Math.ceil(maxX / cs) + 3;
  const j0 = Math.floor(minY / cs) - 3;
  const j1 = Math.ceil(maxY / cs) + 3;
  const cols = i1 - i0 + 1;
  const sites: Site[] = [];
  for (let j = j0; j <= j1; j++) {
    for (let i = i0; i <= i1; i++) {
      sites.push({
        i,
        j,
        x: (i + 0.5 + (hash(seed, i, j, 1) - 0.5) * JITTER) * cs,
        y: (j + 0.5 + (hash(seed, i, j, 2) - 0.5) * JITTER) * cs,
        w: SIZE_VAR * (hash(seed, i, j, 3) * 2 - 1) * cs * cs,
      });
    }
  }
  const siteAt = (i: number, j: number) => sites[(j - j0) * cols + (i - i0)];

  // Толщина перемычки — симметрична для пары ячеек.
  const foamW = (a: Site, b: Site) => {
    const [p, q] = a.j < b.j || (a.j === b.j && a.i < b.i) ? [a, b] : [b, a];
    const h = hash(seed, p.i * 7919 + p.j, q.i * 7919 + q.j, 4);
    return FOAM_W[0] + (FOAM_W[1] - FOAM_W[0]) * h;
  };

  const holes: Hole[] = [];
  // Места под пузырьки: вершины ячеек (стыки трёх дырок) и центры выкинутых мелких ячеек.
  const candidates: [number, number][] = [];

  for (const a of sites) {
    // Строим только ячейки, которые могут попасть в кадр.
    if (a.x < minX || a.x > maxX || a.y < minY || a.y > maxY) continue;

    const R = 3 * cs;
    let poly: Vertex[] = [
      { x: a.x - R, y: a.y - R, edge: -1 },
      { x: a.x + R, y: a.y - R, edge: -1 },
      { x: a.x + R, y: a.y + R, edge: -1 },
      { x: a.x - R, y: a.y + R, edge: -1 },
    ];
    const neighbors: Site[] = [];
    for (let dj = -3; dj <= 3 && poly.length; dj++) {
      for (let di = -3; di <= 3 && poly.length; di++) {
        if (!di && !dj) continue;
        const b = siteAt(a.i + di, a.j + dj);
        if (!b) continue;
        // Граница: |x-a|² - wa = |x-b|² - wb  →  2x·(b-a) <= |b|² - |a|² - (wb - wa)
        const nx = 2 * (b.x - a.x);
        const ny = 2 * (b.y - a.y);
        const k = b.x * b.x + b.y * b.y - a.x * a.x - a.y * a.y - (b.w - a.w);
        poly = clip(poly, nx, ny, k, neighbors.length);
        neighbors.push(b);
      }
    }
    if (poly.length < 3) continue; // ячейка «задавлена» соседями
    for (const v of poly) if (v.edge >= 0) candidates.push([v.x, v.y]);
    const polyCenter = (): [number, number] => [
      poly.reduce((sum, v) => sum + v.x, 0) / poly.length,
      poly.reduce((sum, v) => sum + v.y, 0) / poly.length,
    ];

    // Рёбра: внутренняя нормаль и смещение, расстояние до границы = dot(n, p) + o.
    const edges: [number, number, number, number][] = [];
    const used = new Set<number>();
    for (const v of poly) {
      if (v.edge < 0 || used.has(v.edge)) continue;
      used.add(v.edge);
      const b = neighbors[v.edge]!;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.hypot(dx, dy);
      const k = b.x * b.x + b.y * b.y - a.x * a.x - a.y * a.y - (b.w - a.w);
      edges.push([-dx / len, -dy / len, k / (2 * len), foamW(a, b)]);
    }
    // Ячейка, ужатая на толщину пены и ещё на t. Скруглённая дырка — это ужатый на радиус
    // скругления многоугольник, раздутый обратно на тот же радиус (сумма Минковского с кругом).
    const shrink = (t: number) =>
      edges.reduce<Vertex[]>((pl, [nx, ny, o, w]) => (pl.length ? clip(pl, -nx, -ny, o - w - t, -1) : pl), poly);

    // Вписанный радиус дырки — бинарным поиском по t.
    let lo = 0;
    let hi = cs;
    for (let it = 0; it < 20; it++) {
      const mid = (lo + hi) / 2;
      if (shrink(mid).length >= 3) lo = mid;
      else hi = mid;
    }
    const inradius = lo;
    // Огрызки не рисуем — на их месте остаётся пена.
    if (inradius < MIN_HOLE * cs) {
      candidates.push(polyCenter());
      continue;
    }

    // Мелким ячейкам уменьшаем скругление, чтобы они превращались в аккуратный почти-круг.
    const round = Math.min(ROUND * scale, 0.85 * inradius);
    const core = shrink(round);
    if (core.length < 3) {
      candidates.push(polyCenter());
      continue;
    }
    if (core.length > MAX_VERTS) {
      console.warn(`ячейка с ${core.length} вершинами, лимит ${MAX_VERTS}`);
      continue;
    }

    // Центр ядра — точка отсчёта для колебания края.
    let cx = 0;
    let cy = 0;
    for (const v of core) {
      cx += v.x;
      cy += v.y;
    }
    cx /= core.length;
    cy /= core.length;

    const xs = poly.map((v) => v.x);
    const ys = poly.map((v) => v.y);
    holes.push({
      core: core.map((v) => [v.x, v.y]),
      round,
      cx,
      cy,
      inradius,
      bbox: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)],
    });
  }

  // --- Пузырьки: мелкие круглые дырки в толстых местах пены ---
  // Для каждого кандидата ищем свободное место: сдвигаем центр от ближайшей дырки
  // (подъём по полю расстояний), радиус = свободное место − перемычка пены.
  // Ставим от крупных к мелким, учитывая уже поставленные, — пузырьки не слипаются.
  const reach = (BUBBLE_R[1] * cs + BUBBLE_GAP) * 2;
  const near = (x: number, y: number) =>
    holes.filter(
      (h) => x > h.bbox[0] - reach && x < h.bbox[2] + reach && y > h.bbox[1] - reach && y < h.bbox[3] + reach,
    );
  const freeSpace = (x: number, y: number, list: Hole[]) =>
    list.reduce((m, h) => Math.min(m, holeDist(h, x, y)), Infinity);

  const seen = new Set<string>();
  const spots: { x: number; y: number; room: number }[] = [];
  for (let [x, y] of candidates) {
    if (x < minX || x > maxX || y < minY || y > maxY) continue;
    const key = `${Math.round(x)}:${Math.round(y)}`; // вершина общая для трёх ячеек
    if (seen.has(key)) continue;
    seen.add(key);
    const list = near(x, y);
    for (let it = 0; it < 12; it++) {
      const d = freeSpace(x, y, list);
      const e = 1;
      const gx = freeSpace(x + e, y, list) - freeSpace(x - e, y, list);
      const gy = freeSpace(x, y + e, list) - freeSpace(x, y - e, list);
      const g = Math.hypot(gx, gy);
      if (g < 1e-3 || d <= 0) break;
      x += (gx / g) * d * 0.25;
      y += (gy / g) * d * 0.25;
    }
    const room = freeSpace(x, y, list) - BUBBLE_GAP;
    if (room >= BUBBLE_R[0] * cs) spots.push({ x, y, room });
  }
  spots.sort((a, b) => b.room - a.room);
  const holeCount = holes.length;
  for (const { x, y } of spots) {
    const room = freeSpace(x, y, near(x, y)) - BUBBLE_GAP;
    if (room < BUBBLE_R[0] * cs) continue;
    const r = Math.min(room, BUBBLE_R[1] * cs);
    holes.push({ core: [[x, y]], round: r, cx: x, cy: y, inradius: r, bbox: [x - r, y - r, x + r, y + r] });
  }

  // --- Упаковка в текстуру ---
  const stride = CELL_TEXELS * 4;
  const cellData = new Float32Array(holes.length * stride);
  holes.forEach((h, id) => {
    const base = id * stride;
    cellData[base] = h.cx;
    cellData[base + 1] = h.cy;
    cellData[base + 2] = h.core.length;
    cellData[base + 3] = h.round;
    cellData[base + 4] = h.inradius;
    h.core.forEach(([x, y], k) => {
      cellData[base + 8 + k * 2] = x;
      cellData[base + 8 + k * 2 + 1] = y;
    });
  });
  const bboxes = holes.map((h) => h.bbox);

  // Корзины: для каждой клетки грубой сетки — ячейки, чей многоугольник её задевает.
  const size = cs;
  const x0 = Math.floor(minX / size) * size;
  const y0 = Math.floor(minY / size) * size;
  const nx = Math.ceil((maxX - x0) / size);
  const ny = Math.ceil((maxY - y0) / size);
  const buckets = new Float32Array(MAX_PER_BUCKET * nx * ny).fill(-1);
  const fill = new Uint8Array(nx * ny);
  // Запас, чтобы в корзину попадали и дырки чуть за её краем: иначе мягкий край
  // тени и сглаживание обрезались бы на границе корзины.
  const pad = SHADOW_SOFT * SHADOW_MAX + 4;
  bboxes.forEach(([ax, ay, bx, by], id) => {
    const bi0 = Math.max(0, Math.floor((ax - pad - x0) / size));
    const bi1 = Math.min(nx - 1, Math.floor((bx + pad - x0) / size));
    const bj0 = Math.max(0, Math.floor((ay - pad - y0) / size));
    const bj1 = Math.min(ny - 1, Math.floor((by + pad - y0) / size));
    for (let bj = bj0; bj <= bj1; bj++) {
      for (let bi = bi0; bi <= bi1; bi++) {
        const b = bj * nx + bi;
        if (fill[b]! >= MAX_PER_BUCKET) {
          console.warn(`в корзине больше ${MAX_PER_BUCKET} ячеек`);
          continue;
        }
        buckets[b * MAX_PER_BUCKET + fill[b]!] = id;
        fill[b] = fill[b]! + 1;
      }
    }
  });

  return {
    cells: cellData,
    cellCount: holes.length,
    bubbleCount: holes.length - holeCount,
    buckets,
    grid: { x0, y0, size, nx, ny },
  };
}
