import {useCallback, useEffect, useRef, useState} from "react";
import {ColorFunction} from "@/logic/tree/colors";
import {drawTree} from "@/logic/tree/generator";
import ViewportCanvas from "@/components/viewportCanvas";

interface PanCanvasOpts {
    w: number
    h: number
    angle: number
    n: number
    color: ColorFunction
    branchLong: number
    alternation: boolean
    amplitude: number
}

type Point = {
    x: number;
    y: number;
};
const ORIGIN = Object.freeze({x: 0, y: 0});
const FACTOR = 4

function diffPoints(p1: Point, p2: Point) {
    return {x: p1.x - p2.x, y: p1.y - p2.y};
}

function mulPoint(p1: Point, a: number) {
    return {x: p1.x * a, y: p1.y * a}
}

export default function TreeCanvas(props: PanCanvasOpts) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const virtualRef = useRef<HTMLCanvasElement>(null)
    const [scale, setScale] = useState<number>(1);
    const [offset, setOffset] = useState<Point>(ORIGIN);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D>()
    const [nauting, setNauting] = useState(Math.PI / 6)
    const [time, setTime] = useState(0)
    function redraw() {
        if (!ctx) {
            return;
        }
        if (!virtualRef.current) {
            return;
        }
        const ctx2 = virtualRef.current.getContext("2d", {
            willReadFrequently: true
        })
        if (!ctx2) {
            return
        }
        // ctx.reset()
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.fillStyle = "#fff"
        ctx.fillRect(0, 0, props.w, props.h)
        ctx.setTransform(scale, 0, 0, scale,
            offset.x + (-props.w / 2) * (FACTOR - 1),
            offset.y + (-props.h / 2) * (FACTOR - 1)
        )
        ctx.drawImage(ctx2.canvas, 0, 0)
        ctx.fillStyle = "#000"
        ctx.fillRect(0,0, 50, 50)
    }

    useEffect(() => {
        redraw()
    }, [virtualRef.current, ctx, offset, scale]);

    function onPan(delta: number) {
        setScale(prev => prev + delta / FACTOR)
    }

    function onDrag(delta: Point) {
        const scaledDelta = mulPoint(delta, 1 / scale)
        setOffset(diffPoints(offset, scaledDelta))
    }

    useEffect(() => {
        if (!canvasRef.current) {
            return
        }
        const ctx = canvasRef.current.getContext("2d")
        if (!ctx) {
            return
        }
        setCtx(ctx)

        if (!virtualRef.current) {
            return
        }
        const virtualCtx = virtualRef.current.getContext("2d", {
            willReadFrequently: true
        })
        if (!virtualCtx) {
            return
        }
        if (ctx.canvas.width) {
            drawTree(
                props.angle,
                props.n, virtualCtx,
                props.color,
                props.w,
                props.h,
                props.branchLong,
                props.alternation,
                FACTOR,
                nauting
            )
            redraw()
        }

    }, [canvasRef, ctx, props, nauting, time]);


    useEffect(() => {
        const animate = () => {
            setNauting(props.amplitude * Math.sin(time))
            setTime(prev => prev + 0.01)
        }
        let timeId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(timeId)
    }, [time]);

    return <div className={"tree"}>
        <ViewportCanvas
            onPan={onPan}
            onScroll={onPan}
            onDrag={onDrag}
            width={props.w}
            height={props.h}
            ref={canvasRef}

        />
        <canvas style={{display: "none"}}
                ref={virtualRef}
                width={props.w * FACTOR}
                height={props.h * FACTOR}
        />
    </div>
}

