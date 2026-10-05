import { FOAM_H, LIGHT_GRAD, SHADOW_SOFT, SHADOW_SOFT_MIN, MOON_LIGHT_GRAD, MOON_MAX_ELEV, SHADOW_MAX, SUN_MAX_ELEV } from "./config";

// Время суток: палитра по ключевым кадрам и направление света.
// Время непрерывное (часы 0–24); между кадрами цвета смешиваются в OKLab,
// чтобы переходы вроде «закат → ночь» не проходили через грязно-серый.

export type Phase = "night" | "dawn" | "day" | "sunset";

export interface Palette {
  water: string;
  shadow: string;
  foam: string;
  outline: string;
}

const PALETTES: Record<Phase, Palette> = {
  night: { water: "#0d2f52", shadow: "#071b36", foam: "#a9bfdf", outline: "#000000" },
  dawn: { water: "#4c9fb8", shadow: "#4d5e93", foam: "#ffe0d6", outline: "#000000" },
  day: { water: "#2bb3c0", shadow: "#1b7f9a", foam: "#f4fbff", outline: "#000000" },
  sunset: { water: "#2f8aa3", shadow: "#5b3c78", foam: "#ffc9a3", outline: "#000000" },
};

// Сила тени по фазам: 0 — тени нет, 1 — тень полностью цвета shadow.
const SHADOW_STRENGTH: Record<Phase, number> = {
  night: 0.4, // от луны тень бледная
  dawn: 0.6, // утренняя дымка рассеивает свет
  day: 1.0, // высокое солнце — тень плотная
  sunset: 0.75,
};

// Ключевые кадры по часам. Между соседними кадрами одной фазы — плато,
// между разными — плавный переход.
const KEYFRAMES: [hour: number, phase: Phase][] = [
  [0, "night"],
  [4.5, "night"],
  [6, "dawn"],
  [7, "dawn"],
  [9, "day"],
  [17, "day"],
  [19, "sunset"],
  [20, "sunset"],
  [21.5, "night"],
  [24, "night"],
];

// --- sRGB <-> OKLab (https://bottosson.github.io/posts/oklab/) ---
type Vec3 = [number, number, number];

const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toSrgb = (c: number) => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055);

function hexToOklab(hex: string): Vec3 {
  const n = parseInt(hex.slice(1), 16);
  const r = toLinear(((n >> 16) & 255) / 255);
  const g = toLinear(((n >> 8) & 255) / 255);
  const b = toLinear((n & 255) / 255);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function oklabToSrgb([L, A, B]: Vec3): Vec3 {
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  const clamp = (c: number) => Math.min(1, Math.max(0, toSrgb(c)));
  return [
    clamp(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    clamp(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    clamp(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

const mixLab = (a: Vec3, b: Vec3, t: number): Vec3 => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

const LAB = Object.fromEntries(
  Object.entries(PALETTES).map(([phase, p]) => [
    phase,
    { water: hexToOklab(p.water), shadow: hexToOklab(p.shadow), foam: hexToOklab(p.foam), outline: hexToOklab(p.outline) },
  ]),
) as Record<Phase, Record<keyof Palette, Vec3>>;

export interface Lighting {
  phase: Phase; // ближайшая фаза — для подписи и будущих переключателей
  water: Vec3; // цвета в sRGB 0..1
  shadow: Vec3;
  foam: Vec3;
  outline: Vec3;
  shadowStrength: number; // 0..1
  shadowLength: number; // px
  lightGradient: number; // сила градиента освещённости по сцене, ± у краёв экрана
  shadowSoftness: number; // полуширина размытого края тени, px
  azimuth: number; // откуда светит солнце/луна, градусы по часовой: 0 — вдаль (север), 90 — справа
}

// Восход и закат солнца, часы. Закатная палитра (KEYFRAMES) приходится на низкое солнце.
const SUNRISE = 6;
const SUNSET = 20;

const smooth = (t: number) => t * t * (3 - 2 * t);

export function lighting(hour: number): Lighting {
  const h = ((hour % 24) + 24) % 24;
  let k = 0;
  while (k < KEYFRAMES.length - 2 && h >= KEYFRAMES[k + 1]![0]) k++;
  const [h0, p0] = KEYFRAMES[k]!;
  const [h1, p1] = KEYFRAMES[k + 1]!;
  const t = smooth((h - h0) / (h1 - h0));
  const color = (key: keyof Palette) => oklabToSrgb(mixLab(LAB[p0][key], LAB[p1][key], t));

  // Восток слева, как на карте. Днём солнце идёт от восхода слева (270°) через юг —
  // со стороны зрителя (180°) — к закату справа (90°). Ночью тот же путь продолжает луна:
  // справа через север (вдали, 0°) обратно налево. В момент восхода и заката оба светила
  // у горизонта, поэтому и направление, и длина тени непрерывны.
  const isDay = h >= SUNRISE && h < SUNSET;
  const frac = isDay
    ? (h - SUNRISE) / (SUNSET - SUNRISE)
    : (((h - SUNSET) % 24) + 24) % 24 / (24 - (SUNSET - SUNRISE));
  const azimuth = ((((isDay ? 270 : 90) - 180 * frac) % 360) + 360) % 360;
  const elev = ((isDay ? SUN_MAX_ELEV : MOON_MAX_ELEV) * Math.sin(Math.PI * frac) * Math.PI) / 180;
  const shadowLength = Math.min(SHADOW_MAX, FOAM_H / Math.max(Math.tan(elev), 1e-3));
  const grazing = 1 - Math.sin(Math.max(elev, 0)); // 1 — у горизонта, 0 — в зените
  const lightGradient =
    (LIGHT_GRAD[0] + (LIGHT_GRAD[1] - LIGHT_GRAD[0]) * grazing) * (isDay ? 1 : MOON_LIGHT_GRAD);

  return {
    phase: t < 0.5 ? p0 : p1,
    water: color("water"),
    shadow: color("shadow"),
    foam: color("foam"),
    outline: color("outline"),
    shadowStrength: SHADOW_STRENGTH[p0] + (SHADOW_STRENGTH[p1] - SHADOW_STRENGTH[p0]) * t,
    shadowLength,
    lightGradient,
    shadowSoftness: Math.max(SHADOW_SOFT_MIN, SHADOW_SOFT * shadowLength),
    azimuth,
  };
}
