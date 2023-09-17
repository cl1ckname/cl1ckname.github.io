import {FullfillContrainer} from "@/components/FullfillContainer";
import TreeCanvas from "@/components/tree/TreeCanvas";
import {useState} from "react";
import TreeSettings from "@/components/tree/TreeSettings";
import "@/styles/tree.css"
import ContentSwitch from "@/components/ContentSwitch";
import TreeDescription from "@/components/tree/TreeDescription";
import Layout from "@/components/Layout";


export interface TreeParams {
    n: number
    angle: number
    color: number
    branchLong: number
    alternation: boolean
    amplitude: number
    frequency: number
}

export default function Tree() {

    const [settings, setSettings] = useState<TreeParams>({
        angle: Math.PI / 4,
        n: 2,
        color: 0,
        branchLong: 1,
        alternation: false,
        amplitude: 0,
        frequency: 0.00
    })

    return <Layout title="Tree"
                   settings={<TreeSettings tree={settings} onChange={setSettings}/>}
                   app={
                       <FullfillContrainer>
                           {wh => <TreeCanvas w={wh[0]} h={wh[1]} treeParams={settings}/>}
                       </FullfillContrainer>
                   }
                   description={<TreeDescription/>}
    />
}