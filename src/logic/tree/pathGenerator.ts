import {cos, sin, tan} from "@/utils/math";

type Square = [number,number,number,number,number,number,number,number]

class Sq {
    angle: number = 0
    len: number = 0
    points: Square = [0,0,0,0,0,0,0,0]

    A: number
    constructor(A: number) {
        this.A = A
    }
    children(): [Sq, Sq] {
        const left = square(this.points[6], this.points[7], this.angle + this.A, this.A, this.len * cos(this.A))
        const right = square2(this.points[4], this.points[5], this.angle - this.A, this.A, this.len * sin(this.A))
        return [left, right]
    }
}
export default function generatePolygons(w: number, h: number, A: number, n: number): string[] {
    const squares: Sq[] = []
    const leafs: Sq[] = []
    const postleafs: Sq[] = []

    let path: string[] = []


    const initX = w / 2
    const initY = h / 1.25

    const sq1 = square(initX, initY, 0, 45, 100)
    postleafs.push(sq1)

    let generateLen = 100

    for (let i = 0; i < n; i++) {
        generateLen *= cos(A)
        for (const l of postleafs) {
           const [sq2, sq3] = l.children()
            leafs.push(sq2, sq3)
        }
        squares.push(...postleafs)
        postleafs.length = 0
        postleafs.push(...leafs)
        leafs.length = 0
    }
    squares.push(...postleafs)
    postleafs.length = 0
    postleafs.push(...leafs)
    leafs.length = 0

    return squares.map(s => polygon(s.points))
}

function polygon(s: number[]): string {
    for (const i of s) {
        if (Number.isNaN(i)) {
            return ""
        }
    }
    return s.join(", ")
}
function square(x: number, y: number, angle: number, A: number,  size: number): Sq {
    const res: number[] = [x,y]
    res.push(x+size * cos(angle), y - size * sin(angle))
    res.push(x+size * cos(angle) - size * sin(angle), y - size * cos(angle) - size * sin(angle))
    res.push(x + size * sin(angle + 180), y - size * cos(angle))
    const sq = new Sq(A)
    sq.points = res as Square
    sq.angle = angle
    sq.len = size
    return sq
}

function square2(x: number, y: number, angle: number, A: number,  size: number): Sq {
    const res: number[] = []
    res.push(x,y) // 1
    res.push(x - size * cos(angle), y + size * sin(angle)) // 2
    res.push(x - size*cos(angle) - size * sin(angle), y + size * sin(angle) - size * cos(angle)) // 3
    res.push(x - size * sin(angle), y - size * cos(angle)) // 4

    const sq = new Sq(A)
    sq.points = res as Square
    sq.angle = angle
    sq.len = size
    return sq
}
