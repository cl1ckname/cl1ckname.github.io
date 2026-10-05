import { FOCAL, MAX_PER_BUCKET, MAX_VERTS } from "./config";

export const vertexSrc = /* glsl */ `#version 300 es
// Полноэкранный треугольник без буферов.
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const f = (x: number) => x.toFixed(6);

export const fragmentSrc = /* glsl */ `#version 300 es
precision highp float;
precision highp sampler2D;

uniform vec2 uRes;   // размер экрана в CSS-пикселях
uniform float uDpr;
uniform float uTime;
uniform float uScale; // масштаб раскладки дырок (брейкпоинты в renderer.ts)
uniform float uTilt;  // наклон плоскости от зрителя, рад (брейкпоинты в renderer.ts)

// Раскладка из layout.ts:
//  uCells   — строка на ячейку: [cx, cy, vertexCount, round], [inradius, -, -, -],
//             затем вершины «ядра» дырки по две на тексель. Дырка = ядро, раздутое на round;
//  uBuckets — строка на корзину: id ячеек по 4 в тексель, -1 — конец списка;
//  uGrid    — x0, y0, размер корзины, число корзин по x; uGridNy — по y.
uniform sampler2D uCells;
uniform sampler2D uBuckets;
uniform vec4 uGrid;
uniform float uGridNy;

out vec4 fragColor;

// --- Время суток (timeOfDay.ts): палитра в sRGB и направление света ---
uniform vec3 uWater;
uniform vec3 uShadow;
uniform vec3 uFoam;
uniform vec3 uOutline; // контур пены
uniform float uShadowStrength; // сила тени 0..1
uniform float uShadowLen;      // длина тени, px — зависит от высоты солнца или луны
uniform float uShadowSoft;     // полуширина размытого края тени, px
// Откуда светит солнце или луна, рад, по часовой стрелке: 0 — с дальней (верхней) стороны,
// π/2 — справа, π — со стороны зрителя, 3π/2 — слева. Тень падает в противоположную сторону.
uniform float uLightAz;
uniform float uLightGrad; // сила градиента освещённости по сцене (± у краёв экрана)

// --- Колебание краёв ---
const float WOBBLE     = 12.0;              // размах колебания края внутрь дырки, px
const float WOBBLE_SPD = 0.9;              // скорость колебаний
const float WOBBLE_REL = 0.12;             // размах не больше этой доли радиуса дырки

// --- Пена и тень ---
const float OUTLINE_W  = 3.0;              // обводка края пены, px

// Раскладка и камера — из config.ts.
const float FOCAL  = ${f(FOCAL)};
const int MAX_VERTS  = ${MAX_VERTS};
const int BUCKET_TEX = ${MAX_PER_BUCKET / 4};

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

vec2 vert(int id, int k) {
  vec4 t = texelFetch(uCells, ivec2(2 + k / 2, id), 0);
  return (k % 2 == 0) ? t.xy : t.zw;
}

// Точное знаковое расстояние до многоугольника из n вершин (Inigo Quilez, sdPolygon).
float sdPolygon(vec2 p, int id, int n) {
  vec2 v0 = vert(id, 0);
  if (n == 1) return length(p - v0); // пузырёк: ядро — точка
  float d = dot(p - v0, p - v0);
  float s = 1.0;
  vec2 vj = vert(id, n - 1);
  for (int i = 0; i < MAX_VERTS; i++) {
    if (i >= n) break;
    vec2 vi = vert(id, i);
    vec2 e = vj - vi;
    vec2 w = p - vi;
    vec2 b = w - e * clamp(dot(w, e) / dot(e, e), 0.0, 1.0);
    d = min(d, dot(b, b));
    bvec3 c = bvec3(p.y >= vi.y, p.y < vj.y, e.x * w.y > e.y * w.x);
    if (all(c) || all(not(c))) s = -s;
    vj = vi;
  }
  return s * sqrt(d);
}

// Медленное колебание края: гармоники по углу вокруг центра дырки.
// amp — размах, px.
float wobble(vec2 d, vec2 seed, float amp) {
  float ang = atan(d.y, d.x);
  float wob = 0.0;
  for (int k = 2; k <= 4; k++) {
    float fk = float(k);
    vec2 h = hash2(seed + fk * 7.13);
    float spd = WOBBLE_SPD * (0.6 + 0.8 * h.x) * (h.y > 0.5 ? 1.0 : -1.0);
    wob += sin(fk * ang + h.y * 6.2831 + uTime * spd) / (fk - 1.0);
  }
  // Сумма гармоник лежит в [-11/6, 11/6]. Сдвигаем в [0, 1]: край только отступает внутрь
  // дырки, поэтому перемычки пены никогда не становятся тоньше FOAM_W.
  return amp * (0.5 + 0.5 * wob / (11.0 / 6.0));
}

// < 0 внутри дырки, > 0 в пене.
// Дырка — ячейка взвешенной диаграммы Вороного, ужатая на толщину пены, со скруглёнными
// углами: точное расстояние до «ядра» минус радиус скругления. Дырки не пересекаются,
// поэтому минимум по ячейкам корзины — честное расстояние до ближайшей дырки.
float holes(vec2 p) {
  ivec2 b = ivec2(floor((p - uGrid.xy) / uGrid.z));
  if (b.x < 0 || b.y < 0 || b.x >= int(uGrid.w) || b.y >= int(uGridNy)) return 1e3;
  int row = b.y * int(uGrid.w) + b.x;

  float best = 1e3;
  vec4 bestHdr = vec4(0.0);
  float bestInr = 0.0;
  bool done = false;
  for (int t = 0; t < BUCKET_TEX && !done; t++) {
    vec4 ids = texelFetch(uBuckets, ivec2(t, row), 0);
    for (int c = 0; c < 4; c++) {
      int id = int(ids[c]);
      if (id < 0) { done = true; break; }
      vec4 hdr = texelFetch(uCells, ivec2(0, id), 0);
      float d = sdPolygon(p, id, int(hdr.z)) - hdr.w;
      if (d < best) { best = d; bestHdr = hdr; bestInr = texelFetch(uCells, ivec2(1, id), 0).x; }
    }
  }
  if (best >= 1e3) return best;
  // Колебание только у ближайшей дырки. Размах не больше доли её радиуса,
  // чтобы мелкие дырки не гнуло в «арахис».
  float amp = min(WOBBLE * uScale, WOBBLE_REL * bestInr);
  return best + wobble(p - bestHdr.xy, bestHdr.xy * 0.013, amp);
}

// Экранная точка (CSS px от центра, y вверх) → координаты на наклонённой плоскости.
// Должна совпадать с toPlane() в config.ts.
vec2 toPlane(vec2 s) {
  float f = FOCAL * uRes.y;
  float t = f / (f - s.y * tan(uTilt));
  return vec2(s.x * t, s.y * t / cos(uTilt));
}

float mask(float d, float aa) { return smoothstep(-aa, aa, d); }

void main() {
  vec2 s = (gl_FragCoord.xy - 0.5 * uRes * uDpr) / uDpr;
  vec2 p = toPlane(s);

  float dHere   = holes(p);
  vec2 toSun    = vec2(sin(uLightAz), cos(uLightAz)); // на плоскости, y — вдаль
  float dCaster = holes(p + toSun * uShadowLen);
  // Ширина сглаживания ~1 экранный пиксель, учитывая перспективное сжатие.
  float aa = 0.6 * length(fwidth(p));
  // В мелких ячейках поле расстояний пологое — берём его реальный экранный градиент,
  // иначе край размывается. Ограничиваем сверху, чтобы изломы поля не мылили.
  float aaHere   = clamp(0.6 * fwidth(dHere), 0.05 * aa, aa);
  float aaCaster = clamp(0.6 * fwidth(dCaster), 0.05 * aa, aa);

  float foam    = mask(dHere, aaHere);
  // Полутень: ширина перехода растёт с длиной тени, но не уже пикселя.
  float shadow  = mask(dCaster, max(uShadowSoft, aaCaster));
  // Обводку меряем в нормализованном расстоянии: в мелких ячейках поле пологое,
  // и без нормализации 3 px растягиваются в жирную кляксу.
  float px      = length(dFdx(p));
  float grad    = length(vec2(dFdx(dHere), dFdy(dHere))) / max(px, 1e-4);
  float dNorm   = dHere / clamp(grad, 0.25, 1.0);
  float outline = foam * (1.0 - mask(dNorm - OUTLINE_W, aa));

  vec3 col = uWater;
  col = mix(col, uShadow, shadow * uShadowStrength);
  col = mix(col, uFoam, foam);
  col = mix(col, uOutline, outline);

  // Неравномерный свет по листу: к светилу светлее, от него темнее.
  // Считаем в экранных координатах (вдаль — вверх), нормированных на полудиагональ экрана.
  float g = dot(s / (0.5 * length(uRes)), toSun);
  col *= 1.0 + uLightGrad * g;
  fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;
