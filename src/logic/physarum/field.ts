import {mod, shift} from "@/utils/helpers";

export class Field {
    buffer: Uint8Array
    w: number
    h: number

    constructor(w: number, h: number) {
        this.w = w
        this.h = h
        this.buffer = new Uint8Array(w*h)
        for (let x = 0; x < w*h; x++) {
            this.buffer[x] = Math.random() * 70
        }
    }

    at(x: number, y: number): number {
        x = mod(Math.floor(x), this.w - 1)
        y = mod(Math.floor(y), this.h - 1)
        return this.buffer[y * this.w + x]
    }

    set(x: number, y: number, v: number) {
        x = mod(Math.floor(x), this.w - 1)
        y = mod(Math.floor(y), this.h - 1)
        this.buffer[y * this.w + x] =  shift(v, 255)
    }

    sub(v: number) {
        for (let i = 0; i < this.w*this.h; i++) {
            this.buffer[i] = shift(this.buffer[i] - v, 255)
        }
    }
}