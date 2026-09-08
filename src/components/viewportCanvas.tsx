import {
    useRef,
    MouseEvent,
    TouchEvent,
    WheelEvent,
    Touch,
    forwardRef,
    ForwardedRef,
} from "react";
import {Point} from "@/logic/point";

function pointSub(p1: Point, p2: Point): Point {
    return {x: p1.x - p2.x, y: p1.y - p2.y}
}

function pointDist(p1: Point, p2: Point): number {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}

function touchPoint(t: Touch): Point {
    return {x: t.clientX, y: t.clientY}
}

// client coordinates -> position within the canvas element, in CSS pixels
function canvasPoint(rect: DOMRect, clientX: number, clientY: number): Point {
    return {x: clientX - rect.left, y: clientY - rect.top}
}

export interface ShaderViewportProps {
    onPan: (value: number, focus: Point) => void
    onScroll: (value: number, focus: Point) => void
    onDrag: (value: Point) => void
    width: number
    height: number
}

const ViewportCanvas = forwardRef((props: ShaderViewportProps, ref: ForwardedRef<HTMLCanvasElement>) => {
    // gesture state lives in refs: a pointer move must never trigger a re-render
    const dragging = useRef(false)
    const dragFrom = useRef<Point>({x: 0, y: 0})
    const pinching = useRef(false)
    const pinchSpread = useRef(0)

    function onMouseDown(event: MouseEvent<HTMLCanvasElement>) {
        event.stopPropagation()
        dragging.current = true
        dragFrom.current = canvasPoint(event.currentTarget.getBoundingClientRect(), event.clientX, event.clientY)
    }

    function onMouseMove(event: MouseEvent<HTMLCanvasElement>) {
        if (!dragging.current) {
            return
        }
        event.stopPropagation()
        const at = canvasPoint(event.currentTarget.getBoundingClientRect(), event.clientX, event.clientY)
        props.onDrag(pointSub(dragFrom.current, at))
        dragFrom.current = at
    }

    function endDrag(event: MouseEvent<HTMLCanvasElement>) {
        event.stopPropagation()
        dragging.current = false
    }

    function onTouchStart(event: TouchEvent<HTMLCanvasElement>) {
        event.preventDefault()
        event.stopPropagation()
        const rect = event.currentTarget.getBoundingClientRect()
        if (event.touches.length === 1) {
            dragging.current = true
            dragFrom.current = canvasPoint(rect, event.touches[0].clientX, event.touches[0].clientY)
        } else if (event.touches.length === 2) {
            dragging.current = false
            pinching.current = true
            pinchSpread.current = pointDist(touchPoint(event.touches[0]), touchPoint(event.touches[1]))
        }
    }

    function onTouchMove(event: TouchEvent<HTMLCanvasElement>) {
        event.preventDefault()
        event.stopPropagation()
        const rect = event.currentTarget.getBoundingClientRect()

        if (event.touches.length === 1 && dragging.current) {
            const at = canvasPoint(rect, event.touches[0].clientX, event.touches[0].clientY)
            props.onDrag(pointSub(dragFrom.current, at))
            dragFrom.current = at
            return
        }

        if (event.touches.length === 2 && pinching.current) {
            const p1 = touchPoint(event.touches[0])
            const p2 = touchPoint(event.touches[1])
            const spread = pointDist(p1, p2)
            const delta = (pinchSpread.current - spread) / window.innerWidth
            pinchSpread.current = spread
            const mid = canvasPoint(rect, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2)
            props.onPan(delta, mid)
        }
    }

    function onTouchEnd(event: TouchEvent<HTMLCanvasElement>) {
        event.stopPropagation()
        dragging.current = false
        pinching.current = false
    }

    function onWheel(event: WheelEvent<HTMLCanvasElement>) {
        event.stopPropagation()
        const delta = event.deltaY / window.innerHeight
        const focus = canvasPoint(event.currentTarget.getBoundingClientRect(), event.clientX, event.clientY)
        props.onScroll(delta, focus)
    }

    return <canvas
        ref={ref}
        width={props.width}
        height={props.height}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onWheel={onWheel}
    />
})

ViewportCanvas.displayName = "ViewportCanvas"

export default ViewportCanvas
