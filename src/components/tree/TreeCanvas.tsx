import {useEffect, useRef, useState} from "react";
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
    alternation: boolean;
}

type Point = {
    x: number;
    y: number;
};
const ORIGIN = Object.freeze({x: 0, y: 0});

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
        ctx.setTransform(1,0,0,1,0,0)
        ctx.fillStyle = "#fff"
        ctx.fillRect(0, 0, props.w, props.h)
        ctx.scale(scale, scale)
        ctx.drawImage(ctx2.canvas, offset.x, offset.y)
    }

    useEffect(() => {
        redraw()
    }, [virtualRef.current, ctx, offset, scale]);

    function onPan(delta: number) {
        setScale(prev => prev + delta)
    }

    function onDrag(delta: Point) {
        const scaledDelta = mulPoint(delta, 1/scale)
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
        console.log(props)
        if (ctx.canvas.width) {
            drawTree(props.angle, props.n, virtualCtx, props.color, props.w, props.h, props.branchLong, props.alternation)
            redraw()
        }

    }, [canvasRef, ctx, props]);

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
                width={props.w}
                height={props.h}
        />
    </div>
}

