import {ColorCollectionElement} from "@/logic/tree/colors";

interface ColorPickerProps {
    value: number
    collection: ColorCollectionElement[]
    onChange: (c: number) => void
}

export default function ColorPicker(props: ColorPickerProps) {
    return <select value={props.value} className={"color-picker"} onChange={(e) => {
        props.onChange(Number.parseInt(e.target.value))
    }}>
        {props.collection.map(
            (e, i) => <option value={i} key={"opt"+i} style={{
                background: `linear-gradient(${e.func(0,10)}, ${e.func(10,10)})`,
                // color: e.func(5,10)
            }}>{
                e.name
            }</option>)
        }
    </select>
}