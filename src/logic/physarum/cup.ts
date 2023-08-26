import {Agent} from "./agent";
import {uniform} from "@/utils/random";
import {Config} from "./config";
import {Field} from "./field";
import {Drawer} from "./drawer";
import {cos, sin} from "@/utils/math";
import {mod} from "@/utils/helpers";

export interface PopulationProps {
    pheroByStep: number
    decreaseValue: number
    numberAgents: number
}
export interface CupProps {
    w: number
    h: number
    populationProps: PopulationProps
    agentConfig: Config
    ctx: CanvasRenderingContext2D
    color: Uint8Array
}

// The Petri dish
export class Cup {
    props: CupProps
    agents: Agent[]
    field: Field
    drawer: Drawer
    w: number
    h: number
    color: Uint8Array

    constructor(props: CupProps) {
        this.props = props
        this.w = props.w
        this.h = props.h
        this.color = props.color
        this.field = new Field(props.w, props.h)
        this.drawer = new Drawer(props.ctx)

        this.agents = []
        for (let i = 0; i <= props.populationProps.numberAgents; i++) {
            this.agents.push(new Agent(
                uniform(0, props.w - 1),
                uniform(0, props.h - 1),
                props.agentConfig
            ))
        }
    }

    Update() {
        this.processAgents()
        this.decreasePheromone()
        this.Render()
    }

    Render() {
        this.drawer.mapBuffer(this.field.buffer, this.props.color)
        this.drawer.render()
    }

    private processAgents() {
        for (const a of this.agents) {
            this.processAgent(a)
        }
    }

    private processAgent(a: Agent) {
        const [fer1, fer2] = this.calculatePheromone(a)
        const [angle, step] = this.calculateMovement(fer1, fer2, a)
        a.angle = mod(a.angle + angle, 360)

        const dX = cos(a.angle) * step
        const dY = sin(a.angle) * step

        a.x = a.x + dX
        a.y = a.y + dY
        let value = this.field.at(a.x, a.y)
        this.field.set(a.x, a.y, value + this.props.populationProps.pheroByStep)
    }

    private calculatePheromone(a: Agent): [number, number] {
        const c = a.config
        const leftAToCheck = mod(a.angle - c.Deviation, 360)
        const xToCheckLeft = a.x + cos(leftAToCheck) * c.Farsight
        const yToCheckLeft = a.y + sin(leftAToCheck) * c.Farsight
        const fer1 = this.field.at(xToCheckLeft, yToCheckLeft)

        const rightAToCheck = mod(a.angle + c.Deviation, 360)
        const xToCheckRight = a.x + cos(rightAToCheck) * c.Farsight
        const yToCheckRight = a.y + sin(rightAToCheck) * c.Farsight
        const fer2 = this.field.at(xToCheckRight, yToCheckRight)
        return [fer1, fer2]
    }

    private decreasePheromone() {
        this.field.sub(this.props.populationProps.decreaseValue)
    }


    calculateMovement(fer1: number, fer2: number, a: Agent): [number, number] {
        const c = a.config

        if (c.TooMuchCase) {
            if (fer1 > c.TooMuchPheromone && fer2 > c.TooMuchPheromone) {
                return [c.TooMuchRotation, c.TooMuchStep]
            }
        }

        if (fer1 > c.TooFewPheromone && fer1 < c.TooMuchPheromone && fer1 > fer2) {
            return [-c.BaseRotation, c.BaseStep]

        }

        if (fer2 > c.TooFewPheromone && fer2 < c.TooMuchPheromone) {
            return [c.BaseRotation, c.BaseStep]
        }

        if (c.TooMuchCase) {
            if (fer1 < c.TooFewPheromone && fer2 < c.TooFewPheromone) {
                return [c.TooFewRotation, c.TooFewStep]
            }
        }

        return [c.LessDeviationRotation, c.LessDeviationStep]
    }
}