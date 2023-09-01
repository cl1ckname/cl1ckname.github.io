import oldGeneration from "@/logic/tree/old";
import {useCallback, useEffect, useRef, useState} from "react";
import PanCanvas from "@/components/tree/PanCanvas";
import VectorCanvas from "@/components/tree/VectorCanvas";

interface TreeProps {
    w: number,
    h: number,
    n: number,
    angle: number
}

export default function TreeSVG(props: TreeProps) {
    const path = oldGeneration(props.w, props.h, props.angle, props.n)

    return <PanCanvas>
        {(scale, offsetX, offsetY, ref) =>
            <VectorCanvas
                w={props.w}
                h={props.h}
                polygons={path}
                viewport={{
                    offsetX: 0,
                    offsetY: 0,
                    height: props.h,
                    width: props.w
                }}
                canvasRef={ref}
            />
                }
            </PanCanvas>
        }