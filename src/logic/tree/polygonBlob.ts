import {Square} from "@/logic/tree/generator";

export default class PolygonBlob {

    n: number
    len: number
    last: number
    buffer: Float32Array
    vertexBuffer: Float32Array
    constructor(n: number) {
        this.last = 0
        this.n = n
        this.len = Math.pow(2, n-1)
        this.buffer = new Float32Array(2 * this.len)
        this.vertexBuffer = new Float32Array(8 * this.len)
    }
    
    at(i: number): Square {
        if (i >= this.last) {
            throw "arrrgr"
        }
        const offset = i * 8
        return {
            points: [
                {x: this.vertexBuffer[offset], y: this.vertexBuffer[offset+1]},
                {x: this.vertexBuffer[offset+2], y: this.vertexBuffer[offset+3]},
                {x: this.vertexBuffer[offset+4], y: this.vertexBuffer[offset+5]},
                {x: this.vertexBuffer[offset+6], y: this.vertexBuffer[offset+7]},
            ],
            number: this.buffer[i],
        }
    }

    add(p: Square) {
        const offset = this.last * 8

        for (let i = 0; i < 4; i++) {
            this.vertexBuffer[offset + i*2] = p.points[i].x
            this.vertexBuffer[offset + i*2+1] = -p.points[i].y
        }
        this.buffer[this.last] = p.number
        this.last += 1
    }

    clear() {
        this.last = 0
    }
}