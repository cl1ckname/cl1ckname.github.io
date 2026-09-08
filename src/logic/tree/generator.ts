import {TreeFrag, TreeVert} from "@/logic/tree/shader";
import {Point} from "@/logic/point";

const HALFPI = Math.PI / 2

export interface TreeRenderParams {
    n: number
    angle: number
    colorRoot: string
    colorTip: string
    background: string
    branchLong: number
    alternation: boolean
    wobble: number
    scale: number
    offset: Point
    resol: [number, number]
}

type RGB = [number, number, number]

// "#rrggbb" -> [r, g, b] in 0..1; falls back to black on anything unexpected
function hexToRgb(hex: string): RGB {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
    if (!m) return [0, 0, 0]
    const v = parseInt(m[1], 16)
    return [(v >> 16 & 255) / 255, (v >> 8 & 255) / 255, (v & 255) / 255]
}

// caches the last parsed hex so a wobble frame doesn't re-parse an unchanged colour
function hexMemo(): (hex: string) => RGB {
    let last = "\0"
    let rgb: RGB = [0, 0, 0]
    return (hex) => {
        if (hex !== last) {
            last = hex
            rgb = hexToRgb(hex)
        }
        return rgb
    }
}

function compileShader(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
    const shader = gl.createShader(type)
    if (!shader) throw new Error("unable to create shader")
    gl.shaderSource(shader, src)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(shader)
        gl.deleteShader(shader)
        throw new Error("shader compile error: " + log)
    }
    return shader
}

function linkProgram(gl: WebGL2RenderingContext): WebGLProgram {
    const vs = compileShader(gl, gl.VERTEX_SHADER, TreeVert)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, TreeFrag)
    const program = gl.createProgram()
    if (!program) throw new Error("unable to create program")
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    // the shaders are baked into the program now
    gl.deleteShader(vs)
    gl.deleteShader(fs)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const log = gl.getProgramInfoLog(program)
        gl.deleteProgram(program)
        throw new Error("program link error: " + log)
    }
    return program
}

// column-major 3x3 affine matrix, ready for gl.uniformMatrix3fv
function affine(exx: number, exy: number, eyx: number, eyy: number, tx: number, ty: number): Float32Array {
    return new Float32Array([
        exx, exy, 0,
        eyx, eyy, 0,
        tx, ty, 1,
    ])
}

// canonical child square -> canonical parent square, as a pure similarity.
// The isosceles triangle with base angle `angle` sits on the parent's top edge
// (y = -bl); the child hangs off its left or right leg.
function baseMatrix(angle: number, bl: number, right: boolean): Float32Array {
    const a2 = 2 * angle
    const ax = 0.5 - 0.5 * Math.cos(a2)   // triangle apex, x
    const ay = -0.5 * Math.sin(a2)        // triangle apex, y offset from the edge
    return right
        ? affine(1 - ax, -ay, ay, 1 - ax, ax, ay - bl)
        : affine(ax, ay, -ay, ax, 0, -bl)
}

// wobble on the square that gets drawn: base edge fixed, top edge swung by `wobble`
function wobbleDrawMatrix(wobble: number): Float32Array {
    return affine(1, 0, -Math.sin(wobble), Math.cos(wobble), 0, 0)
}

// wobble carried down a branch: the child's top edge is displaced so the subtree
// grows from the swung edge, matching the original per-node rotation
function wobbleSubtreeMatrix(wobble: number, bl: number): Float32Array {
    return affine(1, 0, 0, 1, bl * Math.sin(wobble), bl * (1 - Math.cos(wobble)))
}

// canonical root square ([0,1] x [0,-bl]) -> centred screen space, with y flipped
function rootMatrix(bl: number): Float32Array {
    return affine(0.3, 0, 0, -0.3, -0.15, -0.15 * bl)
}

const UNIT_QUAD = new Float32Array([
    0, 0,
    1, 0,
    0, 1,
    1, 1,
])

export interface TreeRenderer {
    render(params: TreeRenderParams): void
    dispose(): void
}

export function createTreeRenderer(gl: WebGL2RenderingContext): TreeRenderer {
    const program = linkProgram(gl)

    const u = {
        root: gl.getUniformLocation(program, "u_root"),
        baseL: gl.getUniformLocation(program, "u_baseL"),
        baseR: gl.getUniformLocation(program, "u_baseR"),
        baseLAlt: gl.getUniformLocation(program, "u_baseLAlt"),
        baseRAlt: gl.getUniformLocation(program, "u_baseRAlt"),
        wobbleDraw: gl.getUniformLocation(program, "u_wobbleDraw"),
        wobbleSubtree: gl.getUniformLocation(program, "u_wobbleSubtree"),
        alternation: gl.getUniformLocation(program, "u_alternation"),
        bl: gl.getUniformLocation(program, "u_bl"),
        colorRoot: gl.getUniformLocation(program, "u_colorRoot"),
        colorTip: gl.getUniformLocation(program, "u_colorTip"),
        depth: gl.getUniformLocation(program, "u_depth"),
        scale: gl.getUniformLocation(program, "u_scale"),
        offset: gl.getUniformLocation(program, "u_offset"),
        resol: gl.getUniformLocation(program, "u_resol"),
    }
    const aCorner = gl.getAttribLocation(program, "a_corner")

    const bgColor = hexMemo()
    const rootColor = hexMemo()
    const tipColor = hexMemo()

    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)

    const quadBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, UNIT_QUAD, gl.STATIC_DRAW)
    gl.enableVertexAttribArray(aCorner)
    gl.vertexAttribPointer(aCorner, 2, gl.FLOAT, false, 0, 0)

    gl.bindVertexArray(null)

    return {
        render(p: TreeRenderParams) {
            const bg = bgColor(p.background)
            gl.clearColor(bg[0], bg[1], bg[2], 1.0)
            gl.clear(gl.COLOR_BUFFER_BIT)

            const instanceCount = p.n > 0 ? Math.pow(2, p.n) - 1 : 0
            if (instanceCount === 0) return

            // keep angles just inside (0, pi/2) so the triangle legs never vanish
            const angle = Math.min(Math.max(p.angle, 1e-4), HALFPI - 1e-4)
            const altAngle = HALFPI - angle
            const bl = p.branchLong
            const root = rootColor(p.colorRoot)
            const tip = tipColor(p.colorTip)

            gl.useProgram(program)
            gl.bindVertexArray(vao)

            gl.uniformMatrix3fv(u.root, false, rootMatrix(bl))
            gl.uniformMatrix3fv(u.baseL, false, baseMatrix(angle, bl, false))
            gl.uniformMatrix3fv(u.baseR, false, baseMatrix(angle, bl, true))
            gl.uniformMatrix3fv(u.baseLAlt, false, baseMatrix(altAngle, bl, false))
            gl.uniformMatrix3fv(u.baseRAlt, false, baseMatrix(altAngle, bl, true))
            gl.uniformMatrix3fv(u.wobbleDraw, false, wobbleDrawMatrix(p.wobble))
            gl.uniformMatrix3fv(u.wobbleSubtree, false, wobbleSubtreeMatrix(p.wobble, bl))
            gl.uniform1i(u.alternation, p.alternation ? 1 : 0)
            gl.uniform1f(u.bl, bl)
            gl.uniform3f(u.colorRoot, root[0], root[1], root[2])
            gl.uniform3f(u.colorTip, tip[0], tip[1], tip[2])
            gl.uniform1f(u.depth, p.n)
            gl.uniform1f(u.scale, p.scale)
            gl.uniform2f(u.offset, p.offset.x, p.offset.y)
            gl.uniform2f(u.resol, p.resol[0], p.resol[1])

            gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, instanceCount)
            gl.bindVertexArray(null)
        },

        dispose() {
            gl.deleteProgram(program)
            gl.deleteBuffer(quadBuffer)
            gl.deleteVertexArray(vao)
        },
    }
}
