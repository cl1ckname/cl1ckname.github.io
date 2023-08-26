import React, {useEffect, useRef} from "react";
import {Cup, PopulationProps} from "@/logic/physarum/cup";
import {Config} from "@/logic/physarum/config";

export interface PhysarumProps {
    w: number
    h: number
    color: Uint8Array
    populationProps: PopulationProps
    agentConfig: Config
}
export function Physarum(props: PhysarumProps) {
    let then = 0
    let fpsInterval = 1000 / 30
    let canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef<HTMLCanvasElement>()
    let canvas: HTMLCanvasElement | null = null
    let cup: Cup | null = null
    const frame = useRef(0)

    useEffect(() => {
        canvas = canvasRef.current as HTMLCanvasElement
        if (canvas) {
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
            ctx.canvas.width = props.w
            ctx.canvas.height = props.h
            cup = new Cup({
                ...props,
                ctx: ctx
            })
            cup.Update = cup.Update.bind(cup)
            frame.current = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(frame.current);
        }
    }, [props])
    const animate = () => {
        frame.current = requestAnimationFrame(animate);
        const now = Date.now()

        const elapsed = now - then
        if (elapsed > fpsInterval && cup) {
            then = now - (elapsed % fpsInterval)
            cup.Update()
        }

    }

    return (
        <div className="physarum">
            <canvas ref={canvasRef} />
        </div>
    );
}