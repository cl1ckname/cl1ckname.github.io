import {PopulationProps} from "@/logic/physarum/cup";
import {Config, randomConfig} from "@/logic/physarum/config";
import {GradientForm} from "@/components/physarum/GradientForm";
import {useEffect} from "react";
import {AgentSettings} from "@/components/physarum/AgentSettings";
import {PopulationSettings} from "@/components/physarum/PopulationSettings";
import {uniform} from "@/utils/random";
import {opposite} from "@/logic/physarum/color";

interface Settings {
    population: PopulationProps
    agentConfig: Config
    color: Uint8Array
    description: boolean
}
interface PhysarumSettingsProps {
    settings: Settings
    onChange: (s: Settings) => void
}
export default function PhysarumSettings(props: PhysarumSettingsProps) {
    const {settings, onChange} = props
    useEffect(() => {
        setAgent(randomConfig())
    }, []);
    const setPopulationProps = (p: PopulationProps) => {
        onChange({
            agentConfig: settings.agentConfig,
            population: p,
            color: settings.color,
            description: settings.description
        })
    }

    const setAgent = (c: Config) => {
        onChange({
            agentConfig: c,
            population: settings.population,
            color: settings.color,
            description: settings.description
        })
    }

    const setColor = (c: Uint8Array) => {
        onChange({
            agentConfig: settings.agentConfig,
            population: settings.population,
            color: c,
            description: settings.description
        })
    }

    return <div className="options-menu thin-scroll">
            <h2>Population settings</h2>
            <PopulationSettings populationProps={props.settings.population} onChange={setPopulationProps}/>
            <GradientForm from={0x0} to={0xffffff} onChange={setColor}/>

            <h2>Agent settings</h2>
            {/*<input type="checkbox" checked={animate} onChange={() => setAnimate(!animate)}/>*/}
            <AgentSettings
                agentConfig={settings.agentConfig}
                onChange={setAgent}
            />
        </div>
}