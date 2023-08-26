import {randomAngle, uniform} from "@/utils/random";

export interface Config {
    TooFewCase: boolean
    TooFewPheromone: number
    TooFewRotation: number
    TooFewStep: number
    TooMuchCase: boolean
    TooMuchPheromone: number
    TooMuchRotation: number
    TooMuchStep: number
    BaseRotation: number
    BaseStep: number
    LessDeviationRotation: number
    LessDeviationStep: number
    Farsight: number
    Deviation: number
    Speed: number
}

export function randomConfig(): Config {
    return {
        BaseRotation: randomAngle() / 60,
        BaseStep: uniform(2, 4),
        Deviation: randomAngle() / 60,
        Farsight: uniform(15, 64),
        LessDeviationRotation: randomAngle(),
        LessDeviationStep: uniform(1, 2),
        Speed: uniform(0.5, 1.5),
        TooFewCase: Math.random() > 0.5,
        TooFewPheromone: uniform(30, 45),
        TooFewRotation: randomAngle(),
        TooFewStep: uniform(2, 8),
        TooMuchCase: Math.random() > 0.5,
        TooMuchPheromone: uniform(220, 250),
        TooMuchRotation: randomAngle(),
        TooMuchStep: uniform(0.2, 0.6)
    }
}

