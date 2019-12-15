
import ResourceMap from "./ResourceMap";
import EngineCore from "../Core/EngineCore";
import TextureInfo from "./TextureInfo";
import TextureAsset from "./Assets/TextureAsset";

export default class Textures
{
    private static _instance: Textures = null;
    private constructor() { }

    public static get Instance(): Textures
    {
        if (this._instance === null)
        {
            this._instance = new Textures();
        }
        return this._instance;
    }

    public LoadTexture(textureName: string)
    {
        if (!ResourceMap.Instance.IsAssetLoaded(textureName))
        {
            ResourceMap.Instance.AsyncLoadRequested(textureName);

            let img = new Image();
            img.onload = () =>
            {
                this.ProcessLoadedImage(textureName, img);
            };
            img.src = textureName;
        }
        else
        {
            ResourceMap.Instance.IncAssetRefCount(textureName);
        }
    }

    public Active(textureName: string)
    {
        let gl = EngineCore.Instance.gl;
        let texInfo = (ResourceMap.Instance.RetrieveAsset(textureName) as TextureAsset).TextureInfo;
        gl.bindTexture(gl.TEXTURE_2D, texInfo.Id);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    }

    public GetTextureInfo(textureName: string): TextureAsset
    {
        return ResourceMap.Instance.RetrieveAsset(textureName) as TextureAsset;
    }

    private ProcessLoadedImage(textureName: string, image: HTMLImageElement)
    {
        let gl = EngineCore.Instance.gl;

        let textureID = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, textureID);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
        let texInfo = new TextureInfo(textureName, image.naturalWidth, image.naturalHeight, textureID);
        let textureAsset = new TextureAsset(texInfo);
        ResourceMap.Instance.AsyncLoadComleted(textureName, textureAsset);
    }
}