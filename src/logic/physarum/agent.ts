import {Config, randomConfig} from "./config";
import {randomAngle} from "@/utils/random";

export class Agent {
    x: number
    y: number
    speed: number
    angle: number
    config: Config
    constructor(x: number, y: number, c: Config) {
        this.config = c
        this.x = x
        this.y = y
        this.speed = 0
        this.angle = randomAngle()
    }

    mutate() {
        this.config = randomConfig()
    }
}