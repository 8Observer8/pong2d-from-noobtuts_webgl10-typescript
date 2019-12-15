define(["require", "exports", "./ResourceMap", "../Core/EngineCore", "./TextureInfo", "./Assets/TextureAsset"], function (require, exports, ResourceMap_1, EngineCore_1, TextureInfo_1, TextureAsset_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Textures = /** @class */ (function () {
        function Textures() {
        }
        Object.defineProperty(Textures, "Instance", {
            get: function () {
                if (this._instance === null) {
                    this._instance = new Textures();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        Textures.prototype.LoadTexture = function (textureName) {
            var _this = this;
            if (!ResourceMap_1.default.Instance.IsAssetLoaded(textureName)) {
                ResourceMap_1.default.Instance.AsyncLoadRequested(textureName);
                var img_1 = new Image();
                img_1.onload = function () {
                    _this.ProcessLoadedImage(textureName, img_1);
                };
                img_1.src = textureName;
            }
            else {
                ResourceMap_1.default.Instance.IncAssetRefCount(textureName);
            }
        };
        Textures.prototype.Active = function (textureName) {
            var gl = EngineCore_1.default.Instance.gl;
            var texInfo = ResourceMap_1.default.Instance.RetrieveAsset(textureName).TextureInfo;
            gl.bindTexture(gl.TEXTURE_2D, texInfo.Id);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        };
        Textures.prototype.GetTextureInfo = function (textureName) {
            return ResourceMap_1.default.Instance.RetrieveAsset(textureName);
        };
        Textures.prototype.ProcessLoadedImage = function (textureName, image) {
            var gl = EngineCore_1.default.Instance.gl;
            var textureID = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, textureID);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.bindTexture(gl.TEXTURE_2D, null);
            var texInfo = new TextureInfo_1.default(textureName, image.naturalWidth, image.naturalHeight, textureID);
            var textureAsset = new TextureAsset_1.default(texInfo);
            ResourceMap_1.default.Instance.AsyncLoadComleted(textureName, textureAsset);
        };
        Textures._instance = null;
        return Textures;
    }());
    exports.default = Textures;
});
//# sourceMappingURL=Textures.js.map