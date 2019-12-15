
export default class TextureInfo
{
    private _name: string;
    private _width: number;
    private _height: number;
    private _id: WebGLTexture;

    public constructor(name: string, width: number, height: number, id: WebGLTexture)
    {
        this.Name = name;
        this.Width = width;
        this.Height = height;
        this.Id = id;
    }

    public get Name(): string
    {
        return this._name;
    }
    public set Name(v: string)
    {
        this._name = v;
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

    public get Id(): WebGLTexture
    {
        return this._id;
    }
    public set Id(v: WebGLTexture)
    {
        this._id = v;
    }
}