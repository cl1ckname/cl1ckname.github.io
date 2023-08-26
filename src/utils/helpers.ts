export function shift(a: number, x: number) {
    if (a < 0)
        return 0
    if (a > x)
        return x
    return a
}

export function mod(a: number, x: number): number {
    if (a < 0)
        return a + x
    if (a > x)
        return a - x
    return a
}