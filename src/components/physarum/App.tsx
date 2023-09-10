import React, {useEffect, useState} from 'react';
import '@/styles/physarum.css';
import {Physarum} from "./physarum";
import {Config, randomConfig} from "@/logic/physarum/config";
import {AgentSettings} from "./AgentSettings";
import {PopulationSettings} from "./PopulationSettings";
import {PopulationProps} from "@/logic/physarum/cup";
import {makeGradient, opposite} from "@/logic/physarum/color";
import {GradientForm} from "./GradientForm";
import {uniform} from "@/utils/random";
import {FullfillContrainer} from "../FullfillContainer";
import ContentSwitch from "@/components/ContentSwitch";
import PhysarumDescription from "@/components/physarum/PhysarumDescription";
import Layout from "@/components/Layout";
import PhysarumSettings from "@/components/physarum/PhysarumSettings";

export interface Settings {
    population: PopulationProps
    agentConfig: Config
    color: Uint8Array
    description: boolean
}

export default function App() {
    const [settings, setSettings] = useState<Settings>({
        agentConfig: {
            Speed: 1,
            Farsight: 32,
            BaseStep: 1,
            BaseRotation: 15,
            TooMuchPheromone: 225,
            TooFewPheromone: 25,
            TooFewStep: 5,
            TooFewRotation: 75,
            TooMuchStep: 5,
            TooMuchRotation: 125,
            LessDeviationStep: 2,
            LessDeviationRotation: 5,
            Deviation: 30,
            TooMuchCase: false,
            TooFewCase: false,
        },
        population: {
            numberAgents: 20000,
            pheroByStep: 75,
            decreaseValue: 0.5,
        },
        color: makeGradient(0x0, 0xffffff),
        description: false
    })
    useEffect(() => {
        const from = uniform(0, 1 << 24)
        const to = opposite(from)
        setSettings({
            agentConfig: randomConfig(),
            color: makeGradient(from, to),
            description: false,
            population: {
                numberAgents: 20000,
                pheroByStep: 75,
                decreaseValue: 0.5,
            },
        })
    }, []);

    const setAgent = (c: Config) => {
        setSettings({
            agentConfig: c,
            population: settings.population,
            color: settings.color,
            description: settings.description
        })
    }

    return <Layout
        title={"Physarum"}
        settings={<PhysarumSettings settings={settings} onChange={setSettings}/>}
        app={<FullfillContrainer>
            {wh => <Physarum w={wh[0]} h={wh[1]} settings={settings}/>}
        </FullfillContrainer>}
        description={<PhysarumDescription/>}
        />
}
