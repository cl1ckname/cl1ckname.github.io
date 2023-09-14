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
    // const colorsCopy = ([] as RGB[]).concat(props.colors)
    const [preset, setPreset] = useState(props.preset)
    const [colorsCopy, setColorsCopy] = useState<RGB[]>([])

    useEffect(() => {
        const colors: RGB[] = []
        for (let i = 0; i < props.len; i++) {
            if (preset === undefined) return
            colors.push(ParseRGB(ColorCollection[preset].func(i+2, colorsCopy.length+1)))
        }
        setColorsCopy(colors)
        props.onChange(colors)
    }, [preset, props.len]);

    return <fieldset>
        <legend>
            <ColorPicker value={preset} onChange={setPreset}/>
        </legend>
        {colorsCopy.map((c, i) =>
            <input type="color" key={"color" + i} value={RGBToHex(c)} onChange={(e) => {
                colorsCopy[i] = HexToRGB(e.target.value)
                props.onChange(colorsCopy)
            }}/>)
        }
    </fieldset>
}