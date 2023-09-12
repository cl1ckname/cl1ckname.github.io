import Layout from "@/components/Layout";
import PoolCanvas from "@/components/pool/PoolCanvas";
import {FullfillContrainer} from "@/components/FullfillContainer";
import PoolSettings from "@/components/pool/PoolSettings";
import {useState} from "react";
import {RGB} from "@/logic/pool/RGB";

export interface PoolParams {
    x: number,
    y: number,
    resolution: [number, number],
    n: number,
    scale: number,
    roots: number[],
    colors: RGB[],
    max_its: number,
}
export default function Pool() {
    const defaultParams: PoolParams = {
        n: 3,
        x: 0,
        y: 0,
        max_its: 150,
        scale: 1,
        resolution: [700, 700],
        colors: [
            [255, 0, 0],
            [0, 255, 0],
            [0, 0, 255]
        ],
        roots: [0,4*Math.PI / 3, 2*Math.PI /3,0,1,0,1,1,1,1,1,1]
    }
    const [params, setParams] = useState(defaultParams)

    return <Layout
        title={"Newton's pool"}
        settings={<PoolSettings settings={params} onChange={setParams}/>}
        app={
        <FullfillContrainer>
            {wh => <PoolCanvas
                settings={params}
                w={wh[0]}
                h={wh[1]}
            />}
        </FullfillContrainer>
        }
        description={""}
    />
}