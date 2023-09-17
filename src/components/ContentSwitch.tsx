import {ReactNode} from "react";

interface ContentSwitchProps {
    onChange: (b: boolean) => void
    showDescription: boolean,
    description: ReactNode,
    app: ReactNode
}

export default function ContentSwitch(props: ContentSwitchProps) {

    return <>
        <div className="switch-window content-switch" style={{margin: "32px", width: "250px"}}>
            <div className="switch-bar">
                <div className="switch-bar-text">
                    Control panel
                </div>

                <div className="switch-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>
            <div className="switch-body">
                <a href="/"><button>Home</button></a>
                <button onClick={() => {
                    props.onChange(!props.showDescription)
                }}>Description</button>
            </div>
        </div>
        {props.showDescription ? "" : props.app}
        <div style={{display: !props.showDescription ? "none" : "block"}}>
            {props.description}
        </div>
    </>
}