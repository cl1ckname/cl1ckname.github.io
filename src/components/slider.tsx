import "@/styles/slider.css"
import React, {useCallback, useEffect, useRef} from "react";

export interface SliderProps {
    min: number,
    max: number,
    value: number,
    onChange?: (value: number) => void
    disabled?: boolean
}

export function Slider(props: SliderProps) {
    const range = useRef<HTMLInputElement>(null);


    const getPercent = useCallback(
        (value: number) => Math.round(((value - props.min) / (props.max - props.min)) * 100),
        [props.min, props.max]
    );

    useEffect(() => {
        const percent = getPercent(props.value);

        if (range.current) {
            range.current.style.width = `${percent}%`;
        }
    }, [props.value, getPercent]);

    return <div className="container">
        <input
            type="range"
            min={props.min}
            max={props.max}
            value={props.value}
            onChange={(event) => {
                if (props.onChange)
                    props.onChange(event.target.valueAsNumber)
            }}
            className="thumb"
            title={props.value.toString()}
            style={{zIndex: 5}}
        />
    </div>
}