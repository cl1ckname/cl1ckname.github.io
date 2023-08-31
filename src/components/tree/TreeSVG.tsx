import oldGeneration from "@/logic/tree/old";

interface TreeProps {
    w: number,
    h: number,
    n: number,
    angle: number
}

export default function TreeSVG(props: TreeProps) {
    const path = oldGeneration(props.w, props.h, props.angle, props.n)

    return <svg width={props.w} height={props.h}>
        {path.map((p, i) => (<polygon points={p} fill={"#" + Math.floor(Math.random()*16777215).toString(16)} key={i}/>))}
    </svg>
}