import oldGeneration from "@/logic/tree/old";

interface TreeProps {
    w: number,
    h: number
}

export default function Tree(props: TreeProps) {
    const path = oldGeneration(props.w, props.h, Math.PI / 4, 8)

    return <svg width={props.w} height={props.h}>
        {path.map((p, i) => (<polygon points={p} fill={"#" + Math.floor(Math.random()*16777215).toString(16)} key={i}/>))}
    </svg>
}