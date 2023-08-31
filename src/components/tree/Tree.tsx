import {FullfillContrainer} from "@/components/FullfillContainer";
import TreeSVG from "@/components/tree/TreeSVG";
import {useState} from "react";
import TreeSettings from "@/components/tree/TreeSettings";


export interface TreeParams {
    n: number
    angle: number
}
export default function Tree() {

    const [settings, setSettings] = useState<TreeParams>({
        angle: Math.PI / 4,
        n: 2,
    })


    return <div className="App">
        <div className="options-menu thin-scroll">
            <h1>Tree</h1>
            <TreeSettings tree={settings} onChange={setSettings}/>
        </div>
        <FullfillContrainer>
            {(wh) => {
                return <TreeSVG w={wh[0]} h={wh[1]} angle={settings.angle} n={settings.n}/>
            }}
        </FullfillContrainer>

    </div>
}