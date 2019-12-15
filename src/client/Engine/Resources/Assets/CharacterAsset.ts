import Asset from "./Asset";
import TextAsset from "./TextAsset";
import CharData from "../../../CharData";

export default class CharacterAsset extends Asset
{
    private _charData: CharData;
    private _textAsset: TextAsset;
    private _fontImageName: string = null;

    public constructor(characterInfo: CharData, textAsset: TextAsset)
    {
        super();
        this._charData = characterInfo;
        this._textAsset = textAsset;
    }

    public get CharacterInfo(): CharData
    {
        return this._charData;
    }

    public get TextAsset(): TextAsset
    {
        return this._textAsset;
    }

    public get FontImageName(): string
    {
        return this._fontImageName;
    }
    public set FontImageName(v: string)
    {
        this._fontImageName = v;
    }
}