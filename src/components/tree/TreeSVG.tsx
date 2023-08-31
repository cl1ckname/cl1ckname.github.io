import oldGeneration from "@/logic/tree/old";
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";

interface TreeProps {
    w: number,
    h: number,
    n: number,
    angle: number
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
    return {x: p1.x + p2.x, y: p1.y + p2.y};
}

function scalePoint(p1: Point, scale: number) {
    return {x: p1.x / scale, y: p1.y / scale};
}

export default function TreeSVG(props: TreeProps) {
    const path = oldGeneration(props.w, props.h, props.angle, props.n)
    const svgRef = useRef<SVGSVGElement>(null)

    const [mousePos, setMousePos] = useState<Point>(ORIGIN);
    const [viewBox, setViewBox] = useState("0 0 800 800")
    const [scale, setScale] = useState<number>(1);
    const [offset, setOffset] = useState<Point>(ORIGIN);
    // let offset = {x: 0, y: 0}
    const [viewportTopLeft, setViewportTopLeft] = useState<Point>(ORIGIN);
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
        (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);
            lastMousePosRef.current = {x: event.pageX, y: event.pageY};
        },
        [mouseMove, mouseUp]
    );

    useLayoutEffect(() => {
        if (lastOffsetRef.current) {
            const offsetDiff = scalePoint(
                diffPoints(offset, lastOffsetRef.current),
                scale
            );
            setViewportTopLeft((prevVal) => diffPoints(prevVal, offsetDiff));
        }
    }, [offset, scale]);

    useEffect(() => {
        const canvasElem = svgRef.current;
        if (canvasElem === null) {
            return;
        }

        function handleUpdateMouse(event: MouseEvent) {
            event.preventDefault();
            if (svgRef.current) {
                const viewportMousePos = {x: event.clientX, y: event.clientY};
                const topLeftCanvasPos = {
                    x: svgRef.current.viewBox.baseVal.left,
                    y: svgRef.current.viewBox.baseVal.top
                };
                setMousePos(diffPoints(viewportMousePos, topLeftCanvasPos));
            }
        }

        canvasElem.addEventListener("mousemove", handleUpdateMouse);
        canvasElem.addEventListener("wheel", handleUpdateMouse);
        return () => {
            canvasElem.removeEventListener("mousemove", handleUpdateMouse);
            canvasElem.removeEventListener("wheel", handleUpdateMouse);
        };
    }, []);

    useEffect(() => {
        const svgElem = svgRef.current
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
        const svgElem = svgRef.current
        if (svgElem == null) {
            return
        }

        function moveHandler(event: MouseEvent) {
            event.preventDefault()


        }

        svgElem.addEventListener("mousemove", moveHandler)
        return () => svgElem.removeEventListener("mousemove", moveHandler)
    }, []);

    return <svg width={props.w} height={props.h}
                viewBox={[offset.x, offset.y, props.w * scale, props.h * scale].join(" ")} ref={svgRef}
                onMouseDown={startPan}>
        {path.map((p, i) => (
            <polygon points={p} fill={"#" + Math.floor(Math.random() * 16777215).toString(16)} key={i}/>))}
    </svg>
}