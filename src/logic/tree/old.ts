
const rotate = (o: {x: number,y: number}, p: {x: number, y:number}, angle: number) => {
    const dx = p.x - o.x
    const dy = p.y - o.y
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    return {x: c * dx - s * dy + o.x, y: s * dx + c * dy + o.y}
}

export type figure = {
    points: {x: number, y: number}[]
    number: number
    depth: number
}

type squareType = ((f: figure) => figure)
type triangleType = ((f: figure) => [figure, figure])

export const makeFigures = (angle:number): [triangleType, squareType] => {
    const triangle: triangleType = (f: figure) => {
        const p = f.points

        let size = Math.pow(p[0].x - p[1].x, 2) + Math.pow(p[0].y - p[1].y, 2)
        const ldv = Math.sqrt( size / (Math.pow(p[1].x - p[2].x, 2) + Math.pow(p[1].y - p[2].y, 2 )))
        let sp3 = {x: p[0].x + (p[1].x - p[2].x)*ldv, y: p[0].y + (p[1].y - p[2].y)*ldv}
        let sp4 = {x: p[1].x + (p[1].x - p[2].x)*ldv, y: p[1].y + (p[1].y - p[2].y)*ldv}


        let fl: figure = {points:[sp3, sp4, p[1], p[0]], number:  f.number * 2, depth: f.depth};


        size = Math.pow(p[1].x - p[2].x, 2) + Math.pow(p[1].y - p[2].y, 2)
        const rdv = Math.sqrt( size /  (Math.pow(p[1].x - p[0].x, 2) + Math.pow(p[1].y - p[0].y, 2 )))
        sp4 = {x: p[1].x + (p[1].x - p[0].x)*rdv, y: p[1].y + (p[1].y - p[0].y)*rdv}
        sp3 = {x: p[2].x + (p[1].x - p[0].x)*rdv, y: p[2].y + (p[1].y - p[0].y)*rdv}

        const fr = {points: [sp4, sp3, p[2], p[1]], number: f.number * 2 + 1, depth: f.depth};
        return [fr, fl]

    }
    const square: squareType = (f: figure): figure => {
        const p = f.points
        const o = {x: (p[0].x + p[1].x)/2, y: (p[0].y + p[1].y)/2}
        const rotateAngle = 2 * angle
        const tp3 = rotate(o, p[0], rotateAngle)

        // triangle({points: [p[0], tp3, p[1]], number: f.number, depth: f.depth}, depth)
        return {points: [p[0], tp3, p[1]], number: f.number, depth: f.depth}
    }
    return [triangle, square]
}

export const squareThroughtCoordinates = (x: number,
                                          y: number,
                                          size: number,
                                          number: number,
                                          depth: number): figure => {

    const p1 = {x: x - size / 2, y: y - size / 2 }
    const p2 = {x: x + size / 2, y: y - size / 2 }
    const p3 = {x: x + size / 2, y: y + size / 2 }
    const p4 = {x: x - size / 2, y: y + size / 2 }

    return {points: [p1, p2, p3, p4], number: number, depth: depth}
}

export default function oldGeneration(A: number, n: number): number[][] {
    const CX = 0.5
    const CY = 0.75
    const [triangle, square] = makeFigures(A)
    const firstSq = squareThroughtCoordinates(CX, CY, 0.1, 1, 0)
    let leafs: figure[] = [firstSq]
    let nodes: figure[] = []
    const sqs: number[][] = [firstSq.points.reduce((p,n) => p.concat([n.x, n.y]), [] as number[])]

    for (let i = 0; i < n; i++) {
        leafs.forEach(leaf => {
            nodes.push(square(leaf))
        })
        leafs.forEach(n => {
            sqs.push(n.points.reduce((p,n) => p.concat([n.x, n.y]), [] as number[]))
        })
        leafs.length = 0
        nodes.forEach(node => {
            leafs.push(...triangle(node))
        })
        nodes.length = 0
    }
    return sqs
}