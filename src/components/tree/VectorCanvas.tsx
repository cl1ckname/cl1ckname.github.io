import {RefObject, useEffect} from "react";
import {Square} from "@/logic/tree/generator";
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
    squares: Square[]
    color: ColorFunction
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
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

        for (const sq of props.squares) {
            ctx.fillStyle = props.color(sq.number, sq.depth)
            ctx.beginPath()
            ctx.moveTo(offsetX + sq.points[0].x * width, offsetY + sq.points[0].y * height)
            for (const p of sq.points) {
                ctx.lineTo(offsetX+ p.x * width, offsetY + p.y * height)
            }
            ctx.closePath()
            ctx.fill()
            // ctx.scale(1, props.w/props.h)
        }
    }, [canvasRef, props]);

    return <canvas
        ref={canvasRef}
        width={props.w}
        height={props.h}
    />
}