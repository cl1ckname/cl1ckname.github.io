export default function Description() {
    return <div className="description thin-scroll">
        <h1>Physarum.md</h1>
        <p>

            <a href="https://en.wikipedia.org/wiki/Physarum_polycephalum ">Physarum</a>&nbsp;
            this is a remarkable microorganism capable of finding <b>shortest paths</b>. The tubular network is able to
            quickly
            change, reorganizing itself in such a way as to extract most effectively from the environment
            nutrients. At the same time, the slime mold does not have a single coordinating center, and the "memories"
            of
            the location of food is encrypted in the very architecture of the body (mycelium) of the organism. This
            saved
            the information is then used to make future decisions. This page presents an interactive
            simulation of the growth of such an organism inspired by <a
            href="https://github.com/fogleman/physarum ">fogleman</a>.
        </p>
        <h3>How it works</h3>
        Let's describe the principle of simulation: a set of <b>agents</b> are placed on the field, which move and leave
        behind
        a <b>pheromone</b>. Each agent has two sensors that pick up the pheromone and the direction of the gaze.
        The sensors are located at a configurable distance from the agent and are equidistant from the direct direction
        of his gaze.
        The pheromone in each cell can be from 0 to 255. The more pheromone is in
        the cell, the more pronounced the color it is drawn. The calculation of the pheromone and the position of the
        agents occurs according to
        next cycle:
        <ol>
            <li>
                <dt>Determination of the amount of pheromone on sensors</dt>
                <dd>Each agent reads the amount of pheromone at two points - under the left and right sensor.</dd>
            </li>
            <li>
                <dt>Calculation of displacement</dt>
                <dd>Then the agents choose the speed and direction of movement. This also happens in several stages
                </dd>
                <ol>
                    <li>
                        <dt>The situation is too much</dt>
                        <dd>If there is too much pheromone on both sensors, then step and
                            the angle is determined by separate settings
                        </dd>
                    </li>
                    <li>
                        <dt>Left more than right</dt>
                        <dd>Step and turn are determined by the basic setting, turn
                            it is carried out counterclockwise
                        </dd>
                    </li>
                    <li>
                        <dt>Right more than left</dt>
                        <dd>Similar to the previous case, but the rotation is carried out
                            clockwise
                        </dd>
                    </li>
                    <li>
                        <dt>The situation is too small</dt>
                        <dd>If there is too little pheromone on both sensors, then step and
                            the angle is determined by separate settings
                        </dd>
                    </li>
                    <li>
                        <dt>The situation of indifference</dt>
                        <dd>If the amount of pheromone on the sensors is little different and
                            the agent does not fall under any of the previous cases, then the step and
                            the angle is determined by separate settings
                        </dd>
                    </li>
                </ol>
            </li>
            <li>
                <dt>Pheromone spraying</dt>
                <dd>The amount of pheromone is added to the cell with the new position of the agent, according to the
                    corresponding
                    setting up
                </dd>
            </li>
            <li>
                <dt>Pheromone Reduction</dt>
                <dd>The amount of pheromone is removed from each cell of the field according to the corresponding
                    setting
                </dd>
            </li>
            <li>
                <dt>Rendering</dt>
                <dd>Calculation of the color of each cell of the field depending on the amount of pheromone in it</dd>
            </li>
        </ol>
        <h3>Settings meaning</h3>
        <ul>
            <li>
                <dt>Population settings</dt>
                <dd>
                    <ul>
                        <li>
                            <dt>Number of agents</dt>
                            <dd>Number of agents per field</dd>
                        </li>
                        <li>
                            <dt>Pheromone by step</dt>
                            <dd>The amount of pheromone added in step 3</dd>
                        </li>
                        <li>
                            <dt>Pheromone decrease value</dt>
                            <dd>The amount of pheromone that is removed at stage 4</dd>
                        </li>
                        <li>
                            <dt>Color</dt>
                            <dd>Background color and pheromone color, according to which the linear gradient is
                                calculated
                            </dd>
                        </li>
                    </ul>
                </dd>
            </li>
            <li>
                <dt>Agent settings</dt>
                <dd>
                    <ul>
                        <li>
                            <dt>Farsight</dt>
                            <dd>The distance to which the agent's sensors are separated from himself</dd>
                        </li>
                        <li>
                            <dt>Speed</dt>
                            <dd>The value by which the step value is unconditionally multiplied</dd>
                        </li>
                        <li>
                            <dt>Base rotation</dt>
                            <dd>The turn of the agent in case the pheromone is not too much and not too little and the
                                difference is
                                on sensors, it is significant (carried out in the direction of the sensor with a large
                                number of
                                pheromone)
                            </dd>
                        </li>
                        <li>
                            <dt>Base step</dt>
                            <dd>Agent step in case the pheromone is not too much and not too little and the difference
                                is
                                on sensors , it is essential
                            </dd>
                        </li>
                        <li>
                            <dt>Normal pheromone range</dt>
                            <dd>The lower and upper limit of the amount of pheromone, within which the
                                basic step and turn
                            </dd>
                        </li>
                        <li>
                            <dt>Deviation angle</dt>
                            <dd>The angle by which the sensors deviate from the direction of the agent's gaze</dd>
                        </li>
                        <li>
                            <dt>Less deviation rotation</dt>
                            <dd>The angle of rotation of the agent in the case described in paragraph 2.5</dd>
                        </li>
                        <li>
                            <dt>Less deviation step</dt>
                            <dd>Agent's step in the case described in paragraph 2.5</dd>
                        </li>
                        <li>
                            <dt>Too much case</dt>
                            <dd>Check the upper limit of the pheromone. If disabled, then 2.1 is skipped</dd>
                        </li>
                        <li>
                            <dt>Too much rotation</dt>
                            <dd>Turn in the case of paragraph 2.1</dd>
                        </li>
                        <li>
                            <dt>Too much step</dt>
                            <dd>Step in case of paragraph 2.1</dd>
                        </li>
                        <li>
                            <dt>Too few case</dt>
                            <dd>Check the lower border of the pheromone. If disabled, 2.4 is skipped</dd>
                        </li>
                        <li>
                            <dt>Too few rotation</dt>
                            <dd>Turn in the case of paragraph 2.4</dd>
                        </li>
                        <li>
                            <dt>Too few step</dt>
                            <dd>Step in case of paragraph 2.4</dd>
                        </li>
                        <li>
                            <dt>Random</dt>
                            <dd>Replace current settings with random ones</dd>
                        </li>
                        <li>
                            <dt>Restart</dt>
                            <dd>Restart the simulation with the current settings</dd>
                        </li>
                    </ul>
                </dd>
            </li>
        </ul>
    </div>
}