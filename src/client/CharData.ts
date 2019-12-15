
export default class CharData
{
    private _id: number;
    private _xAdvance: number;
    private _xOffset: number;
    private _yOffset: number;
    private _height: number;
    private _width: number;
    private _x: number;
    private _y: number;

    public get Id(): number
    {
        return this._id;
    }
    public set Id(v: number)
    {
        this._id = v;
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

    public get XOffset(): number
    {
        return this._xOffset;
    }
    public set XOffset(v: number)
    {
        this._xOffset = v;
    }

    public get YOffset(): number
    {
        return this._yOffset;
    }
    public set YOffset(v: number)
    {
        this._yOffset = v;
    }

    public get XAdvance(): number
    {
        return this._xAdvance;
    }
    public set XAdvance(v: number)
    {
        this._xAdvance = v;
    }
}