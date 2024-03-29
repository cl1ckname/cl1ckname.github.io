export type ColorFunction = (number: number, depth: number) => [number, number, number]

export interface ColorCollectionElement {
    func: ColorFunction
    name: string
}

type HEX = string
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
        return [r,g,b] as [number,number,number]
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

const violetGrow = (number: number, _: number): [number,number,number] => {
    const r = Math.floor(0x66 + 0x11 * number) % 256
    const g = Math.floor(0x22)
    const b = Math.floor(0x55 + 0x2 * number) % 256
    return [r,g,b]
}


const Gradient = (number: number, depth: number): [number,number,number] => {
    const step = 1 / depth
    let value = Math.floor(step * number * 255)
    return [value,value,value]
}

const CloudDischarge = (number: number, depth: number): [number,number,number] => {
    const stage = number / depth
    const r = Math.floor(0xab * stage + 0xa7 * stage) % 256
    const g = Math.floor(0xab * stage + 0xe0 * stage) % 256
    const b = Math.floor(0xfb * stage + 0x83 * stage) % 256
    return [r, g, b]
}

const NoSignal = (number: number, depth: number): [number,number,number] => {
    const stage = number / depth
    const r = Math.floor(0xab * number + 0xa7 * stage) % 256
    const g = Math.floor(0xab * number + 0xe0 * stage) % 256
    const b = Math.floor(0xfb * number + 0x83 * stage) % 256
    return [r,g,b]
}

const ColorCollection: ColorCollectionElement[] = [
    {func: violetGrow, name: 'VioletGrow'},
    {func: Gradient, name: 'Gradient'},
    {func: generateGradient(0xf12711, 0xf5af19), name: 'Flare'},
    {func: generateGradient(0xc31432, 0x240b36), name: 'Witching Hour'},
    {func: generateGradient(0x74ebd5, 0xACB6E5), name: 'Digital Water'},
    {func: generateGradient(0x155799, 0x159957), name: 'Crystal Clear'},
    {func: generateGradient(0x00c3ff, 0xffff1c), name: 'Brady Brady Fun Fun'},
    {func: generateGradient(0x200122, 0x6f0000), name: 'Love, liberty and dusk'},
    {func: generateGradient(0x000000, 0x0f9b0f), name: 'Terminal Meridian'},
    {func: generateGradient(0xfceabb, 0xf8b500), name: "Sun on the Horizon"},
    {func: generateGradient(0x2C3E50, 0x4CA1AF), name: "Deep Sea Space"},
    {func: generateGradient(0x9796f0, 0xfbc7d4), name: "Anamnisar"},
    {func: CloudDischarge, name: 'Discharge in the clouds'},
    {func: NoSignal, name: 'No signal'},
    {func: GenerateTripleGradient(0xaa4b6b, 0x6b6b83, 0x3b8d99), name: 'Mariane'},
    {func: GenerateTripleGradient(0x8A2387, 0xE94057, 0xf27121), name: 'Wiretap'},
    {func: GenerateTripleGradient(0x12c2e9, 0xc471ed, 0xf64f59), name: "JShine"},
    {func: GenerateTripleGradient(0x40E0D0, 0xFF8C00, 0xf64f59), name: "Wedding Day Bluez"},
    {func: GenerateTripleGradient(0xA770EF, 0xCF8BF3, 0xf64f59), name: "Radar"}
]

export default ColorCollection