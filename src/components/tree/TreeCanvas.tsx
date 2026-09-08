import {useEffect, useRef} from "react";
import {createTreeRenderer, TreeRenderer} from "@/logic/tree/generator";
import ViewportCanvas from "@/components/viewportCanvas";
import {TreeParams} from "@/components/tree/Tree";
import {Point} from "@/logic/point";

interface PanCanvasOpts {
    w: number
    h: number
    treeParams: TreeParams
}

export default function TreeCanvas(props: PanCanvasOpts) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const glRef = useRef<WebGL2RenderingContext | null>(null)
    const rendererRef = useRef<TreeRenderer | null>(null)

    // live params / camera the render loop reads without re-subscribing every frame
    const paramsRef = useRef(props.treeParams)
    paramsRef.current = props.treeParams

    const sizeRef = useRef<[number, number]>([props.w, props.h])
    sizeRef.current = [props.w, props.h]

    const cameraRef = useRef<{ scale: number; offset: Point }>({scale: 1, offset: {x: 0, y: 0}})

    // spin up the WebGL2 context + renderer once the canvas has a real size
    useEffect(() => {
        if (rendererRef.current || !canvasRef.current || !props.w || !props.h) {
            return
        }
        const gl = canvasRef.current.getContext("webgl2", {
            alpha: false,
            antialias: true,
            depth: false,
        })
        if (!gl) {
            console.error("WebGL2 is not supported in this browser")
            return
        }
        glRef.current = gl
        rendererRef.current = createTreeRenderer(gl)
    }, [props.w, props.h])

    useEffect(() => () => {
        rendererRef.current?.dispose()
        rendererRef.current = null
    }, [])

    // keep the drawing-buffer viewport in sync with the canvas element size
    useEffect(() => {
        if (glRef.current && props.w && props.h) {
            glRef.current.viewport(0, 0, props.w, props.h)
        }
    }, [props.w, props.h])

    // one render loop for the lifetime of the component. A frame is a few uniform
    // updates + one instanced draw, but we still skip it entirely when nothing
    // moved: only redraw while wobbling or after params / camera / size changed.
    useEffect(() => {
        let raf = 0
        let time = 0

        let lastParams: TreeParams | null = null
        let lastOffset: Point | null = null
        let lastScale = NaN
        let lastW = NaN
        let lastH = NaN

        const frame = () => {
            raf = requestAnimationFrame(frame)

            const renderer = rendererRef.current
            if (!renderer) {
                return
            }

            const p = paramsRef.current
            const cam = cameraRef.current
            const [w, h] = sizeRef.current
            const wobbling = p.amplitude !== 0 && p.frequency !== 0

            if (wobbling) {
                time = (time + p.frequency) % (2 * Math.PI)
            }

            const dirty =
                wobbling ||
                p !== lastParams ||
                cam.offset !== lastOffset ||
                cam.scale !== lastScale ||
                w !== lastW ||
                h !== lastH
            if (!dirty) {
                return
            }
            lastParams = p
            lastOffset = cam.offset
            lastScale = cam.scale
            lastW = w
            lastH = h

            renderer.render({
                n: p.n,
                angle: p.angle,
                colorRoot: p.colorRoot,
                colorTip: p.colorTip,
                background: p.background,
                branchLong: p.branchLong,
                alternation: p.alternation,
                wobble: wobbling ? p.amplitude * Math.sin(time) : 0,
                scale: Math.exp(cam.scale - 1),
                offset: cam.offset,
                resol: sizeRef.current,
            })
        }
        raf = requestAnimationFrame(frame)
        return () => cancelAnimationFrame(raf)
    }, [])

    // zoom toward the cursor / pinch midpoint: the world point under `focus`
    // stays put while the scale changes. `focus` is in canvas CSS pixels;
    // `offset` is in clip space, so the fixed-point math is done there.
    function onZoom(delta: number, focus: Point) {
        const [w, h] = sizeRef.current
        if (!w || !h) {
            return
        }
        const cam = cameraRef.current
        const nextScale = Math.min(Math.max(cam.scale + delta, -10), 15)
        const ratio = Math.exp(nextScale - cam.scale) // = exp(next-1) / exp(cur-1)

        const fx = (2 * focus.x) / w - 1
        const fy = 1 - (2 * focus.y) / h
        cam.offset = {
            x: fx - (fx - cam.offset.x) * ratio,
            y: fy - (fy - cam.offset.y) * ratio,
        }
        cam.scale = nextScale
    }

    function onDrag(delta: Point) {
        const [w, h] = sizeRef.current
        if (!w || !h) {
            return
        }
        // `delta` is cursor movement in CSS pixels (pointStart - pointEnd);
        // `offset` lives in clip space, so 2/size converts pixels -> clip units
        // and the tree follows the cursor 1:1 at any zoom
        const o = cameraRef.current.offset
        cameraRef.current.offset = {
            x: o.x - (2 * delta.x) / w,
            y: o.y + (2 * delta.y) / h,
        }
    }

    return <div className={"tree"}>
        <ViewportCanvas
            onPan={onZoom}
            onScroll={onZoom}
            onDrag={onDrag}
            width={props.w}
            height={props.h}
            ref={canvasRef}
        />
    </div>
}
