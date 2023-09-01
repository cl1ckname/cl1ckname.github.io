import {RefObject, useEffect, useRef} from "react";

interface VectorCanvasViewport {
    offsetX: number
    offsetY: number
    width: number
    height: number
}
interface VectorCanvasProps {
    w: number
    h: number
    polygons: number[][]
    viewport: VectorCanvasViewport
    canvasRef: RefObject<HTMLCanvasElement>
}

export default function VectorCanvas(props: VectorCanvasProps) {
    const canvasRef = props.canvasRef
    useEffect(() => {
        if (!canvasRef.current) {
            return
        }
        const ctx = canvasRef.current.getContext("2d")
        if (!ctx) {
            return
        }
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        for (const p of props.polygons) {
            ctx.fillStyle = '#f00'
            ctx.beginPath()
            ctx.moveTo(p[0], p[1])
                for (let j = 2; j < p.length; j+=2) {
                    ctx.lineTo(p[j], p[j+1])
                }
            ctx.closePath()
            ctx.fill()
        }
    }, [canvasRef, props]);


    return <canvas
        ref={canvasRef}
        width={props.w}
        height={props.h}
    />
}