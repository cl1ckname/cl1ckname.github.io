import {ReactNode, RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";

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

function addPoints(p1: Point, p2: Point) {
    return {x: p1.x + p2.x, y: p1.y + p2.y}
}

function scalePoint(p1: Point, scale: number) {
    return {x: p1.x / scale, y: p1.y / scale};
}

export default function PanCanvas(props: PanCanvasOpts) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [scale, setScale] = useState<number>(1);
    const [offset, setOffset] = useState<Point>(ORIGIN);
    const [mousePos, setMousePos] = useState<Point>(ORIGIN);
    const [viewportTopLeft, setViewportTopLeft] = useState<Point>(ORIGIN);
    const lastMousePosRef = useRef<Point>(ORIGIN)
    const lastOffsetRef = useRef<Point>(ORIGIN);

    useEffect(() => {
        lastOffsetRef.current = offset;
    }, [offset]);

    useEffect(() => {
        if (canvasRef.current) {
            setContext(canvasRef.current.getContext("2d"))
        }
    }, [canvasRef.current]);


    const mouseMove = useCallback(
        (event: MouseEvent) => {
            const lastMousePos = lastMousePosRef.current;
            const currentMousePos = {x: event.pageX, y: event.pageY}; // use document so can pan off element
            lastMousePosRef.current = currentMousePos;

            const mouseDiff = scalePoint(diffPoints(currentMousePos, lastMousePos), 1/scale);
            setOffset((prevOffset) => addPoints(prevOffset, mouseDiff));
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
            if (context) {
                const zoom = 1 - event.deltaY / ZOOM_SENSITIVITY;
                const viewportTopLeftDelta = {
                    x: (mousePos.x / scale) * (1 - 1 / zoom),
                    y: (mousePos.y / scale) * (1 - 1 / zoom)
                };
                const newViewportTopLeft = addPoints(
                    viewportTopLeft,
                    viewportTopLeftDelta
                );

                setViewportTopLeft(newViewportTopLeft)
                setScale(Math.min(scale * zoom, 10))
                // context.reset()
            }
        }

        svgElem.addEventListener("wheel", handleWheel)
        return () => svgElem.removeEventListener("wheel", handleWheel);
    }, [scale, viewportTopLeft]);

    useEffect(() => {
        if (lastOffsetRef.current) {
            const offsetDiff = scalePoint(
                diffPoints(offset, lastOffsetRef.current),
                scale
            );
            setViewportTopLeft((prevVal) => diffPoints(prevVal, offsetDiff));
        }
    }, [scale]);

    useEffect(() => {
        const canvasElem = canvasRef.current
        if (canvasElem == null) {
            return
        }

        function handleUpdateMouse(event: MouseEvent) {
            event.preventDefault()
            if (canvasRef.current) {
                const viewportMousePos = { x: event.clientX, y: event.clientY };
                const topLeftCanvasPos = {
                    x: canvasRef.current.offsetLeft,
                    y: canvasRef.current.offsetTop
                };
                setMousePos(diffPoints(viewportMousePos, topLeftCanvasPos));
            }
        }
        canvasElem.addEventListener("mousemove", handleUpdateMouse);
        canvasElem.addEventListener("wheel", handleUpdateMouse);
        // @ts-ignore
        canvasElem.onmousedown = startPan
        return () => {
            canvasElem.removeEventListener("mousemove", handleUpdateMouse);
            canvasElem.removeEventListener("wheel", handleUpdateMouse);
        };
    }, []);

    return <>
        {props.children(scale, offset.x, offset.y, canvasRef)}
    </>
}