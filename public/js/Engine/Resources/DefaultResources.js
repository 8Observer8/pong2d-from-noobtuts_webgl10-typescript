define(["require", "exports", "./ResourceMap", "./TextFileLoader", "../ShaderPrograms/ColorShaderProgram", "../ShaderPrograms/TextureShaderProgram", "../ShaderPrograms/SpriteShaderProgram", "./Textures"], function (require, exports, ResourceMap_1, TextFileLoader_1, ColorShaderProgram_1, TextureShaderProgram_1, SpriteShaderProgram_1, Textures_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DefaultResources = /** @class */ (function () {
        function DefaultResources() {
            this._defaultFontName = "./assets-for-pong2d-from-noobtuts/fonts/font";
            this._vColorShaderName = "./assets-for-pong2d-from-noobtuts/shaders/vColor.glsl";
            this._fColorShaderName = "./assets-for-pong2d-from-noobtuts/shaders/fColor.glsl";
            this._vTextureShaderName = "./assets-for-pong2d-from-noobtuts/shaders/vTexture.glsl";
            this._fTextureShaderName = "./assets-for-pong2d-from-noobtuts/shaders/fTexture.glsl";
        }
        Object.defineProperty(DefaultResources, "Instance", {
            get: function () {
                if (this._instance === null) {
                    this._instance = new DefaultResources();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        DefaultResources.prototype.Initialize = function (callbackFunction) {
            var _this = this;
            TextFileLoader_1.default.Instance.LoadTextFile(this._vColorShaderName, TextFileLoader_1.FileType.TextFile, null);
            TextFileLoader_1.default.Instance.LoadTextFile(this._fColorShaderName, TextFileLoader_1.FileType.TextFile, null);
            TextFileLoader_1.default.Instance.LoadTextFile(this._vTextureShaderName, TextFileLoader_1.FileType.TextFile, null);
            TextFileLoader_1.default.Instance.LoadTextFile(this._fTextureShaderName, TextFileLoader_1.FileType.TextFile, null);
            this.LoadFont(this._defaultFontName);
            ResourceMap_1.default.Instance.SetLoadCompleteCallback(function () { _this.CreateShaderPrograms(callbackFunction); });
        };
        Object.defineProperty(DefaultResources.prototype, "ColorShaderProgram", {
            get: function () {
                return this._colorShaderProgram;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DefaultResources.prototype, "TextureShaderProgram", {
            get: function () {
                return this._textureShaderProgram;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DefaultResources.prototype, "SpriteShaderProgram", {
            get: function () {
                return this._spriteShaderProgram;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DefaultResources.prototype, "DefaultFontName", {
            get: function () {
                return this._defaultFontName;
            },
            enumerable: true,
            configurable: true
        });
        DefaultResources.prototype.CreateShaderPrograms = function (callbackFunction) {
            ResourceMap_1.default.Instance.SetLoadCompleteCallback(null);
            this._colorShaderProgram = new ColorShaderProgram_1.default(this._vColorShaderName, this._fColorShaderName);
            this._textureShaderProgram = new TextureShaderProgram_1.default(this._vTextureShaderName, this._fTextureShaderName);
            this._spriteShaderProgram = new SpriteShaderProgram_1.default(this._vTextureShaderName, this._fTextureShaderName);
            callbackFunction();
        };
        DefaultResources.prototype.LoadFont = function (fontName) {
            if (!ResourceMap_1.default.Instance.IsAssetLoaded(fontName)) {
                var fontInfoSourceString = fontName + ".fnt";
                var textureSourceString = fontName + ".png";
                // ResourceMap.Instance.AsyncLoadRequested(fontName);
                Textures_1.default.Instance.LoadTexture(textureSourceString);
                TextFileLoader_1.default.Instance.LoadTextFile(fontInfoSourceString, TextFileLoader_1.FileType.TextFile, null);
            }
            else {
                ResourceMap_1.default.Instance.IncAssetRefCount(fontName);
            }
        };
        DefaultResources._instance = null;
        return DefaultResources;
    }());
    exports.default = DefaultResources;
});
//# sourceMappingURL=DefaultResources.js.map