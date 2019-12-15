import ColorShaderProgram from "../ShaderPrograms/ColorShaderProgram";
import SpriteShaderProgram from "../ShaderPrograms/SpriteShaderProgram";
import Sprite from "../../Sprite";
import { mat4 } from "gl-matrix";
import Text from "../../Text";
import CharacterSprite from "../../CharacterSprite";
import EngineCore from "./EngineCore";
import DefaultResources from "../Resources/DefaultResources";
import Rect from "../../Rect";

export default class Renderer
{
    private _colorShaderProgram: ColorShaderProgram;
    private _spriteShaderProgram: SpriteShaderProgram;

    public constructor()
    {
        this._colorShaderProgram = DefaultResources.Instance.ColorShaderProgram;
        this._spriteShaderProgram = DefaultResources.Instance.SpriteShaderProgram;
    }

    public DrawSprite(sprite: Sprite, vpMatrix: mat4): void
    {
        let gl = EngineCore.Instance.gl;

        gl.useProgram(this._spriteShaderProgram.ShaderProgram);

        gl.bindTexture(gl.TEXTURE_2D, sprite.TextureInfo.Id);

        // To prevent texture wrappings
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        // Handles how magnification and minimization filters will work
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

        // Enable texture unit0
        gl.activeTexture(gl.TEXTURE0);

        this._spriteShaderProgram.LoadObjectTransform(sprite.XForm.ModelMatrix);
        this._spriteShaderProgram.SetTextureCoordinate(sprite.TexCoords);
        this._spriteShaderProgram.Active(sprite.Color, vpMatrix);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, Sprite.VertexAmount);
    }

    public DrawText(text: Text, vpMatrix: mat4): void
    {
        text.CharacterSprites.forEach(
            (cs: CharacterSprite) =>
            {
                this.DrawSprite(cs.Sprite, vpMatrix);
            });
    }

    public DrawColoredRect(rect: Rect, vpMatrix: mat4)
    {
        let gl = EngineCore.Instance.gl;
        gl.useProgram(this._colorShaderProgram.ShaderProgram);
        this._colorShaderProgram.LoadObjectTransform(rect.XForm.ModelMatrix);
        this._colorShaderProgram.Active(rect.Color, vpMatrix);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}