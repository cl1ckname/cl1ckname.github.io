export function uniform(a: number, b: number): number {
    return Math.floor(a + (b - a) * Math.random())
}

export function randomAngle(): number {
    return Math.floor(Math.random() * 360)
}