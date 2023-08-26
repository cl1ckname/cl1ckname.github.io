import React, {useCallback, useEffect, useState, useRef} from "react";
import "@/styles/slider.css"

export interface MultiRangeSliderProps {
    min: number,
    max: number,
    valueMin: number,
    valueMax: number,
    onChange?: (min: number, max: number) => void
    disabledLeft?: boolean
    disabledRight?: boolean
};

export const MultiRangeSlider = (props: MultiRangeSliderProps) => {
    const [minVal, setMinVal] = useState(props.valueMin);
    const [maxVal, setMaxVal] = useState(props.valueMax);
    const minValRef = useRef(props.min);
    const maxValRef = useRef(props.max);
    const range = useRef<HTMLInputElement>(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - props.min) / (props.max - props.min)) * 100),
        [props.min, props.max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);
        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        if (props.onChange)
            props.onChange(minVal, maxVal);
    }, [minVal, maxVal]);

    return (
        <div className="container">
            <input
                type="range"
                min={props.min}
                max={props.max}
                value={minVal}
                disabled={props.disabledLeft}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className="thumb thumb--left"
                style={{zIndex: (minVal > props.max - 100) ? 1 : 5}}
            />
            <input
                type="range"
                min={props.min}
                max={props.max}
                value={maxVal}
                disabled={props.disabledRight}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className="thumb thumb--right"
            />
        </div>
    );
};
