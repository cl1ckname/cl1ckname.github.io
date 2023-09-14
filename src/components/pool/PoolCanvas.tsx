import {useEffect, useRef, useState} from "react";
import {PoolFragShader, PoolVertShader} from "@/logic/pool/Shader";
import {PoolParams} from "@/components/pool/Pool";
import ViewportCanvas from "@/components/viewportCanvas";


interface PoolCanvasProps {
    settings: PoolParams
    w: number,
    h: number
}

interface PoolUniforms extends PoolParams{
    pos: [number, number],
    resolution: [number, number],
    scale: number,
}
export default function PoolCanvas(props: PoolCanvasProps) {
    const settings = props.settings
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [scale, setScale] = useState(1)
    const [pos, setPos] = useState({x: 0, y: 0})
    const [gl, setGl] = useState<WebGLRenderingContext>()
    const [program, setProgram] = useState<WebGLProgram>()

    useEffect(() => {
        if (props.w == 0) {
            return;
        }
        if (!canvasRef.current) {
            return
        }
        canvasRef.current.width = props.w
        canvasRef.current.height = props.h
        const gl = canvasRef.current.getContext("webgl")
        if (!gl) {
            return;
        }
        setGl(gl)

        const program = prepareProgram(gl, {
            ...settings,
            scale,
            pos: [pos.x, pos.y],
            resolution: [props.w, props.h]
        })
        if (!program) {
            return;
        }
        setProgram(program)
    }, [canvasRef.current, gl]);

    useEffect(() => {
        if (!gl || !program) {
            return
        }
        putSettingsUniforms(gl, program, {
            ...settings,
            scale,
            pos: [pos.x, pos.y],
            resolution: [props.w, props.h]
        })
        // console.log(pos)
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
    }, [gl, program, scale, pos, props]);

    function onPan(value: number) {
        setScale(prev => prev + value)
    }

    function onDrag(delta: {x: number, y: number}) {
        const escale = Math.exp(scale-1)
        setPos({x: pos.x + delta.x * escale, y: pos.y - delta.y * escale})
    }

    return <ViewportCanvas ref={canvasRef} onPan={onPan} onScroll={onPan} onDrag={onDrag} width={props.w} height={props.h}/>
}

function prepareProgram(gl: WebGLRenderingContext, settings: PoolUniforms): WebGLProgram | null {
    gl.clearColor(0.2, 0.55, 0.35, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    if (!vertexShader) return null
    const fragmentShader=  gl.createShader(gl.FRAGMENT_SHADER)
    if (!fragmentShader) return null;

    gl.shaderSource(vertexShader, PoolVertShader)
    gl.shaderSource(fragmentShader, PoolFragShader)

    gl.compileShader(vertexShader)
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {

        console.error("vert error ", gl.getShaderInfoLog(vertexShader))
        return null
    }
    gl.compileShader(fragmentShader)
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error("frag error", gl.getShaderInfoLog(fragmentShader))
        return null
    }
    const program = gl.createProgram()
    if (!program) return null;
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("link error " + gl.getProgramInfoLog(program))
        return null;
    }
    gl.validateProgram(program)
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error("validate err ", gl.getProgramInfoLog(program))
        return null;
    }

    const triangleVertices = [
        -1.0, 1.0,
        -1.0, -1.0,
        1.0, -1.0,
        1.0, 1.0
    ]

    const triangleVertexBufferObject = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW)

    const positionAttributeLocation = gl.getAttribLocation(program, "vertPosition")
    gl.vertexAttribPointer(
        positionAttributeLocation,
        2,
        gl.FLOAT,
        false,
        2 * Float32Array.BYTES_PER_ELEMENT,
        0
    )
    gl.enableVertexAttribArray(positionAttributeLocation)
    gl.useProgram(program)

    return program
}


function putSettingsUniforms(gl: WebGLRenderingContext, program: WebGLProgram, settings: PoolUniforms) {
    gl.useProgram(program)
    const posId = gl.getUniformLocation(program, "position")
    if (!posId) {
        console.error("pos not found")
        return;
    }
    gl.uniform2f(posId, settings.pos[0], settings.pos[1])

    const nId = gl.getUniformLocation(program, "n")
    if (!nId) {
        console.error("n not found")
        return;
    }
    gl.uniform1i(nId, settings.n)

    const aId = gl.getUniformLocation(program, "point_a")
    if (!aId) {
        console.error("a not found")
        return;
    }
    gl.uniform2f(aId, settings.rea, settings.ima)

    const resolutionId = gl.getUniformLocation(program, "resol")
    if (!resolutionId) {
        console.error("resolution not found")
        return;
    }
    gl.uniform2f(resolutionId, settings.resolution[0], settings.resolution[1])

    const scaleId = gl.getUniformLocation(program, "scale")
    if (!scaleId) {
        return;
    }
    gl.uniform1f(scaleId, settings.scale)

    const max_itsId = gl.getUniformLocation(program, "max_its")
    if (!max_itsId) {
        console.error("max its not found")
        return;
    }
    gl.uniform1i(max_itsId, settings.max_its)

    const rootsId = gl.getUniformLocation(program, "roots")
    if (!rootsId) {
        console.error("roots not found")
        return;
    }
    gl.uniform1fv(rootsId, new Float32Array(settings.roots))

    const colorsId = gl.getUniformLocation(program, "colors")
    if (!colorsId) {
        console.error("colors not found")
        return;
    }
    const flatColors = settings.colors.reduce((a, b) => a.concat(b), [] as number[])
    gl.uniform3fv(colorsId, flatColors)
}
