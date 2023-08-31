import {mod} from "./helpers";

const pi180 = (Math.PI/180);

export function sin(a: number): number {
    return angles[mod(Math.floor(a), 360)]
}

export function cos(a: number): number {
    return sin(a + 90)
}

export function tan(a: number): number {
    return sin(a) / cos(a)
}
export const angles =[...new Array(360).fill(0)].map((_,i) => (
    Math.sin(i * pi180)
));