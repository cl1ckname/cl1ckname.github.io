import {Square} from "@/logic/tree/generator";

export default class PolygonBlob {

    n: number
    len: number
    last: number
    buffer: Float32Array
    constructor(n: number) {
        this.last = 0
        this.n = n
        this.len = Math.pow(2, n-1)
        this.buffer = new Float32Array(10 * this.len)
    }
    
    at(i: number): Square {
        if (i >= this.last) {
            throw "arrrgr"
        }
        const offset = i * 10
        return {
            points: [
                {x: this.buffer[offset], y: this.buffer[offset+1]},
                {x: this.buffer[offset+2], y: this.buffer[offset+3]},
                {x: this.buffer[offset+4], y: this.buffer[offset+5]},
                {x: this.buffer[offset+6], y: this.buffer[offset+7]},
            ],
            a: this.buffer[offset+8],
            number: this.buffer[offset+9],
            depth: this.n
        }
    }

    add(p: Square) {
        const offset = this.last * 10

        for (let i = 0; i < 4; i++) {
            this.buffer[offset + i*2] = p.points[i].x
            this.buffer[offset + i*2+1] = p.points[i].y
        }
        this.buffer[offset + 8] = p.a
        this.buffer[offset+9] = p.number
        this.last += 1
    }

    clear() {
        this.last = 0
    }
}