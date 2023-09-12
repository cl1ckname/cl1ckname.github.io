export type RGB = [number, number, number]

export function HexToRGB(h: string): RGB {
    const res = [0, 0, 0] as RGB
    if (h.length != 7) {
        throw "not hex: " + h
    }
    res[0] = Number.parseInt(h.slice(1, 3), 16)
    res[1] = Number.parseInt(h.slice(3, 5), 16)
    res[2] = Number.parseInt(h.slice(5, 7), 16)
    return res
}

export function RGBToHex(c: RGB): string {
    return "#" +
        ((c[0] < 16) ? "0" + c[0].toString(16) : c[0].toString(16)) +
        ((c[1] < 16) ? "0" + c[1].toString(16) : c[1].toString(16)) +
        ((c[2] < 16) ? "0" + c[2].toString(16) : c[2].toString(16))
}

export function ParseRGB(c: string): RGB {
    const matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
    const match = matchColors.exec(c);
    if (!match) {
        throw "invalid color format " + c
    }
    if (match.length != 4) {
        throw "invalid color len " + match.length + " " + c
    }
    return match.slice(1).map(c => Number.parseInt(c)) as RGB
}