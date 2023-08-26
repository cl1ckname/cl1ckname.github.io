export function makeGradient(from: number, to: number): Uint8Array {
    const res = new Uint8Array(256 * 3)
    for (let i = 0; i < 256; i++) {
        const rgb = mix(from, to, i / 255)
        res[i*3] = rgb[0]
        res[i*3+1] = rgb[1]
        res[i*3+2] = rgb[2]
    }
    return res
}

export function hex(c: number): string {
    const rgb = channels(c)
    return rgb.map(fillChannel).reduce((p, v) => p + v, "#")
}

export function opposite(c: number): number {
    const [r,g,b] = channels(c)
    return ((255 - r) << 16) + ((255 - g) << 8) + (255 - b)
}

function mix(c1: number, c2: number, ratio: number): [number, number, number] {
    const ch1 = channels(c1)
    const ch2 = channels(c2)
    const res: [number, number, number] = [0,0,0]
    ch1.forEach((v, i) => {
        res[i] = Math.floor(v * (1 - ratio) + ch2[i] * ratio)
    })
    return res
}


function channels(c: number): [number, number, number] {
    const r = (c & 0xff0000) >> 16
    const g = (c & 0x00ff00) >> 8
    const b = (c & 0x0000ff) >> 0
    return [r,g,b]
}

function fillChannel(c: number): string {
    const rawC = c.toString(16)
    return (rawC.length === 1) ? "0" + rawC : rawC
}