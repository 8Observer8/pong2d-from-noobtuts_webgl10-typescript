import EngineCore from "./EngineCore";

export default class VertexBuffer
{
    private static _instance: VertexBuffer = null;
    private _squareVertexBuffer: WebGLBuffer;
    private _textureCoordBuffer: WebGLBuffer;

    private constructor() { }

    public static get Instance(): VertexBuffer
    {
        if (this._instance === null)
        {
            this._instance = new VertexBuffer;
        }
        return this._instance;
    }

    public get SquareVertexBuffer(): WebGLBuffer
    {
        return this._squareVertexBuffer;
    }

    public get TextureCoordBuffer(): WebGLBuffer
    {
        return this._textureCoordBuffer;
    }

    public Initialize(): void
    {
        let gl = EngineCore.Instance.gl;

        this._squareVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._squareVertexBuffer);

        let vertices = [
            -0.5, 0.5, 0,
            -0.5, -0.5, 0,
            0.5, 0.5, 0,
            0.5, -0.5, 0
        ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        this._textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._textureCoordBuffer);

        let textureCoords = [
            0, 0,
            0, 1,
            1, 0,
            1, 1
        ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    }
}