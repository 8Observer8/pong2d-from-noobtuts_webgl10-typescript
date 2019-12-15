import Asset from "./Asset";
import TextureInfo from "../TextureInfo";

export default class TextureAsset extends Asset
{
    private _textureInfo: TextureInfo;

    public constructor(textureInfo: TextureInfo)
    {
        super();
        this._textureInfo = textureInfo;
    }

    public get TextureInfo(): TextureInfo
    {
        return this._textureInfo;
    }
}