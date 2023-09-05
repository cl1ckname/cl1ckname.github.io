import {ColorFunction} from "@/logic/tree/colors";
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

export type Polygon = {
    points: [Point, Point, Point, Point]
    a: number
    number: number
    depth: number
}

export type Square = {
    p: Point
    a: number
    number: number
    depth: number
    side: number
}
export const makeFigures = (angle: number): (sq: Polygon) => [Polygon, Polygon] => {
    return (sq: Polygon): [Polygon, Polygon] => {
        let tp3: Point
        {
            const p = sq.points
            const o = {x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2}
            const rotateAngle = 2 * angle
            tp3 = rotate(o, p[0], rotateAngle)
        }

        const p = [sq.points[0], tp3, sq.points[1]]

        let size = Math.pow(p[0].x - p[1].x, 2) + Math.pow(p[0].y - p[1].y, 2)
        const ldv = Math.sqrt(size / (Math.pow(p[1].x - p[2].x, 2) + Math.pow(p[1].y - p[2].y, 2)))
        let sp3 = {x: p[0].x + (p[1].x - p[2].x) * ldv, y: p[0].y + (p[1].y - p[2].y) * ldv}
        let sp4 = {x: p[1].x + (p[1].x - p[2].x) * ldv, y: p[1].y + (p[1].y - p[2].y) * ldv}


        let leftSquare: Polygon = {
            points: [sp3, sp4, p[1], p[0]],
            number: sq.number * 2,
            depth: sq.depth,
            a: sq.a - angle
        };


        size = Math.pow(p[1].x - p[2].x, 2) + Math.pow(p[1].y - p[2].y, 2)
        const rdv = Math.sqrt(size / (Math.pow(p[1].x - p[0].x, 2) + Math.pow(p[1].y - p[0].y, 2)))
        sp4 = {x: p[1].x + (p[1].x - p[0].x) * rdv, y: p[1].y + (p[1].y - p[0].y) * rdv}
        sp3 = {x: p[2].x + (p[1].x - p[0].x) * rdv, y: p[2].y + (p[1].y - p[0].y) * rdv}

        const rightSquare: Polygon = {
            points: [sp4, sp3, p[2], p[1]],
            number: sq.number * 2 + 1,
            depth: sq.depth,
            a: sq.a + (Math.PI / 2 - angle)
        };
        return [rightSquare, leftSquare]
    }
}

export const squareByCoordinates = (x: number,
                                    y: number,
                                    size: number,
                                    number: number,
                                    depth: number): Polygon => {

    const p1 = {x: x - size / 2, y: y - size / 2}
    const p2 = {x: x + size / 2, y: y - size / 2}
    const p3 = {x: x + size / 2, y: y + size / 2}
    const p4 = {x: x - size / 2, y: y + size / 2}

    return {points: [p1, p2, p3, p4], number: number, depth: depth, a: 0}
}

export function drawTree(A: number, n: number, ctx: CanvasRenderingContext2D, color: ColorFunction, width: number, heght: number, offsetX: number, offsetY: number) {
    const factor = heght * heght / width
    const produce = makeFigures(A)
    const firstSq = squareByCoordinates(0, 0, 1, 1, n)
    let leafs: PolygonBlob = new PolygonBlob(n)
    leafs.add(firstSq)
    let nodes: PolygonBlob = new PolygonBlob(n)
    ctx.reset()

    function drawLeafs(j: number) {
        const l = leafs.at(j)
        ctx.fillStyle = color(l.number, l.depth)
        const start = center(l.points)
        const b = Math.cos(l.a)
        const a = Math.sin(l.a)
        const side = factor * Math.sqrt((Math.pow(l.points[0].x - l.points[1].x, 2) + Math.pow(l.points[0].y - l.points[1].y, 2)))
        ctx.setTransform(a * side, b * side, -b * side, a * side, offsetX + start.x * factor, offsetY + start.y * factor)
        ctx.fillRect(-0.5, -0.5, 1, 1)
        ctx.resetTransform()
    }

    for (let i = 0; i < n; i++) {
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

function center(p: [Point, Point, Point, Point]): Point {
    return {
        x: p.reduce((i, j) => i + j.x, 0) / 4,
        y: p.reduce((i, j) => i + j.y, 0) / 4,
    }
}