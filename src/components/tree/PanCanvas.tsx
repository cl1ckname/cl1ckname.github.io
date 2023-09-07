import {ReactNode, RefObject, useEffect, useRef, useState} from "react";
import {ColorFunction} from "@/logic/tree/colors";
import {drawTree} from "@/logic/tree/generator";

interface PanCanvasOpts {
    w: number
    h: number
    angle: number
    n: number
    color: ColorFunction
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

export default function PanCanvas(props: PanCanvasOpts) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [scale, setScale] = useState<number>(1);
    const [offset, setOffset] = useState<Point>(ORIGIN);
    const [startPoint, setStartPoint] = useState<Point>(ORIGIN)
    const [startOffset, setStartOffset] = useState<Point>(ORIGIN)
    const [ctx, setCtx] = useState<CanvasRenderingContext2D>()
    const [imdata, setImdata] = useState<ImageData>()

    function redraw() {
        if (!ctx) {
            return;
        }
        if (!imdata) {
            return
        }
        ctx.reset()
        // ctx.setTransform(scale, 0, 0, scale, offset.x, offset.y)
        ctx.putImageData(imdata, 0,0)
    }

    useEffect(() => {
        if (canvasRef.current != null) {
            const canvasElem = canvasRef.current
            const w = canvasRef.current.width
            const h = canvasRef.current.height

            canvasElem.onmousedown = (ev: MouseEvent) => {
                setStartPoint({x: ev.clientX, y: ev.clientY})
            }
            canvasElem.onmousemove = (ev: MouseEvent) => {
                if (startPoint != ORIGIN) {
                    const cur = {x: ev.clientX, y: ev.clientY}
                    const diffOffset = diffPoints(cur, startPoint)
                    setOffset(addPoints(startOffset, diffOffset))
                }
            }
            canvasElem.onmouseup = (_: MouseEvent) => {
                if (startPoint != ORIGIN) {
                    setStartPoint(ORIGIN)
                    setStartOffset(offset)
                    redraw()
                }
            }
            canvasElem.onwheel = (ev: WheelEvent) => {
                const zoom = -ev.deltaY / ZOOM_SENSITIVITY
                let newScale = Math.max(scale + zoom, 0)
                newScale = Math.min(newScale, 64)
                setScale(newScale)

                const c = {x: w * zoom / 2, y: h * zoom / 2}
                setOffset(prev => diffPoints(prev, c))
                setStartOffset(offset)
                redraw()
            }
        }
    }, [offset, scale, startOffset, startPoint, canvasRef.current, ctx]);

    useEffect(() => {
        if (!canvasRef.current) {
            return
        }
        const ctx = canvasRef.current.getContext("2d")
        if (!ctx) {
            return
        }
        setCtx(ctx)

        if (ctx.canvas.width) {
            drawTree(props.angle, props.n, ctx, props.color, props.w, props.h)
            setImdata(ctx.getImageData(0, 0, props.w, props.h))
            redraw()
        }

    }, [canvasRef, ctx, props]);

    return <canvas  ref={canvasRef}
                    width={props.w}
                    height={props.h}/>
}

