import {useEffect, useRef} from "react";
import {PoolFragShader, PoolVertShader, SolidColor} from "@/logic/pool/Shader";
import {PoolSettings} from "@/components/pool/Pool";


interface PoolCanvasProps {
    settings: PoolSettings
    w: number,
    h: number
}
export default function PoolCanvas(props: PoolCanvasProps) {
    const settings = props.settings
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) {
            return
        }
        const gl = canvasRef.current.getContext("webgl")
        if (!gl) {
            return;
        }

        qq(gl, settings)

    }, [canvasRef.current]);
    return <canvas ref={canvasRef} width={props.w} height={props.h} style={{minHeight: "500px"}}/>
}

function qq(gl: WebGLRenderingContext, settings: PoolSettings) {
    gl.clearColor(0.2, 0.55, 0.35, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    if (!vertexShader) return
    const fragmentShader=  gl.createShader(gl.FRAGMENT_SHADER)
    if (!fragmentShader) return;

    gl.shaderSource(vertexShader, PoolVertShader)
    gl.shaderSource(fragmentShader, PoolFragShader)

    gl.compileShader(vertexShader)
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {

        console.error("vert error ", gl.getShaderInfoLog(vertexShader))
        return
    }
    gl.compileShader(fragmentShader)
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error("frag error", gl.getShaderInfoLog(fragmentShader))
        return
    }
    const program = gl.createProgram()
    if (!program) return;
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("link error " + gl.getProgramInfoLog(program))
        return;
    }
    gl.validateProgram(program)
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error("validate err ", gl.getProgramInfoLog(program))
        return;
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

    putSettingsUniforms(gl, program, settings)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)

}


function putSettingsUniforms(gl: WebGLRenderingContext, program: WebGLProgram, settings: PoolSettings) {
    const xId = gl.getUniformLocation(program, "xx")
    if (!xId) {
        console.error("xx not found")
        return;
    }
    gl.uniform1f(xId, settings.x)

    const yId = gl.getUniformLocation(program, "yy")
    if (!yId) {
        console.error("yy not found")
        return;
    }
    gl.uniform1f(yId, settings.y)

    const nId = gl.getUniformLocation(program, "n")
    if (!nId) {
        console.error("n not found")
        return;
    }
    gl.uniform1i(nId, settings.n)

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
    gl.uniform1iv(colorsId, settings.colors)
    console.log("thx", gl.getProgramInfoLog(program))
}
