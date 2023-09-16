import ColorCollection from "@/logic/ColorCollection";
import PolygonBlob from "@/logic/tree/polygonBlob";
import {PoolFragShader, PoolVertShader} from "@/logic/pool/Shader";
import {TreeFrag, TreeVert} from "@/logic/tree/shader";

type Point = {
    x: number
    y: number
}

const rotate = (o: Point, p: Point, angle: number) => {
    const dx = p.x - o.x
    const dy = p.y - o.y
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    return {x: c * dx - s * dy + o.x, y: s * dx + c * dy + o.y}
}

export type Square = {
    points: [Point, Point, Point, Point]
    number: number
    depth: number
}
export const makeFigures = (angle: number, branchLong: number, alternation: boolean, nauting: number): (sq: Square) => [Square, Square] => {
    return (sq: Square): [Square, Square] => {
        if (alternation) {
            angle = Math.PI / 2 - angle
        }
        let tp3: Point
        {
            const p = sq.points
            const o = {x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2}
            const rotateAngle = 2 * angle
            tp3 = rotate(o, p[0], rotateAngle)
        }

        const p = [sq.points[0], tp3, sq.points[1]]

        let size = Math.pow(p[0].x - p[1].x, 2) + Math.pow(p[0].y - p[1].y, 2)
        const ldv = Math.sqrt(size / (
            Math.pow(p[1].x - p[2].x, 2) + Math.pow(p[1].y - p[2].y, 2))
        ) * branchLong
        let sp3 = {x: p[0].x + (p[1].x - p[2].x) * ldv, y: p[0].y + (p[1].y - p[2].y) * ldv}
        let sp4 = {x: p[1].x + (p[1].x - p[2].x) * ldv, y: p[1].y + (p[1].y - p[2].y) * ldv}

        sp3 = rotate(p[0], sp3, nauting)
        sp4 = rotate(p[1], sp4, nauting)

        let leftSquare: Square = {
            points: [sp3, sp4, p[1], p[0]],
            number: sq.number * 2,
            depth: sq.depth,
        };


        size = Math.pow(p[1].x - p[2].x, 2) + Math.pow(p[1].y - p[2].y, 2)
        const rdv = Math.sqrt(size / (
            Math.pow(p[1].x - p[0].x, 2) + Math.pow(p[1].y - p[0].y, 2)
        )) * branchLong
        sp4 = {x: p[1].x + (p[1].x - p[0].x) * rdv, y: p[1].y + (p[1].y - p[0].y) * rdv}
        sp3 = {x: p[2].x + (p[1].x - p[0].x) * rdv, y: p[2].y + (p[1].y - p[0].y) * rdv}

        sp3 = rotate(p[2], sp3, nauting)
        sp4 = rotate(p[1], sp4, nauting)

        const rightSquare: Square = {
            points: [sp4, sp3, p[2], p[1]],
            number: sq.number * 2 + 1,
            depth: sq.depth,
        };
        return [rightSquare, leftSquare]
    }
}

interface SquareProps {
    x: number,
    y: number,
    size: number,
    depth: number,
    branchLong: number
}
export const squareByCoordinates = (props: SquareProps): Square => {
    const {x, y, size, branchLong } = props
    const p1 = {x: x - size / 2, y: y - (size*branchLong) / 2}
    const p2 = {x: x + size / 2, y: y - (size*branchLong) / 2}
    const p3 = {x: x + size / 2, y: y + (size*branchLong) / 2}
    const p4 = {x: x - size / 2, y: y + (size*branchLong) / 2}

    return {points: [p1, p2, p3, p4], number: 1, depth: props.depth}
}


interface DrawTreeProps {
    angle: number,
    n: number,
    ctx: WebGLRenderingContext,
    color: number,
    w: number,
    h: number,
    branchLong: number,
    alternation: boolean,
    factor: number,
    nauting: number
}

function prepareBuffers(gl: WebGLRenderingContext, program: WebGLProgram) {
    const triangleVertexBufferObject = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject)
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position")
    if (positionAttributeLocation < 0) {
        throw "invalid vertexAttribLocation"
    }
    gl.enableVertexAttribArray(positionAttributeLocation)
    gl.vertexAttribPointer(
        positionAttributeLocation,
        2,
        gl.FLOAT,
        false,
        2 * Float32Array.BYTES_PER_ELEMENT,
        0
    )
}

export function drawTree(props: DrawTreeProps) {
    const gl = props.ctx
    let {w, h, factor, ctx, branchLong} = props
    w *= factor
    h *= factor
    const produce = makeFigures(props.angle, branchLong, props.alternation, props.nauting)
    const firstSq = squareByCoordinates({
        x: 0, y: 0, size: 0.2, depth: props.n, branchLong
    })
    let leafs: PolygonBlob = new PolygonBlob(props.n)
    leafs.add(firstSq)
    let nodes: PolygonBlob = new PolygonBlob(props.n)

    const color = ColorCollection[props.color].func
    const program = prepareProgram(props.ctx)
    if (!program) return
    prepareBuffers(gl, program);

    for (let i = 0; i < props.n; i++) {
        drawSquares(props.ctx, program, leafs)
        for (let j = 0; j < leafs.last; j++) {
            const l2cpy = leafs.at(j)
            nodes.add(l2cpy)
        }
        leafs.clear()

        for (let j = 0; j < nodes.last; j++) {
            const [sq1, sq2] = produce(nodes.at(j))
            leafs.add(sq1)
            leafs.add(sq2)
        }
        nodes.clear()
    }
}

function prepareProgram(gl: WebGLRenderingContext): WebGLProgram | null {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    if (!vertexShader) return null
    const fragmentShader=  gl.createShader(gl.FRAGMENT_SHADER)
    if (!fragmentShader) return null;

    gl.shaderSource(vertexShader, TreeVert)
    gl.shaderSource(fragmentShader, TreeFrag)
    gl.compileShader(vertexShader)
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error("vert error ", gl.getShaderInfoLog(vertexShader))
        return null
    }
    gl.compileShader(fragmentShader)
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error("frag error", gl.getShaderInfoLog(fragmentShader))
        return null
    }
    const program = gl.createProgram()
    if (!program) return null;
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("link error " + gl.getProgramInfoLog(program))
        return null;
    }
    gl.validateProgram(program)
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error("validate err ", gl.getProgramInfoLog(program))
        return null;
    }
    gl.useProgram(program)

    return program
}

function drawSquares(gl: WebGLRenderingContext, program: WebGLProgram, blob: PolygonBlob) {
    const vaoPoints = [] as number[]
    for (let i = 0; i < blob.last; i++) {
        const sq = blob.at(i)
        for (const p of sq.points) {
            vaoPoints.push(p.x, p.y)
        }
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vaoPoints), gl.STATIC_DRAW)

    for (let i = 0; i < vaoPoints.length / 4; i++) {
        gl.drawArrays(gl.TRIANGLE_FAN, i*4, 4)
    }

}
