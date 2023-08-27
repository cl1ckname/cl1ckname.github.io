import "@/styles/homepage.css"
import {useState} from "react";
interface FlipTextProps {
    children: string
}

export default function FlipText(props: FlipTextProps) {
    const [flip, setFlip] = useState(false)
    const animate = () => {
        setFlip(true)
        setTimeout(() => setFlip(false), 3000)
    }

    return <span
        className={"flip-text" + ((flip) ? " flipping-text" : "")}
        onClick={animate}
    >{props.children}</span>
}