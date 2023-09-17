import {
    useState,
    MouseEvent,
    TouchEvent,
    WheelEvent,
    Touch,
    forwardRef,
    ForwardedRef
} from "react";

type Point = {
    x: number
    y: number
}

function pointSub(p1: Point, p2: Point) {
    return {x: p1.x - p2.x, y: p1.y - p2.y}
}
function pointDist(p1: Point, p2: Point) {
    return Math.sqrt( Math.pow(p1.x - p2.x,2) + Math.pow(p1.y - p2.y,2))
}

function getMouseEventPoint(event: MouseEvent<HTMLCanvasElement>): Point {
    return {
        x: event.clientX,
        y: event.clientY,
    }
}

function getTouchPoint(t: Touch): Point {
    const { clientX: x, clientY: y } = t
    return { x: x, y: y }
}

function getTouchEventPoint(event: TouchEvent): Point {
    return getTouchPoint(event.touches[0]);
}

export interface ShaderViewportProps {
    onPan: (value: number) => void
    onScroll: (value: number) => void
    onDrag: (value: Point) => void
    width: number
    height: number
}

const ViewportCanvas = forwardRef((props: ShaderViewportProps, ref: ForwardedRef<HTMLCanvasElement>) => {

    const [isDrag, setIsDrag] = useState(false);
    let [pointStart, setPointStart] = useState<Point>({ x: 0, y: 0 });

    const [isPan, setIsPan] = useState(false);
    let [panStart1, setPanStart1] = useState<Point>({ x: 0, y: 0 });
    let [panStart2, setPanStart2] = useState<Point>({ x: 0, y: 0 });


    function onMouseDragStart(event: MouseEvent<HTMLCanvasElement>) {
        event.stopPropagation()
        setIsDrag(true);
        setPointStart(getMouseEventPoint(event));
    }

    function onTouchDragStart(event: TouchEvent) {
        event.preventDefault()
        event.stopPropagation()
        if (event.touches.length === 1) {
            setIsDrag(true);
            setPointStart(getTouchEventPoint(event));
        }
        else if (event.touches.length === 2) {
            setIsDrag(false)
            const t1 = event.touches[0]
            const t2 = event.touches[1]
            setPanStart1(getTouchPoint(t1))
            setPanStart2(getTouchPoint(t2))
            setIsPan(true)
        }
    }

    function onDragEnd(event: any) {
        event.stopPropagation()
        setIsDrag(false);
    }

    function onTouchEnd(event: TouchEvent) {
        event.stopPropagation()
        setIsDrag(false);
        setIsPan(false)
    }

    function onMouseDrag(event: MouseEvent<HTMLCanvasElement>) {
        event.stopPropagation()
        onDrug(getMouseEventPoint(event))
    }

    function onTouchDrag(event: TouchEvent<HTMLCanvasElement>) {
        event.preventDefault()
        event.stopPropagation()
        if (event.touches.length === 1)
            onDrug(getTouchEventPoint(event))
        if (event.touches.length === 2) {
            const t1 = event.touches[0]
            const t2 = event.touches[1]
            onPan(getTouchPoint(t1), getTouchPoint(t2))
        }
    }

    function onDrug(pointEnd: Point) {
        if (isDrag) {
            const delta = pointSub(pointStart, pointEnd)
            props.onDrag(delta)
            setPointStart(pointEnd);
        }
    }

    function onPan(pointEnd1: Point, pointEnd2: Point) {
        if (isPan) {
            const delta1  = pointDist(panStart1, panStart2)
            const delta2  = pointDist(pointEnd1, pointEnd2)
            const delta = delta1 - delta2
            props.onPan(delta / window.innerWidth)
        }
    }

    function onScroll(event: WheelEvent) {
        event.stopPropagation()
        const scale = event.deltaY / window.innerHeight;
        props.onScroll(scale)
    }

    return <canvas
        ref={ref}
        width={props.width}
        height={props.height}
        onMouseDown={onMouseDragStart}
        onMouseMove={onMouseDrag}
        onMouseUp={onDragEnd}
        onTouchStart={onTouchDragStart}
        onTouchMove={onTouchDrag}
        onTouchEnd={onTouchEnd}
        onWheel={onScroll}
    />
});

export default ViewportCanvas