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
    return <PanCanvas
        w={props.w}
        h={props.w}
        angle={props.angle}
        n={props.n}
        color={props.color}
    />
}