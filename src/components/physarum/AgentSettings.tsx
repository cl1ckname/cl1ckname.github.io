import {Config, randomConfig} from "@/logic/physarum/config";
import React from "react";
import {MultiRangeSlider} from "./doubleSlider";
import {Slider} from "./slider";
import {AnglePicker} from "./anglePicker";

export interface AgentSettingsProps {
    onChange?: (c: Config) => void
    agentConfig: Config
}

export function AgentSettings(props: AgentSettingsProps) {
    const {onChange, agentConfig} = props
    const configCopy = Object.assign({}, agentConfig)

    return <form className="agent-form">
            <fieldset>
                <legend>Basic</legend>
                <label>Farsight: {configCopy.Farsight}</label>
                <Slider min={1} max={300} value={configCopy.Farsight} onChange={v => {
                    configCopy.Farsight = v
                    if (onChange) onChange(configCopy)
                }}/>

                <label>Speed: {configCopy.Speed}</label>
                <Slider min={1} max={8} value={configCopy.Speed} onChange={n => {
                    configCopy.Speed = n
                    if (onChange) onChange(configCopy)
                }}/>
            </fieldset>

            <fieldset>
                <legend>Base</legend>
                <label>Base rotation: {configCopy.BaseRotation}°</label>
                <AnglePicker value={configCopy.BaseRotation} onChange={a => {
                    configCopy.BaseRotation = a
                    if (onChange) onChange(configCopy)
                }}/>

                <label>Base step: {configCopy.BaseStep}</label>
                <Slider min={1} max={8} value={configCopy.BaseStep} onChange={n => {
                    configCopy.BaseStep = n
                    if (onChange) onChange(configCopy)
                }}/>
            </fieldset>

            <fieldset>
                <label>Normal pheromone range: {configCopy.TooFewPheromone}/{configCopy.TooMuchPheromone}</label>
                <MultiRangeSlider
                    min={0}
                    max={360}
                    valueMin={configCopy.TooFewPheromone}
                    valueMax={configCopy.TooMuchPheromone}
                    disabledLeft={!configCopy.TooFewCase}
                    disabledRight={!configCopy.TooMuchCase}
                    onChange={(min, max) => {
                        configCopy.TooMuchPheromone = max
                        configCopy.TooFewPheromone = min
                        if (onChange) onChange(configCopy)
                    }}/>
            </fieldset>

            <fieldset>
                <legend>Deviation</legend>
                <label>Deviation angle: {configCopy.Deviation}°</label>
                <AnglePicker value={configCopy.Deviation} onChange={a => {
                    configCopy.Deviation = a
                    if (onChange) onChange(configCopy)
                }}/>

                <label>Less Deviation Rotation: {configCopy.LessDeviationRotation}°</label>
                <AnglePicker value={configCopy.LessDeviationRotation} onChange={a => {
                    configCopy.LessDeviationRotation = a
                    if (onChange) onChange(configCopy)
                }}/>

                <label>Less deviation step: {configCopy.LessDeviationStep}</label>
                <Slider min={1} max={8} value={configCopy.LessDeviationStep} onChange={n => {
                    configCopy.LessDeviationStep = n
                    if (onChange) onChange(configCopy)
                }}/>
            </fieldset>

            <fieldset disabled={!configCopy.TooMuchCase}>
                <legend>Too much case
                    <input type="checkbox" checked={configCopy.TooMuchCase} onChange={() => {
                        configCopy.TooMuchCase = !configCopy.TooMuchCase
                        if (onChange) onChange(configCopy)
                    }}/>
                </legend>
                <label>Too much rotation: {configCopy.TooMuchRotation}°</label>
                <AnglePicker value={configCopy.TooMuchRotation} disabled={!configCopy.TooMuchCase} onChange={(a) => {
                    configCopy.TooMuchRotation = a
                    if (onChange) onChange(configCopy)
                }}/>

                <label>Too much step: {configCopy.TooMuchStep}</label>
                <Slider min={1} max={8} value={configCopy.TooMuchStep} disabled={!configCopy.TooMuchCase} onChange={n => {
                    configCopy.TooMuchStep = n
                    if (onChange) onChange(configCopy)
                }}/>
            </fieldset>

            <fieldset disabled={!configCopy.TooFewCase}>
                <legend>Too few case
                    <input type="checkbox" checked={configCopy.TooFewCase} onChange={() => {
                        configCopy.TooFewCase = !configCopy.TooFewCase
                        if (onChange) onChange(configCopy)
                    }}/></legend>
                <label>Too few rotation: {configCopy.TooFewRotation}°</label>
                <AnglePicker value={configCopy.TooFewRotation} onChange={a => {
                    configCopy.TooFewRotation = a
                    if (onChange) onChange(configCopy)
                }}/>

                <label>Too few step: {configCopy.TooFewStep}</label>
                <Slider min={1} max={8} value={configCopy.TooFewStep} onChange={n => {
                    configCopy.TooFewStep = n
                    if (onChange) onChange(configCopy)
                }}/>
            </fieldset>

            <fieldset>
                <legend>Tools</legend>
                <button onClick={(e) => {
                    e.preventDefault()
                    if (onChange) onChange(randomConfig())
                }}>Random</button>
                <button onClick={(e) => {
                    e.preventDefault()
                    if (onChange) onChange(configCopy)
                }}>Restart
                </button>
            </fieldset>
        </form>
}