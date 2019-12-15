
export default class Point
{

    private _x: number;
    private _y: number;

    public constructor(x: number, y: number)
    {
        this._x = x;
        this._y = y;
    }

    public get X(): number
    {
        return this._x;
    }
    public set X(v: number)
    {
        this._x = v;
    }

    public get Y(): number
    {
        return this._y;
    }
    public set Y(v: number)
    {
        this._y = v;
    }
}