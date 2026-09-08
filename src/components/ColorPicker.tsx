import ColorCollection from "@/logic/ColorCollection";

interface ColorPickerProps {
    value: number
    onChange: (c: number) => void
}

// styles are inline: this component is used from the pool page, which does not
// pull in tree.css where the ".color-picker" rules used to live.
export default function ColorPicker(props: ColorPickerProps) {
    return <select
        value={props.value}
        className={"color-picker"}
        style={{
            fontSize: "1.2em",
            textAlign: "center",
            width: "100%",
            border: 0,
            backgroundColor: "rgba(211, 211, 211, 0.69)",
            marginTop: "0.4em",
        }}
        onChange={(e) => {
            props.onChange(Number.parseInt(e.target.value))
        }}
    >
        {ColorCollection.map((e, i) => (
            <option
                value={i}
                key={"opt" + i}
                style={{
                    fontSize: "0.8em",
                    background: `linear-gradient(${e.func(0, 10)}, ${e.func(10, 10)})`,
                }}
            >
                {e.name}
            </option>
        ))}
    </select>
}
