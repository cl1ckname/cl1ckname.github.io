import {TreeParams} from "@/components/tree/Tree";
import {Slider} from "@/components/slider";
import ColorPicker from "@/components/tree/ColorPicker";
import {ColorCollection} from "@/logic/tree/colors";

interface TreeSettingsProps {
    tree: TreeParams,
    onChange: (params: TreeParams) => void
}

export default function TreeSettings(props: TreeSettingsProps) {
    const {onChange, tree} = props
    const treeCopy = Object.assign({}, tree)

    return <form>
        <fieldset>
            <label>Iterations</label>
            <Slider min={0} max={18} value={treeCopy.n} onChange={(n) => {
                treeCopy.n = n
                onChange(treeCopy)
            }}/>
            <label>Angle</label>
            <Slider min={0} max={90} value={treeCopy.angle / Math.PI * 2 * 90} onChange={(a) => {
                treeCopy.angle = Math.PI / 2 / 90 * a
                onChange(treeCopy)
            }}/>
            <label>Branch long</label>
            <Slider min={50} max={400} value={treeCopy.branchLong * 100} onChange={a => {
                treeCopy.branchLong = a / 100
                onChange(treeCopy)
            }}/>
            <label>Alternation</label>
            <fieldset>
                <label>Use alternation</label>
                <input type={"checkbox"} checked={treeCopy.alternation} onChange={b => {
                    treeCopy.alternation = !treeCopy.alternation
                    onChange(treeCopy)
                }}/>
            </fieldset>

            <label>Color</label>
            <ColorPicker value={treeCopy.color} collection={ColorCollection} onChange={e => {
                treeCopy.color = e
                onChange(treeCopy)
            }}/>
        </fieldset>
    </form>
}