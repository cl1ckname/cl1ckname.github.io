import {RefObject, useEffect} from "react";
import {Polygon, Square} from "@/logic/tree/generator";
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
        ctx.reset()

        let i = 1;
        // console.log(props.squares)
        const factor = height * height / width
        ctx.translate(offsetX, offsetY)
        for (const sq of props.squares) {
            ctx.fillStyle = props.color(sq.number, sq.depth)
            const startX = sq.p.x * factor
            const startY = sq.p.y * factor
            const w = sq.side * factor
            const h = sq.side * factor

            ctx.translate(startX, startY)
            ctx.rotate(sq.a)
            ctx.fillRect(-w/2, -h/2, w,h)
            // ctx.reset()
            ctx.rotate(-sq.a)
            ctx.translate(-startX, -startY)
            i++
            // ctx.fill()
            // ctx.beginPath()
            // ctx.moveTo(offsetX + sq.points[0].x * width, offsetY + sq.points[0].y * height)
            // for (const p of sq.points) {
            //     ctx.lineTo(offsetX+ p.x * width, offsetY + p.y * height)
            // }
            // ctx.closePath()
            // ctx.fill()
            // ctx.scale(1, props.w/props.h)
        }
    }, [canvasRef, props]);

    return <canvas
        ref={canvasRef}
        width={props.w}
        height={props.h}
    />
}