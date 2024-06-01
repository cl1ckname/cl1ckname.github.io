import {useEffect, useRef, useState} from "react";
import {drawTree} from "@/logic/tree/generator";
import ViewportCanvas from "@/components/viewportCanvas";
import {TreeParams} from "@/components/tree/Tree";

interface PanCanvasOpts{
    w: number
    h: number
    treeParams: TreeParams
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
    const [scale, setScale] = useState<number>(1);
    const [offset, setOffset] = useState<Point>(ORIGIN);
    const [gl, setGl] = useState<WebGLRenderingContext>()
    const [nauting, setNauting] = useState(Math.PI / 6)
    const [time, setTime] = useState(0)
    function redraw() {
        if (!gl) {
            return;
        }
        gl.clearColor(0.4, 0.3, 0.7, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        drawTree({
            ...props.treeParams,
            ctx: gl,
            nauting: nauting,
            scale,
            offset
        })
    }

    useEffect(() => {
        redraw()
    }, [canvasRef.current, gl, offset, scale, time, nauting]);

    function onPan(delta: number) {
        setScale(prev => prev + delta)
    }

    function onDrag(delta: Point) {
        delta.x /= props.w
        delta.y /= -props.h
        const scaledDelta = mulPoint(delta, Math.exp(scale-1))
        setOffset(diffPoints(offset, scaledDelta))
    }

    useEffect(() => {
        if (props.w == 0) {
            return;
        }
        if (!canvasRef.current) {
            return
        }
        const gl = canvasRef.current.getContext("webgl")
        if (!gl) {
            return
        }
        setGl(gl)
        if (!gl.canvas.width) {
            return;
        }

        redraw()

    }, [canvasRef, gl, props, time]);


    useEffect(() => {
        const animate = () => {
            setNauting(props.treeParams.amplitude * Math.sin(time))
            setTime(prev => prev + props.treeParams.frequency)
        }
        let timeId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(timeId)
    }, [time, nauting]);

    return <div className={"tree"}>
        <ViewportCanvas
            onPan={onPan}
            onScroll={onPan}
            onDrag={onDrag}
            width={props.w}
            height={props.h}
            ref={canvasRef}

        />
    </div>
}

