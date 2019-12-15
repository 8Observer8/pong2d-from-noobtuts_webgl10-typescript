import Transform from "./Engine/Transform";
import { vec4 } from "gl-matrix";

export default class Object3D
{
    private _xForm: Transform;
    private _color: vec4;

    public constructor()
    {
        this._xForm = new Transform();
        this._color = vec4.fromValues(0.5, 0.5, 0.5, 1);
    }

    public get XForm(): Transform
    {
        return this._xForm;
    }

    public get Color(): vec4
    {
        return this._color;
    }
    public set Color(v: vec4)
    {
        this._color = v;
    }

    public SetPosition(x: number, y: number, z: number)
    {
        this.XForm.SetPosition(x, y, z);
    }
}