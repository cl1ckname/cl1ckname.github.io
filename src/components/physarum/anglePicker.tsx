import React from "react";
import {Slider} from "./slider";

export interface AnglePickerProps {
    value: number
    onChange?: (value: number) => void
    disabled?: boolean
}

export function AnglePicker(props: AnglePickerProps) {
    return <Slider min={0} max={360} value={props.value} disabled={props.disabled}
                   onChange={(a) => {
                       if (props.onChange) props.onChange(a)
                   }}/>
}