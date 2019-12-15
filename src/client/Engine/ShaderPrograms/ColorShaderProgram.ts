import EngineCore from "../Core/EngineCore";
import ResourceMap from "../Resources/ResourceMap";
import VertexBuffer from "../Core/VertexBuffer";
import { mat4, vec4 } from "gl-matrix";
import TextAsset from "../Resources/Assets/TextAsset";

export default class ColorShaderProgram
{
    private _aPositionLocation: number;
    private _colorLocation: WebGLUniformLocation;
    private _vpMatrixLocation: WebGLUniformLocation;
    private _modelMatrixLocation: WebGLUniformLocation;

    protected _shaderProgram: WebGLProgram;
    protected _gl: WebGLRenderingContext;

    public constructor(vertexShaderPath: string, fragmentShaderPath: string)
    {
        let gl = EngineCore.Instance.gl;
        this._gl = gl; // For later usage
        
        let vShader = this.CompileShader(vertexShaderPath, gl.VERTEX_SHADER);
        let fShader = this.CompileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);
        if ((vShader === null) || (fShader === null)) return;
        
        this._shaderProgram = gl.createProgram();
        gl.attachShader(this._shaderProgram, vShader);
        gl.attachShader(this._shaderProgram, fShader);
        gl.linkProgram(this._shaderProgram);

        if (!gl.getProgramParameter(this._shaderProgram, gl.LINK_STATUS))
        {
            console.log("Failed to link a shader program");
            return;
        }

        this._aPositionLocation = gl.getAttribLocation(this._shaderProgram, "aPosition");
        if (this._aPositionLocation < 0)
        {
            console.log("Failed to get the storage location of aPosition");
            return;
        }

        this._colorLocation = gl.getUniformLocation(this._shaderProgram, "uColor");
        this._vpMatrixLocation = gl.getUniformLocation(this._shaderProgram, "uVPMatrix");
        this._modelMatrixLocation = gl.getUniformLocation(this._shaderProgram, "uModelMatrix");

        if (this._colorLocation === null)
        {
            console.log("ColorShaderProgram.ts. Failed to get the storage location of uColor or uColor");
            return;
        }
        if (this._vpMatrixLocation === null)
        {
            console.log("ColorShaderProgram.ts. Failed to get the storage location of uColor or uVPMatrix");
            return;
        }
        if (this._modelMatrixLocation === null)
        {
            console.log("ColorShaderProgram.ts. Failed to get the storage location of uModelMatrix");
            return;
        }
    }

    public get ShaderProgram(): WebGLProgram
    {
        return this._shaderProgram;
    }

    public Active(color: vec4, vpMatrix: mat4): void
    {
        this._gl.useProgram(this._shaderProgram);
        this._gl.uniform4f(this._colorLocation, color[0], color[1], color[2], color[3]);
        this._gl.uniformMatrix4fv(this._vpMatrixLocation, false, vpMatrix);
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, VertexBuffer.Instance.SquareVertexBuffer);
        this._gl.vertexAttribPointer(this._aPositionLocation, 3, this._gl.FLOAT, false, 0, 0);
        this._gl.enableVertexAttribArray(this._aPositionLocation);
    }

    public LoadObjectTransform(modelMatrix: mat4)
    {
        let gl = EngineCore.Instance.gl;
        gl.uniformMatrix4fv(this._modelMatrixLocation, false, modelMatrix);
    }

    private CompileShader(filePath: string, shaderType: number): WebGLShader
    {
        let gl = EngineCore.Instance.gl;

        let shaderSource = (ResourceMap.Instance.RetrieveAsset(filePath) as TextAsset).FileContent;

        if ((shaderSource === null) || (shaderSource === undefined))
        {
            console.log(`ColorShaderProgram.ts, CompileShader(). Failed to load "${filePath}"`);
            return null;
        }

        let shader = gl.createShader(shaderType);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        {
            console.log(`Failed to compile the shader "${filePath}". Message: ${gl.getShaderInfoLog(shader)}`);
            return null;
        }

        return shader;
    }
}
