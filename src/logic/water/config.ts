// Параметры раскладки и камеры — общие для TS (layout.ts) и шейдера.

// --- Раскладка дырок (взвешенная диаграмма Вороного) ---
export const CELL = 230; // средний размер дырки, px (в центре экрана, при масштабе 1)
export const JITTER = 0.9; // разброс центров ячеек: 0 — сетка, 1 — полный хаос
export const SIZE_VAR = 0.4; // разброс размеров дырок: 0 — все похожи, ~0.6 — сильный
export const FOAM_W: [number, number] = [4, 11]; // полутолщина перемычки пены, мин/макс, px
export const ROUND = 120; // скругление углов ячеек, px (при масштабе 1)
// Ячейки, у которых вписанный радиус дырки меньше этой доли CELL, не рисуем —
// на их месте остаётся пена (иначе получаются кривые огрызки).
export const MIN_HOLE = 0.12;

// --- Пузырьки: мелкие круглые дырки в толстых местах пены (стыки дырок, выкинутые ячейки) ---
export const BUBBLE_R: [min: number, max: number] = [0.015, 0.21]; // радиус в долях CELL
export const BUBBLE_GAP = 20; // перемычка пены вокруг пузырька, px

// --- Тень ---
// Длина тени = FOAM_H / tan(высоты солнца или луны над горизонтом), см. timeOfDay.ts.
export const FOAM_H = 85; // высота пены над водой, px: в полдень (солнце на 60°) тень ≈ 50 px
export const SHADOW_MAX = 240; // предел длины тени у горизонта, px
export const SUN_MAX_ELEV = 60; // высота солнца в полдень, градусы
export const MOON_MAX_ELEV = 45; // высота луны в полночь, градусы
// Полутень: край тени размыт тем сильнее, чем длиннее тень (дальше от листа пены).
// Полуширина размытия = SHADOW_SOFT * длина тени, но не меньше SHADOW_SOFT_MIN, px.
export const SHADOW_SOFT = 0.02;
export const SHADOW_SOFT_MIN = 2.5;

// --- Неравномерный свет по листу ---
// Сторона сцены, обращённая к светилу, светлее, противоположная темнее: ±сила у краёв экрана.
// Низкое светило светит вскользь — градиент сильнее, в зените почти ровно.
export const LIGHT_GRAD: [zenith: number, horizon: number] = [0.04, 0.2];
export const MOON_LIGHT_GRAD = 0.6; // луна слабее: множитель к силе градиента ночью

// --- Камера ---
export const TILT = 0.5; // наклон плоскости от зрителя на десктопе, рад (~26°); для телефона и планшета — BREAKPOINTS в renderer.ts
export const FOCAL = 1.3; // фокусное расстояние в долях высоты экрана

// --- Лимиты упаковки в текстуры ---
export const MAX_VERTS = 12; // вершин у ядра одной дырки (чётное)
export const CELL_TEXELS = 2 + MAX_VERTS / 2; // текселей на ячейку: 2 заголовка + вершины
export const MAX_PER_BUCKET = 16; // ячеек в одной корзине (кратно 4)

// Экранная точка (CSS px от центра, y вверх) → координаты на наклонённой плоскости.
// Должна совпадать с toPlane() в шейдере.
export function toPlane(
  sx: number,
  sy: number,
  screenH: number,
  tilt: number,
): [number, number] {
  const f = FOCAL * screenH;
  const t = f / (f - sy * Math.tan(tilt));
  return [sx * t, (sy * t) / Math.cos(tilt)];
}
