import {RGB, HexToRGB, RGBToHex, ParseRGB} from "@/logic/pool/RGB"
import ColorPicker from "@/components/ColorPicker";
import {useEffect, useState} from "react";
import ColorCollection from "@/logic/ColorCollection";

interface SetOfColorFormProps {
    colors: RGB[]
    preset: number
    len: number
    onChange: (color: RGB[]) => void
}

export default function SetOfColorForm(props: SetOfColorFormProps) {
    const colorsCopy = ([] as RGB[]).concat(props.colors)
    const [preset, setPreset] = useState(props.preset)
    useEffect(() => {
        for (let i = 0; i < props.len; i++) {
            if (preset === undefined) return
            colorsCopy[i] = ParseRGB(ColorCollection[preset].func(i+2, colorsCopy.length+1))
        }
        props.onChange(colorsCopy)
    }, [preset, props.len]);

    return <fieldset>
        <ColorPicker value={preset} onChange={setPreset}/>
        {colorsCopy.map((c, i) =>
            <input type="color" key={"color" + i} value={RGBToHex(c)} onChange={(e) => {
                colorsCopy[i] = HexToRGB(e.target.value)
                props.onChange(colorsCopy)
            }}/>)
        }
    </fieldset>
}