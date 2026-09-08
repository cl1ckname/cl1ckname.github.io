import React, {useEffect, useRef, useState} from "react";

interface FullfillContainerProps {
    children: (wh: [number, number]) => React.ReactNode
}

export function FullfillContrainer(props: FullfillContainerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [wh, setWH] = useState<[number, number]>([0, 0])

    useEffect(() => {
        const el = ref.current
        if (!el) {
            return
        }
        const measure = () => {
            const w = el.clientWidth
            const h = el.clientHeight
            setWH((prev) => (prev[0] === w && prev[1] === h ? prev : [w, h]))
        }
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    // The children (a canvas sized to `wh`) are taken out of flow so their size
    // can't feed back into `.fullfill` and start a resize loop.
    return <div ref={ref} className="fullfill">
        <div style={{position: "absolute", inset: 0}}>
            {props.children(wh)}
        </div>
    </div>
}
