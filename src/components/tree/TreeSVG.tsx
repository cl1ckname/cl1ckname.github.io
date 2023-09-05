import generateSquare from "@/logic/tree/generator";
import PanCanvas from "@/components/tree/PanCanvas";
import VectorCanvas from "@/components/tree/VectorCanvas";
import {ColorFunction} from "@/logic/tree/colors";

interface TreeProps {
    w: number,
    h: number,
    n: number,
    angle: number
    color: ColorFunction
}

export default function TreeSVG(props: TreeProps) {
    // const squares = generateSquare(props.angle, props.n)

    return <PanCanvas>
        {(scale, offsetX, offsetY, ref) =>
            <VectorCanvas
                w={props.w}
                h={props.w}
                squares={[]}
                angle={props.angle}
                n={props.n}
                viewport={{
                    offsetX: offsetX,
                    offsetY: offsetY,
                    height: props.h * scale,
                    width: props.w * scale
                }}
                color={props.color}
                canvasRef={ref}
            />
                }
            </PanCanvas>
        }