import {ReactNode, RefObject, useCallback, useEffect, useRef, useState} from "react";

interface PanCanvasOpts {
    children: (
        scale: number,
        offsetX: number,
        offsetY: number,
        ref: RefObject<HTMLCanvasElement>
    ) => ReactNode
}

const ZOOM_SENSITIVITY = 1000
type Point = {
    x: number;
    y: number;
};
const ORIGIN = Object.freeze({x: 0, y: 0});

function diffPoints(p1: Point, p2: Point) {
    return {x: p1.x - p2.x, y: p1.y - p2.y};
}

function scalePoint(p1: Point, scale: number) {
    return {x: p1.x / scale, y: p1.y / scale};
}

export default function PanCanvas(props: PanCanvasOpts) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [scale, setScale] = useState<number>(1);
    const [offset, setOffset] = useState<Point>(ORIGIN);
    const lastMousePosRef = useRef<Point>(ORIGIN)
    const lastOffsetRef = useRef<Point>(ORIGIN);

    useEffect(() => {
        lastOffsetRef.current = offset;
    }, [offset]);


    const mouseMove = useCallback(
        (event: MouseEvent) => {
            const lastMousePos = lastMousePosRef.current;
            const currentMousePos = {x: event.pageX, y: event.pageY}; // use document so can pan off element
            lastMousePosRef.current = currentMousePos;

            const mouseDiff = scalePoint(diffPoints(currentMousePos, lastMousePos), 1/scale);
            setOffset((prevOffset) => diffPoints(prevOffset, mouseDiff));
        },
        [offset]
    );

    const mouseUp = useCallback(() => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
    }, [mouseMove])

    const startPan = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);
            lastMousePosRef.current = {x: event.pageX, y: event.pageY};
        },
        [mouseMove, mouseUp]
    );

    useEffect(() => {
        const svgElem = canvasRef.current
        if (svgElem == null) {
            return
        }

        function handleWheel(event: WheelEvent) {
            event.preventDefault()
            const zoom = 1 - event.deltaY / ZOOM_SENSITIVITY;
            setScale(scale * zoom)
            // updateViewBox()
        }

        svgElem.addEventListener("wheel", handleWheel)
        return () => svgElem.removeEventListener("wheel", handleWheel);
    }, [scale]);

    useEffect(() => {
        const svgElem = canvasRef.current
        if (svgElem == null) {
            return
        }

        function moveHandler(event: MouseEvent) {
            event.preventDefault()


        }

        svgElem.addEventListener("mousemove", moveHandler)
        return () => svgElem.removeEventListener("mousemove", moveHandler)
    }, []);

    return <>
        {props.children(scale, offset.x, offset.y, canvasRef)}
    </>
}