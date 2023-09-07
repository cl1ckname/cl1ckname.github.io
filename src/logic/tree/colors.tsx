export type ColorFunction = (number: number, depth: number) => HEX

export interface ColorCollectionElement {
    func: ColorFunction
    name: string
}

type HEX = string

function rgb2hex(r: number, g: number, b: number): HEX {
    return "#" + hexChannel(r) + hexChannel(g) + hexChannel(b)
}

function hexChannel(c: number): string {
    const h = c.toString(16)
    return (h.length == 1) ? "0" + h : h
}

const generateGradient = (color1: number, color2: number) => {
    const r1 = Math.floor(color1 / 16 ** 4)
    const g1 = Math.floor(color1 / 16 ** 2) % 16 ** 2
    const b1 = color1 % 16 ** 2
    const r2 = Math.floor(color2 / 16 ** 4)
    const g2 = Math.floor(color2 / 16 ** 2) % 16 ** 2
    const b2 = color2 % 16 ** 2
    return (number: number, depth: number) => {
        const stage = Math.log2(number) / depth
        const r = Math.floor((r1 * (1 - stage) + r2 * stage))
        const g = Math.floor((g1 * (1 - stage) + g2 * stage))
        const b = Math.floor((b1 * (1 - stage) + b2 * stage))
        return `rgb(${r}, ${g}, ${b})`
    }
}

const GenerateTripleGradient = (color1: number, color2: number, color3: number) => {
    const f1 = generateGradient(color1, color2)
    const f2 = generateGradient(color2, color3)
    return (number: number, depth: number) => {
        if (number / depth < 0.5)
            return f1(number, depth / 2)
        return f2(number / 2, depth / 2)
    }
}

export const violetGrow = (number: number, _: number) => {
    return "#" + Math.floor(0x552266 + 0x020000 * number + 0x000011 * number).toString(16)
}

export const Gradient = (number: number, depth: number) => {
    const step = 1 / depth
    let value = step * number
    return rgb2hex(value, value, value)
}

export const Flare = (number: number, depth: number) => {
    const stage = number / depth
    return rgb2hex(
        Math.floor((0xf1 * (1 - stage) + 0xf5 * stage) / 255),
        Math.floor((0x27 * (1 - stage) + 0xaf * stage) / 255),
        Math.floor((0x11 * (1 - stage) + 0x19 * stage) / 255),
    )
}

export const CloudDischarge = (number: number, depth: number) => {
    const stage = number / depth
    return "#" + (Math.floor(0xababfb * (stage) + 0xa7e083 * stage)).toString(16)
}

export const NoSignal = (number: number, depth: number) => {
    const stage = number / depth
    return "#" + Math.floor(0xababfb * (number) + 0xa7e083 * stage).toString(16)
}


export const ColorCollection: ColorCollectionElement[] = [
    {func: violetGrow, name: 'VioletGrow'},
    {func: Gradient, name: 'Gradient'},
    {func: generateGradient(0xf12711, 0xf5af19), name: 'Flare'},
    {func: generateGradient(0xc31432, 0x240b36), name: 'Witching Hour'},
    {func: generateGradient(0x74ebd5, 0xACB6E5), name: 'Digital Water'},
    {func: generateGradient(0x155799, 0x159957), name: 'Crystal Clear'},
    {func: generateGradient(0x00c3ff, 0xffff1c), name: 'Brady Brady Fun Fun'},
    {func: generateGradient(0x200122, 0x6f0000), name: 'Love, liberty and dusk'},
    {func: generateGradient(0x000000, 0x0f9b0f), name: 'Terminal Meridian'},
    {func: CloudDischarge, name: 'Discharge in the clouds'},
    {func: NoSignal, name: 'No signal'},
    {func: GenerateTripleGradient(0xaa4b6b, 0x6b6b83, 0x3b8d99), name: 'Mariane'},
    {func: GenerateTripleGradient(0x8A2387, 0xE94057, 0xf27121), name: 'Wiretap'},
]