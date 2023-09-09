interface ContentSwitchProps {
    onChange: (b: boolean) => void
    description: boolean
}

export default function ContentSwitch(props: ContentSwitchProps) {

    return <button className={"content-switch"} onClick={() => {
        props.onChange(!props.description)
    }}/>
}