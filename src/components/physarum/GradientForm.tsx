import {ColorPicker} from "./ColorPicker";
import {makeGradient} from "@/logic/physarum/color";
import {useState} from "react";

interface GradientFormProps {
    from: number
    to: number
    onChange: (g: Uint8Array) => void
}

export function GradientForm(props: GradientFormProps) {
    const startColors: [number, number] = [props.from, props.to]
    const [colors, setColors] = useState(startColors)


    return <fieldset className="gradient-picker">
        <legend>Color</legend>
        <label>Void color <br/>
        <ColorPicker color={colors[0]} onChange={(c) => {
            setColors([c, colors[1]])
            props.onChange(makeGradient(colors[0], colors[1]))
        }}/>
        </label>
        <label>Pheromone color <br/>
        <ColorPicker color={colors[1]} onChange={(c) => {
            setColors([colors[0], c])
            props.onChange(makeGradient(colors[0], colors[1]))
        }}/>
        </label>
    </fieldset>
}
