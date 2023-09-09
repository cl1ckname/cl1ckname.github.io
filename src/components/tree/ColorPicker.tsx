import ColorCollection from "@/logic/tree/ColorCollection";

interface ColorPickerProps {
    value: number
    onChange: (c: number) => void
}

export default function ColorPicker(props: ColorPickerProps) {
    return <select value={props.value} className={"color-picker"} onChange={(e) => {
        props.onChange(Number.parseInt(e.target.value))
    }}>
        {ColorCollection.map(
            (e, i) => <option value={i} key={"opt"+i} style={{
                background: `linear-gradient(${e.func(0,10)}, ${e.func(10,10)})`,
                // color: e.func(5,10)
            }}>{
                e.name
            }</option>)
        }
    </select>
}