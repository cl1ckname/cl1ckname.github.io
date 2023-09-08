interface SinProps {
    w: number,
    a: number,
    onChange: (w: number, h: number) => void
}
export default function Sin(props: SinProps) {
    return <fieldset className="sin">
        <span>
            <input min={0} step={0.01} type="number" value={props.a} onChange={e => {
                props.onChange(props.w, Number.isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber)
            }}/>
            *SIN(
            <input min={0} step={0.01} type="number" value={props.w} onChange={e => {
                props.onChange(Number.isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber, props.a)
            }}/>
            *t)
        </span>
    </fieldset>
}