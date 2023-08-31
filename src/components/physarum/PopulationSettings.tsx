import {PopulationProps} from "../agent/cup";
import {Slider} from "../slider";

export interface PopulationSettingsProps {
    populationProps: PopulationProps
    onChange?: (props: PopulationProps) => void
}

export function PopulationSettings(props: PopulationSettingsProps) {
    const {onChange, populationProps} = props
    let configCopy = Object.assign({}, populationProps)

    return <form className={"agent-form"}>
        <fieldset>
            <legend>Population</legend>
            <label>Number of agents: {configCopy.numberAgents}</label>
            <Slider min={1} max={50000} value={configCopy.numberAgents} onChange={(n) => {
                configCopy.numberAgents = n
                if (onChange) onChange(configCopy)
            }}/>

            <label>Pheromone by step: {configCopy.pheroByStep}</label>
            <Slider min={1} max={255} value={configCopy.pheroByStep} onChange={(n) => {
                configCopy.pheroByStep = n
                if (onChange) onChange(configCopy)
            }}/>

            <label>Pheromone decrease value: {configCopy.decreaseValue * 100}</label>
            <Slider min={1} max={100} value={configCopy.decreaseValue * 100} onChange={(n) => {
                configCopy.decreaseValue = n / 100
                if (onChange) onChange(configCopy)
            }}/>
        </fieldset>
    </form>
}