import ContentSwitch from "@/components/ContentSwitch";
import {ReactNode, useState} from "react";

interface LayoutProps {
    title: string
    settings: ReactNode
    app: ReactNode
    description: ReactNode
}

export default function Layout(props: LayoutProps) {
    const [showDescription, setShowDescription] = useState(false)
    return <div className="App">
        <div className="options-menu thin-scroll">
            <h1>{props.title}</h1>
            {props.settings}
        </div>
        <ContentSwitch onChange={setShowDescription}
                       showDescription={showDescription}
                       app={props.app}
                       description={props.description}
        />
    </div>
}