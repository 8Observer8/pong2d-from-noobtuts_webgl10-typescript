import ResourceMap from "./ResourceMap";
import TextFileLoader, { FileType } from "./TextFileLoader";
import ColorShaderProgram from "../ShaderPrograms/ColorShaderProgram";
import TextureShaderProgram from "../ShaderPrograms/TextureShaderProgram";
import SpriteShaderProgram from "../ShaderPrograms/SpriteShaderProgram";
import Textures from "./Textures";

export default class DefaultResources
{
    private static _instance: DefaultResources = null;
    private readonly _defaultFontName = "./assets-for-pong2d-from-noobtuts/fonts/font";
    private readonly _vColorShaderName = "./assets-for-pong2d-from-noobtuts/shaders/vColor.glsl";
    private readonly _fColorShaderName = "./assets-for-pong2d-from-noobtuts/shaders/fColor.glsl";
    private readonly _vTextureShaderName = "./assets-for-pong2d-from-noobtuts/shaders/vTexture.glsl";
    private readonly _fTextureShaderName = "./assets-for-pong2d-from-noobtuts/shaders/fTexture.glsl";
    private _colorShaderProgram: ColorShaderProgram;
    private _textureShaderProgram: TextureShaderProgram;
    private _spriteShaderProgram: SpriteShaderProgram;

    private constructor() { }

    public static get Instance(): DefaultResources
    {
        if (this._instance === null)
        {
            this._instance = new DefaultResources();
        }
        return this._instance;
    }

    public Initialize(callbackFunction: () => void): void
    {
        TextFileLoader.Instance.LoadTextFile(this._vColorShaderName, FileType.TextFile, null);
        TextFileLoader.Instance.LoadTextFile(this._fColorShaderName, FileType.TextFile, null);

        TextFileLoader.Instance.LoadTextFile(this._vTextureShaderName, FileType.TextFile, null);
        TextFileLoader.Instance.LoadTextFile(this._fTextureShaderName, FileType.TextFile, null);

        this.LoadFont(this._defaultFontName);

        ResourceMap.Instance.SetLoadCompleteCallback(() => { this.CreateShaderPrograms(callbackFunction); });
    }

    public get ColorShaderProgram(): ColorShaderProgram
    {
        return this._colorShaderProgram;
    }

    public get TextureShaderProgram(): TextureShaderProgram
    {
        return this._textureShaderProgram;
    }

    public get SpriteShaderProgram(): SpriteShaderProgram
    {
        return this._spriteShaderProgram;
    }

    public get DefaultFontName(): string
    {
        return this._defaultFontName;
    }

    private CreateShaderPrograms(callbackFunction: () => void): void
    {
        ResourceMap.Instance.SetLoadCompleteCallback(null);

        this._colorShaderProgram = new ColorShaderProgram(this._vColorShaderName, this._fColorShaderName);
        this._textureShaderProgram = new TextureShaderProgram(this._vTextureShaderName, this._fTextureShaderName);
        this._spriteShaderProgram = new SpriteShaderProgram(this._vTextureShaderName, this._fTextureShaderName);

        callbackFunction();
    }

    private LoadFont(fontName: string): void
    {
        if (!ResourceMap.Instance.IsAssetLoaded(fontName))
        {
            let fontInfoSourceString = fontName + ".fnt";
            let textureSourceString = fontName + ".png";

            // ResourceMap.Instance.AsyncLoadRequested(fontName);

            Textures.Instance.LoadTexture(textureSourceString);
            TextFileLoader.Instance.LoadTextFile(fontInfoSourceString, FileType.TextFile, null);
        }
        else
        {
            ResourceMap.Instance.IncAssetRefCount(fontName);
        }
    }
}
