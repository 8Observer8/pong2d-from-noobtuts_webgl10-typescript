define(["require", "exports", "../../Sprite", "./EngineCore", "../Resources/DefaultResources"], function (require, exports, Sprite_1, EngineCore_1, DefaultResources_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Renderer = /** @class */ (function () {
        function Renderer() {
            this._colorShaderProgram = DefaultResources_1.default.Instance.ColorShaderProgram;
            this._spriteShaderProgram = DefaultResources_1.default.Instance.SpriteShaderProgram;
        }
        Renderer.prototype.DrawSprite = function (sprite, vpMatrix) {
            var gl = EngineCore_1.default.Instance.gl;
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
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, Sprite_1.default.VertexAmount);
        };
        Renderer.prototype.DrawText = function (text, vpMatrix) {
            var _this = this;
            text.CharacterSprites.forEach(function (cs) {
                _this.DrawSprite(cs.Sprite, vpMatrix);
            });
        };
        Renderer.prototype.DrawColoredRect = function (rect, vpMatrix) {
            var gl = EngineCore_1.default.Instance.gl;
            gl.useProgram(this._colorShaderProgram.ShaderProgram);
            this._colorShaderProgram.LoadObjectTransform(rect.XForm.ModelMatrix);
            this._colorShaderProgram.Active(rect.Color, vpMatrix);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };
        return Renderer;
    }());
    exports.default = Renderer;
});
//# sourceMappingURL=Renderer.js.map