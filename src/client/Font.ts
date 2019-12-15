
import CharData from "./CharData";
import CharacterSprite from "./CharacterSprite";
import Sprite from "./Sprite";
import Point from "./Point";
import TextureInfo from "./Engine/Resources/TextureInfo";

export default class Font
{
    private _textureInfo: TextureInfo = null;
    private _charData: { char: string, charData: CharData };

    public constructor(textureInfo: TextureInfo, charData: { char: string, charData: CharData })
    {
        this._textureInfo = textureInfo;
        this._charData = charData;
    }

    public CreateSprite(charCode: number): CharacterSprite
    {
        let charData = this._charData[charCode] as CharData;
        let sprite = new Sprite();
        sprite.TextureInfo = this._textureInfo;

        // Setup UVs
        let topLeft = new Point(charData.X / this._textureInfo.Width, charData.Y / this._textureInfo.Height);
        let bottomRight = new Point(topLeft.X + (charData.Width / this._textureInfo.Width),
            topLeft.Y + (charData.Height / this._textureInfo.Height));
        sprite.SetUVs(topLeft, bottomRight);
        sprite.XForm.Width = charData.Width;
        sprite.XForm.Height = charData.Height;

        return new CharacterSprite(sprite, charData);
    }
}