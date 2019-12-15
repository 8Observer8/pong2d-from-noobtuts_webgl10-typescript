import EngineCore from "../Core/EngineCore";
import TextureShaderProgram from "./TextureShaderProgram";
import { vec4, mat4 } from "gl-matrix";

export default class SpriteShaderProgram extends TextureShaderProgram
{
    private _texCoordBuffer: WebGLBuffer;

    public constructor(vertexShaderPath: string, fragmentShaderPath: string)
    {
        super(vertexShaderPath, fragmentShaderPath);

        let textureCoords = [
            1.0, 1.0,
            0.0, 1.0,
            1.0, 0.0,
            0.0, 0.0
        ];

        this._texCoordBuffer = this._gl.createBuffer();
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._texCoordBuffer);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(textureCoords), this._gl.DYNAMIC_DRAW);
    }

    public Active(color: vec4, vpMatrix: mat4): void
    {
        super.Active(color, vpMatrix);
        let gl = EngineCore.Instance.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordBuffer);
        gl.vertexAttribPointer(this._aTexCoordLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this._aTexCoordLocation);
    }

    public SetTextureCoordinate(texCoord: number[]): void
    {
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._texCoordBuffer);
        this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, new Float32Array(texCoord));
    }
}
