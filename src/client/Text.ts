import Font from "./Font";
import CharacterSprite from "./CharacterSprite";
import { vec4, vec3 } from "gl-matrix";

export default class Text
{
    private _font: Font = null;
    private _bitmapText: CharacterSprite[] = [];
    private _text: string;
    private _color = vec4.fromValues(1, 1, 1, 1);

    public constructor(text: string, font: Font)
    {
        this._text = text;
        this._font = font;

        this.CreateText(0, 0, 0);
    }

    public get CharacterSprites(): CharacterSprite[]
    {
        return this._bitmapText;
    }

    private CreateText(x: number, y: number, z: number): void
    {
        this._bitmapText = [];
        let currentX = x;
        let currentY = y;

        for (let i = 0; i < this._text.length; i++)
        {
            let sprite = this._font.CreateSprite(this._text.charCodeAt(i));
            let xOffset = sprite.Data.XOffset / 2.0;
            let yOffset = sprite.Data.YOffset / 2.0;
            sprite.Sprite.SetPosition(currentX + xOffset, currentY - yOffset, z);
            currentX += sprite.Data.XAdvance;
            this._bitmapText.push(sprite);
        }

        this.SetColor(this._color);
    }

    public SetColor(color: vec4): void
    {
        this._color = color;
        this._bitmapText.forEach(
            (s: CharacterSprite) =>
            {
                s.Sprite.Color = this._color;
            });
    }

    public Translate(vector: vec3): void
    {
        this._bitmapText.forEach(
            (s: CharacterSprite) =>
            {
                s.Sprite.SetPosition(
                    s.Sprite.XForm.XPos + vector[0],
                    s.Sprite.XForm.YPos + vector[1],
                    s.Sprite.XForm.ZPos + vector[2]
                )
            });
    }
}