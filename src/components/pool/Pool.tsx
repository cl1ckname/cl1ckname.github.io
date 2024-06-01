import Layout from "@/components/Layout";
import PoolCanvas from "@/components/pool/PoolCanvas";
import {FullfillContrainer} from "@/components/FullfillContainer";
import PoolSettings from "@/components/pool/PoolSettings";
import {useState} from "react";
import {RGB} from "@/logic/pool/RGB";
import PoolDescription from "@/components/pool/PoolDescription";

export interface PoolParams {
    n: number,
    roots: number[],
    colors: RGB[],
    max_its: number,
    rea: number,
    ima: number,
    rec: number,
    imc: number,
}
export default function Pool() {
    const defaultParams: PoolParams = {
        n: 3,
        max_its: 150,
        colors: [
            [255, 0, 0],
            [0, 255, 0],
            [0, 0, 255]
        ],
        roots: [0,4*Math.PI / 3, 2*Math.PI /3,0,1,0,1,1,1,1,1,1],
        rea: 1,
        ima: 0,
        rec: 0,
        imc: 0,
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
        description={<PoolDescription/>}
    />
}