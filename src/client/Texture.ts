
export default class Texture
{
    private _width: number;
    private _height: number;

    public get Width(): number
    {
        return this._width;
    }
    public set Width(v: number)
    {
        this._width = v;
    }

    public get Height(): number
    {
        return this._height;
    }
    public set Height(v: number)
    {
        this._height = v;
    }
}