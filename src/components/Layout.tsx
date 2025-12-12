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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <a href="/" style={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    fontSize: '24px',
                    cursor: 'pointer',
                    padding: '5px',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s'
                }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} 
                   onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    ←
                </a>
                <h1 style={{ margin: 0 }}>{props.title}</h1>
            </div>
            {props.settings}
        </div>
        <ContentSwitch onChange={setShowDescription}
                       showDescription={showDescription}
                       app={props.app}
                       description={props.description}
        />
    </div>
}