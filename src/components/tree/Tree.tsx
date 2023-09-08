import {FullfillContrainer} from "@/components/FullfillContainer";
import TreeCanvas from "@/components/tree/TreeCanvas";
import {useState} from "react";
import TreeSettings from "@/components/tree/TreeSettings";
import {ColorCollection} from "@/logic/tree/colors";
import "@/styles/tree.css"


export interface TreeParams {
    n: number
    angle: number
    color: number
    branchLong: number
    alternation: boolean
    amplitude: number
}

export default function Tree() {

    const [settings, setSettings] = useState<TreeParams>({
        angle: Math.PI / 4,
        n: 2,
        color: 0,
        branchLong: 1,
        alternation: false,
        amplitude: 0
    })


    return <div className="App">
        <div className="options-menu thin-scroll">
            <h1>Tree</h1>
            <TreeSettings tree={settings} onChange={setSettings}/>
        </div>
        <FullfillContrainer>
            {(wh) => {
                return <TreeCanvas
                    w={wh[0]}
                    h={wh[1]}
                    angle={settings.angle}
                    n={settings.n}
                    color={ColorCollection[settings.color].func}
                    branchLong={settings.branchLong}
                    alternation={settings.alternation}
                    amplitude={settings.amplitude}
                />
            }}
        </FullfillContrainer>

    </div>
}