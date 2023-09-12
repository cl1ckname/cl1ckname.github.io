import ColorCollection from "@/logic/ColorCollection";
import PolygonBlob from "@/logic/tree/polygonBlob";

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
    ctx: CanvasRenderingContext2D,
    color: number,
    w: number,
    h: number,
    branchLong: number,
    alternation: boolean,
    factor: number,
    nauting: number
}
export function drawTree(props: DrawTreeProps) {
    let {w, h, factor, ctx, branchLong} = props
    w *= factor
    h *= factor
    const produce = makeFigures(props.angle, branchLong, props.alternation, props.nauting)
    const firstSq = squareByCoordinates({
        x: w/2, y: h/2, size: w/factor/10, depth: props.n, branchLong
    })
    let leafs: PolygonBlob = new PolygonBlob(props.n)
    leafs.add(firstSq)
    let nodes: PolygonBlob = new PolygonBlob(props.n)

    const color = ColorCollection[props.color].func
    ctx.setTransform(1,0,0,1,0,0)
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, w, h)
    function drawLeafs(j: number) {
        const l = leafs.at(j)
        ctx.fillStyle = color(l.number, l.depth)
        ctx.lineWidth = 10 * Math.pow(0.707106, Math.log2(l.number))
        ctx.beginPath()
        ctx.moveTo(l.points[0].x, l.points[0].y)
        for (let i = 1; i < 4; i++) {
            ctx.lineTo(l.points[i].x, l.points[i].y)
        }
        ctx.lineTo(l.points[0].x, l.points[0].y)
        ctx.fill()
        ctx.stroke()
    }

    for (let i = 0; i < props.n; i++) {
        for (let j = 0; j < leafs.last; j++) {
            drawLeafs(j);
        }
        for (let j = 0; j < leafs.last; j++) {
            const l2cpy = leafs.at(j)
            nodes.add(l2cpy)
        }
        // console.log(leafs)
        leafs.clear()

        for (let j = 0; j < nodes.last; j++) {
            const [sq1, sq2] = produce(nodes.at(j))
            leafs.add(sq1)
            leafs.add(sq2)
        }
        nodes.clear()
    }
}
