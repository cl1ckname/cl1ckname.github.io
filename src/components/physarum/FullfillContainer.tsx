import React, {createRef, useEffect, useState} from "react";

interface FullfillContainerProps {
    children: (wh: [number, number]) => React.ReactNode
}

export function FullfillContrainer(props: FullfillContainerProps) {
    const ref = createRef<HTMLDivElement>()
    const init: [number, number] = [0, 0]
    const [wh, setWH] = useState(init)
    useEffect(() => {
        if (ref.current) {
            const w = ref.current?.offsetWidth
            const h = ref.current?.offsetHeight
            setWH([w,h])
        }
    }, [ref.current]);

    return <div ref={ref} style={{width: "100%"}}>
        {props.children(wh)}
    </div>
}