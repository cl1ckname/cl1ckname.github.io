import "../styles/physarum.css"
import {FullfillContrainer} from "@/components/FullfillContainer";
import Tree from "@/components/tree/Tree";
export default function TreePage() {
    return <div className="App">
        <div className="options-menu thin-scroll">
            <h1>Tree</h1>
        </div>
        <FullfillContrainer>
            {(wh) => {
                return <Tree w={wh[0]} h={wh[1]}/>
            }}
        </FullfillContrainer>

    </div>
}