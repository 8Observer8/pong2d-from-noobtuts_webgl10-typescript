import Sprite from "./Sprite";
import CharData from "./CharData";

export default class CharacterSprite
{
    private _sprite: Sprite;
    private _data: CharData;

    public constructor(sprite: Sprite, data: CharData)
    {
        this._sprite = sprite;
        this._data = data;
    }

    public get Sprite(): Sprite
    {
        return this._sprite;
    }
    public set Sprite(v: Sprite)
    {
        this._sprite = v;
    }

    public get Data(): CharData
    {
        return this._data;
    }
    public set Data(v: CharData)
    {
        this._data = v;
    }
}