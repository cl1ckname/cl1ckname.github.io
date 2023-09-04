import {ReactNode, RefObject, useCallback, useEffect, useRef, useState} from "react";

interface PanCanvasOpts {
    children: (
        scale: number,
        offsetX: number,
        offsetY: number,
        ref: RefObject<HTMLCanvasElement>
    ) => ReactNode
}

const ZOOM_SENSITIVITY = 500
type Point = {
    x: number;
    y: number;
};
const ORIGIN = Object.freeze({x: 0, y: 0});

function diffPoints(p1: Point, p2: Point) {
    return {x: p1.x - p2.x, y: p1.y - p2.y};
}

function addPoints(p1: Point, p2: Point) {
    return {x: p1.x + p2.x, y: p1.y + p2.y}
}

function scalePoint(p1: Point, scale: number) {
    return {x: p1.x * scale, y: p1.y * scale};
}

export default function PanCanvas(props: PanCanvasOpts) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [scale, setScale] = useState<number>(1);
    const [offset, setOffset] = useState<Point>(ORIGIN);
    const [startPoint, setStartPoint] = useState<Point>(ORIGIN)
    const [startOffset, setStartOffset] = useState<Point>(ORIGIN)
    const [size, setSize] = useState<Point>(ORIGIN)

    useEffect(() => {
        if (canvasRef.current != null) {
            const canvasElem = canvasRef.current
            const w = canvasElem.width
            const h = canvasElem.height
            setSize({x: w, y: h})
        }
    }, []);

    useEffect(() => {
        if (canvasRef.current != null) {
            const canvasElem = canvasRef.current
            const w = canvasElem.width
            const h = canvasElem.height
            // setSize({x: w, y: h})

            canvasElem.onmousedown = (ev: MouseEvent) => {
                setStartPoint({x: ev.clientX, y: ev.clientY})
                console.log("down", startPoint, {x: ev.clientX, y: ev.clientY})
            }
            canvasElem.onmousemove = (ev: MouseEvent) => {
                if (startPoint != ORIGIN) {
                    const cur = {x: ev.clientX, y: ev.clientY}
                    const diffOffset = diffPoints(cur, startPoint)
                    setOffset(addPoints(startOffset, diffOffset))
                }
            }
            canvasElem.onmouseup = (ev: MouseEvent) => {
                if (startPoint != ORIGIN) {
                    setStartPoint(ORIGIN)
                    setStartOffset(offset)
                }
            }
            canvasElem.onwheel = (ev: WheelEvent) => {
                const zoom = - ev.deltaY / ZOOM_SENSITIVITY
                let newScale = Math.max(scale + zoom, 0)
                newScale = Math.min(newScale, 64)
                setScale(newScale)
                const c = {x: size.x * zoom / 2, y: size.y * zoom / 2}
                setOffset(prev => diffPoints(prev, c))
                setStartOffset(offset)
            }
        }
    }, [offset, scale, size, startOffset, startPoint, canvasRef.current]);


    return <>
        {props.children(scale, offset.x, offset.y, canvasRef)}
    </>
}

