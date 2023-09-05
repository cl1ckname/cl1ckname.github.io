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
    squares: Square[]
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

        drawTree(props.angle, props.n, ctx, props.color, width, height, offsetX, offsetY)
        // ctx.reset()
        //
        // const factor = height * height / width
        // props.squares.map(sq => {
        //     ctx.fillStyle = props.color(sq.number, sq.depth)
        //     const startX = sq.p.x * factor
        //     const startY = sq.p.y * factor
        //     const w = sq.side * factor
        //     const h = sq.side * factor
        //
        //     ctx.translate(offsetX+startX, offsetY+startY)
        //     ctx.rotate(-sq.a)
        //     ctx.fillRect(-w/2, -h/2, w,h)
        //     ctx.resetTransform()
        // })
    }, [canvasRef, props]);

    return <canvas
        ref={canvasRef}
        width={props.w}
        height={props.h}
    />
}