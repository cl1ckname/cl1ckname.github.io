import Layout from "@/components/Layout";
import PoolCanvas from "@/components/pool/PoolCanvas";
import {FullfillContrainer} from "@/components/FullfillContainer";

export interface PoolSettings {
    x: number,
    y: number,
    resolution: [number, number],
    n: number,
    scale: number,
    roots: number[],
    colors: number[],
    max_its: number,
}
export default function Pool() {
    const settings: PoolSettings = {
        n: 3,
        x: 0,
        y: 0,
        max_its: 150,
        scale: 1,
        resolution: [700, 700],
        colors: [0xff0000,0x00ff00,0x0000ff,0xf0f0f0,0xff0000,0xff0000,0xff0000,0xff0000,0xff0000,0xff0000,0xff0000,0xff0000],
        roots: [0,4*Math.PI / 3, 2*Math.PI /3,0,1,0,1,1,1,1,1,1]
    }

    return <Layout
        title={"Newton's pool"}
        settings={""}
        app={
            <PoolCanvas
                settings={settings}
                w={700}
                h={700}
            />
        }
        description={""}
    />
}