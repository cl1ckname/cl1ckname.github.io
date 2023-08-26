import {hex} from "@/logic/physarum/color";

interface ColorPickProps {
    color: number
    onChange: (n: number) => void
}

export function ColorPicker(props: ColorPickProps) {
    // const [color, setColor] = useState(props.color)
    const hexColor = hex(props.color)
    return <input type={"color"} value={hexColor} onChange={(e) => {
        const color = e.target.value
        const colorNumber = Number.parseInt(color.slice(1), 16)
        // setColor(colorNumber)
        props.onChange(colorNumber)
    }}/>
}