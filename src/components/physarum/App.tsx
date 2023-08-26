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
import {FullfillContrainer} from "./FullfillContainer";

interface Settings {
    population: PopulationProps
    agentConfig: Config
    color: Uint8Array
}

export default function App() {
    const from = uniform(0, 1 << 24)
    const to = opposite(from)
    const [settings, setSettings] = useState<Settings>( {
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
        color: makeGradient(from, to)
    })
    useEffect(() => {
        setAgent(randomConfig())
    }, []);
    const setPopulationProps = (p: PopulationProps) => {
        setSettings({
            agentConfig: settings.agentConfig,
            population: p,
            color: settings.color
        })
    }

    const setAgent = (c: Config) => {
        setSettings({
            agentConfig: c,
            population: settings.population,
            color: settings.color
        })
    }

    const setColor = (c: Uint8Array) => {
        setSettings({
            agentConfig: settings.agentConfig,
            population: settings.population,
            color: c
        })
    }

    return (
        <div className="App">
            <div className="options-menu">
                <h2>Population settings</h2>
                <PopulationSettings populationProps={settings.population} onChange={setPopulationProps} />
                <GradientForm from={from} to={to} onChange={setColor}/>

                <h2>Agent settings</h2>
                {/*<input type="checkbox" checked={animate} onChange={() => setAnimate(!animate)}/>*/}
                <AgentSettings
                    agentConfig={settings.agentConfig}
                    onChange={setAgent}
                />
            </div>
            <FullfillContrainer>
                {(wh) => <Physarum
                    w={wh[0]}
                    h={wh[1]}
                    populationProps={settings.population}
                    agentConfig={settings.agentConfig}
                    color={settings.color}
                />}
            </FullfillContrainer>
        </div>
    );
}
