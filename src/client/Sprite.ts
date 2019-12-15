
import Point from "./Point";
import Object3D from "./Object3D";
import TextureInfo from "./Engine/Resources/TextureInfo";

export default class Sprite extends Object3D
{
    private static readonly _vertexAmount = 4;
    private _textureInfo: TextureInfo = null;
    private _texCoords: number[] = [];

    public static get VertexAmount(): number
    {
        return this._vertexAmount;
    }

    public get TextureInfo(): TextureInfo
    {
        return this._textureInfo;
    }
    public set TextureInfo(v: TextureInfo)
    {
        this._textureInfo = v;
    }

    public get TexCoords()
    {
        return this._texCoords;
    }

    public SetUVs(topLeft: Point, bottomRight: Point)
    {
        this._texCoords[0] = topLeft.X;
        this._texCoords[1] = topLeft.Y;

        this._texCoords[2] = topLeft.X;
        this._texCoords[3] = bottomRight.Y;

        this._texCoords[4] = bottomRight.X;
        this._texCoords[5] = topLeft.Y;

        this._texCoords[6] = bottomRight.X;
        this._texCoords[7] = bottomRight.Y;
    }
}