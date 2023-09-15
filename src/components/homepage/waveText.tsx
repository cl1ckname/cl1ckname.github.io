interface WaveProps {
    text: string
}
export default function WaveText(props: WaveProps) {
    const colors = ["red", "magenta", "pink", "lightblue", "blue", "purple",]

    const letters = props.text.split("")
    return <span className="wave">
        {letters.map((l, i) =>
            (l == " ") ? " " :
                <span
                    key={i}
                    style={{
                        animationDelay: `${0.1 * i}s`,
                        color: colors[i % 6]}}
                >{l}</span>)}
    </span>
}