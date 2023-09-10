import {ReactNode} from "react";

interface ContentSwitchProps {
    onChange: (b: boolean) => void
    showDescription: boolean,
    description: ReactNode,
    app: ReactNode
}

export default function ContentSwitch(props: ContentSwitchProps) {

    return <>
        <button className={"content-switch"} onClick={() => {
            props.onChange(!props.showDescription)
        }}/>
        {props.showDescription ? "" : props.app}
        <div style={{display: !props.showDescription ? "none" : "block"}}>
            {props.description}
        </div>
    </>
}