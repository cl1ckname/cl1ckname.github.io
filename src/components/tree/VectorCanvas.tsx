import {RefObject, useEffect} from "react";
import {drawTree, Polygon, Square} from "@/logic/tree/generator";
import {ColorCollection, ColorFunction} from "@/logic/tree/colors";

interface VectorCanvasViewport {
    offsetX: number
    offsetY: number
    width: number
    height: number
}
interface VectorCanvasProps {
    w: number
    h: number
    color: ColorFunction
    angle: number
    n: number
    viewport: VectorCanvasViewport
    canvasRef: RefObject<HTMLCanvasElement>
}

export default function VectorCanvas(props: VectorCanvasProps) {
    const canvasRef = props.canvasRef
    const {offsetX, offsetY, width, height} = props.viewport;
    useEffect(() => {
        if (!canvasRef.current) {
            return
        }
        const ctx = canvasRef.current.getContext("2d")
        if (!ctx) {
            return
        }

        requestAnimationFrame(() => {
            drawTree(props.angle, props.n, ctx, props.color, width, height, offsetX, offsetY)
        })
    }, [canvasRef, props]);

    return <canvas
        ref={canvasRef}
        width={props.w}
        height={props.h}
    />
}