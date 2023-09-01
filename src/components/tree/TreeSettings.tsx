import {TreeParams} from "@/components/tree/Tree";
import {Slider} from "@/components/slider";

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
        </fieldset>
    </form>
}