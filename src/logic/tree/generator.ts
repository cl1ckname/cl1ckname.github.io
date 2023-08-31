import {cos, sin} from "@/utils/math";

type Square = [number, number, number, number, number, number, number, number]

function generate(w: number, h: number, A: number, n: number): Square[] {
    const cX = w / 2
    const cY = h * 2 / 3
    const sqs: Square[] = [[0, 0, 100, 0, 100, 100, 0, 100]]

    for (let j = 0; j < n; j++) {
        const leftBuffer: Square[] = []
        const rightBuffer: Square[] = []
        const side = 100 * Math.pow(cos(A), j)

        for (const s of sqs) {
            const left: number[] = []
            for (let i = 0; i < 8; i += 2) {
                const x = s[i]
                const y = s[i + 1]
                const X = x * cos(A) * cos(A) - y * cos(A) * sin(A)
                const Y = x * cos(A) * sin(A) + y * cos(A) * cos(A) - side
                left.push(X, Y)
            }
            leftBuffer.push(left as Square)

            const right: number[] = []
            for (let i = 0; i < 8; i += 2) {
                const x = s[i]
                const y = s[i + 1]
                const X = x * sin(A) * sin(A) + y * sin(A) * cos(A) + side * cos(A) * cos(A)
                const Y = -x * sin(A) * cos(A) + y * sin(A) * sin(A) - side * cos(A) * sin(A)
                right.push(X, Y)
            }
            rightBuffer.push(right as Square)
        }
        sqs.push(...leftBuffer)
        sqs.push(...rightBuffer)
    }

    console.log("len sqs", sqs.length)
    for (let i = 0; i < sqs.length; i ++) {
        for (let j = 0; j < 8; j++) {
            sqs[i][j] += (j % 2) ? cX : cY
        }
    }
    return sqs
}

export default function Generate(w: number, h: number, A: number, n: number): string[] {
    return generate(w, h, A, n).map((i) => i.join(", "))
}