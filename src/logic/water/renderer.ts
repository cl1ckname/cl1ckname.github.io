import { CELL_TEXELS, MAX_PER_BUCKET, TILT } from "./config";
import { buildLayout } from "./layout";
import { fragmentSrc, vertexSrc } from "./shaders";
import { lighting } from "./timeOfDay";

// Брейкпоинты по ширине экрана: на телефоне сетка мельче, а плоскость наклонена сильнее.
// scale — масштаб дырок, tilt — наклон плоскости от зрителя, рад.
interface Breakpoint {
  maxWidth: number;
  scale: number;
  tilt: number;
}
const BREAKPOINTS: Breakpoint[] = [
  { maxWidth: 600, scale: 0.55, tilt: 0.7 }, // телефоны (~40°)
  { maxWidth: 1024, scale: 0.75, tilt: 0.65 }, // планшеты (~32°)
];
const DESKTOP: Breakpoint = { maxWidth: Infinity, scale: 1, tilt: TILT };

function breakpoint(width: number) {
  return BREAKPOINTS.find((b) => width <= b.maxWidth) ?? DESKTOP;
}

export interface WaterRenderer {
  /** Задать время суток в часах (0–24), null — снова идти по часам устройства. */
  setTimeOfDay(hour: number | null): void;
  dispose(): void;
}

/** Запускает отрисовку воды на полноэкранном canvas. */
export function startWater(canvas: HTMLCanvasElement, fixedHour: number | null = null): WaterRenderer {
  // Новый узор при каждом запуске.
  const seed = (Math.random() * 2 ** 32) | 0;

  const gl = canvas.getContext("webgl2", { antialias: false });
  if (!gl) throw new Error("WebGL2 не поддерживается");

  function compile(type: number, src: string) {
    const sh = gl!.createShader(type)!;
    gl!.shaderSource(sh, src);
    gl!.compileShader(sh);
    if (!gl!.getShaderParameter(sh, gl!.COMPILE_STATUS)) {
      throw new Error(gl!.getShaderInfoLog(sh) ?? "shader compile error");
    }
    return sh;
  }

  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSrc));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSrc));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "program link error");
  }
  gl.useProgram(program);
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  const u = {
    res: gl.getUniformLocation(program, "uRes"),
    dpr: gl.getUniformLocation(program, "uDpr"),
    time: gl.getUniformLocation(program, "uTime"),
    scale: gl.getUniformLocation(program, "uScale"),
    tilt: gl.getUniformLocation(program, "uTilt"),
    water: gl.getUniformLocation(program, "uWater"),
    shadow: gl.getUniformLocation(program, "uShadow"),
    foam: gl.getUniformLocation(program, "uFoam"),
    outline: gl.getUniformLocation(program, "uOutline"),
    shadowStrength: gl.getUniformLocation(program, "uShadowStrength"),
    shadowLen: gl.getUniformLocation(program, "uShadowLen"),
    lightGrad: gl.getUniformLocation(program, "uLightGrad"),
    shadowSoft: gl.getUniformLocation(program, "uShadowSoft"),
    lightAz: gl.getUniformLocation(program, "uLightAz"),
    cells: gl.getUniformLocation(program, "uCells"),
    buckets: gl.getUniformLocation(program, "uBuckets"),
    grid: gl.getUniformLocation(program, "uGrid"),
    gridNy: gl.getUniformLocation(program, "uGridNy"),
  };

  // Float-текстура для данных: без фильтрации, читается через texelFetch.
  function dataTexture(unit: number) {
    const tex = gl!.createTexture()!;
    gl!.activeTexture(gl!.TEXTURE0 + unit);
    gl!.bindTexture(gl!.TEXTURE_2D, tex);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.NEAREST);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.NEAREST);
    return tex;
  }

  function upload(tex: WebGLTexture, unit: number, width: number, height: number, data: Float32Array) {
    gl!.activeTexture(gl!.TEXTURE0 + unit);
    gl!.bindTexture(gl!.TEXTURE_2D, tex);
    gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA32F, width, height, 0, gl!.RGBA, gl!.FLOAT, data);
  }

  const cellsTex = dataTexture(0);
  const bucketsTex = dataTexture(1);
  gl.uniform1i(u.cells, 0);
  gl.uniform1i(u.buckets, 1);

  let w = 0;
  let h = 0;
  let dpr = 1;
  let scale = 1;
  let tilt = TILT;
  let layoutKey = "";

  function rebuildLayout() {
    const key = `${w}x${h}@${scale}/${tilt}`;
    if (key === layoutKey) return;
    layoutKey = key;
    const layout = buildLayout(w, h, scale, tilt, seed);
    // Пустая раскладка всё равно должна дать валидную текстуру.
    upload(
      cellsTex,
      0,
      CELL_TEXELS,
      Math.max(1, layout.cellCount),
      layout.cellCount ? layout.cells : new Float32Array(CELL_TEXELS * 4)
    );
    upload(bucketsTex, 1, MAX_PER_BUCKET / 4, layout.grid.nx * layout.grid.ny, layout.buckets);
    const { x0, y0, size, nx, ny } = layout.grid;
    gl!.uniform4f(u.grid, x0, y0, size, nx);
    gl!.uniform1f(u.gridNy, ny);
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    ({ scale, tilt } = breakpoint(w));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    gl!.viewport(0, 0, canvas.width, canvas.height);
    rebuildLayout();
  }
  resize();
  window.addEventListener("resize", resize);

  function currentHour() {
    if (fixedHour !== null && Number.isFinite(fixedHour)) return fixedHour;
    const d = new Date();
    return d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
  }

  let raf = 0;
  function frame(now: number) {
    const light = lighting(currentHour());
    gl!.uniform3fv(u.water, light.water);
    gl!.uniform3fv(u.shadow, light.shadow);
    gl!.uniform3fv(u.foam, light.foam);
    gl!.uniform3fv(u.outline, light.outline);
    gl!.uniform1f(u.shadowStrength, light.shadowStrength);
    gl!.uniform1f(u.shadowLen, light.shadowLength);
    gl!.uniform1f(u.lightGrad, light.lightGradient);
    gl!.uniform1f(u.shadowSoft, light.shadowSoftness);
    gl!.uniform1f(u.lightAz, (light.azimuth * Math.PI) / 180);

    gl!.uniform2f(u.res, w, h);
    gl!.uniform1f(u.dpr, dpr);
    gl!.uniform1f(u.time, now / 1000);
    gl!.uniform1f(u.scale, scale);
    gl!.uniform1f(u.tilt, tilt);
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  return {
    setTimeOfDay(hour) {
      fixedHour = hour;
    },
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      gl.deleteTexture(cellsTex);
      gl.deleteTexture(bucketsTex);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
    },
  };
}
