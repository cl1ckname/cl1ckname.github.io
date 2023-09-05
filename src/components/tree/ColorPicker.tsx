import {ColorCollectionElement} from "@/logic/tree/colors";

interface ColorPickerProps {
    value: number
    collection: ColorCollectionElement[]
    onChange: (c: number) => void
}

export default function ColorPicker(props: ColorPickerProps) {
    return <select value={props.value} onChange={(e) => {
        props.onChange(Number.parseInt(e.target.value))
    }}>
        {props.collection.map(
            (e, i) => <option value={i} key={i}>{e.name}</option>)
        }
    </select>
}