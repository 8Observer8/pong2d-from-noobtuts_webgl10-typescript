import { mat4, vec4, vec3 } from "gl-matrix";
import EngineCore from "./Core/EngineCore";

export default class Camera
{
    private _wcCenter: vec3;
    private _wcWidth: number;
    private _viewPort: vec4;

    private _nearPlane = 0;
    private _farPlane = 1000;
    private _bgColor = vec4.fromValues(0.8, 0.8, 0.8, 1.0);

    private _viewMatrix = mat4.create();
    private _projMatrix = mat4.create();
    private _vpMatrix = mat4.create();

    public constructor(wcCenter: vec3, wcWidth: number, viewPort: vec4)
    {
        this._wcCenter = wcCenter;
        this._wcWidth = wcWidth;
        this._viewPort = viewPort;
    }

    public get VPMatrix(): mat4
    {
        return this._vpMatrix;
    }

    public get BackgroundColor(): vec4
    {
        return this._bgColor;
    }

    public set BackgroundColor(color: vec4)
    {
        this._bgColor = color;
    }

    public SetupViewProjection(): void
    {
        let gl = EngineCore.Instance.gl;
        gl.viewport(this._viewPort[0], this._viewPort[1], this._viewPort[2], this._viewPort[3]);
        gl.scissor(this._viewPort[0], this._viewPort[1], this._viewPort[2], this._viewPort[3]);
        gl.clearColor(this._bgColor[0], this._bgColor[1], this._bgColor[2], this._bgColor[3]);
        gl.enable(gl.SCISSOR_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.disable(gl.SCISSOR_TEST);

        mat4.lookAt(
            this._viewMatrix,
            [this._wcCenter[0], this._wcCenter[1], 10],
            [this._wcCenter[0], this._wcCenter[1], 0],
            [0, 1, 0]);
        var halfWCWidth = 0.5 * this._wcWidth;
        var halfWCHeight = halfWCWidth * this._viewPort[3] / this._viewPort[2]; // viewportH/viewportW
        mat4.ortho(this._projMatrix,
            -halfWCWidth,
            halfWCWidth,
            -halfWCHeight,
            halfWCHeight,
            this._nearPlane,
            this._farPlane
        );
        mat4.multiply(this._vpMatrix, this._projMatrix, this._viewMatrix);
    }
}