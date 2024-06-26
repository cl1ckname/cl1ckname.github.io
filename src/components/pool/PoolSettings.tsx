import {Slider} from "@/components/slider";
import {PoolParams} from "@/components/pool/Pool";
import SetOfColorForm from "@/components/pool/SetOfColorForm";

interface PoolSettingsProps {
    settings: PoolParams
    onChange: (settings: PoolParams) => void
}

export default function PoolSettings(props: PoolSettingsProps) {
    const settingsCopy = Object.assign({}, props.settings)
    return <form>
        <label>Degree</label>
        <Slider min={2} max={12} value={settingsCopy.n} onChange={n => {
            settingsCopy.n = n
            for (let i = 0; i < n; i++) {
                settingsCopy.roots[i] = Math.PI * 2 / n * i
            }
            props.onChange(settingsCopy)
        }}/>
        <label>Iterations number</label>
        <Slider min={1} max={200} value={settingsCopy.max_its} onChange={n => {
            settingsCopy.max_its = n
            props.onChange(settingsCopy)
        }}/>
        <label>Colors</label>
        <SetOfColorForm preset={0} len={settingsCopy.n} colors={settingsCopy.colors} onChange={c => {
            settingsCopy.colors = c
            props.onChange(settingsCopy)
        }}/>
        <label>Re(a)</label>
        <Slider min={0} max={5} value={settingsCopy.rea} step={0.05} onChange={n => {
            settingsCopy.rea = n
            props.onChange(settingsCopy)
        }}/>

        <label>Im(a)</label>
        <Slider min={0} max={5} value={settingsCopy.ima} step={0.05} onChange={n => {
            settingsCopy.ima = n
            props.onChange(settingsCopy)
        }}/>
        <label>Re(c)</label>
        <Slider min={0} max={5} value={settingsCopy.rec} step={0.05} onChange={n => {
            settingsCopy.rec = n
            props.onChange(settingsCopy)
        }}/>

        <label>Im(c)</label>
        <Slider min={0} max={5} value={settingsCopy.imc} step={0.05} onChange={n => {
            settingsCopy.imc = n
            props.onChange(settingsCopy)
        }}/>
    </form>
}