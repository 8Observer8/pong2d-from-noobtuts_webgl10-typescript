var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../Core/EngineCore", "./TextureShaderProgram"], function (require, exports, EngineCore_1, TextureShaderProgram_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SpriteShaderProgram = /** @class */ (function (_super) {
        __extends(SpriteShaderProgram, _super);
        function SpriteShaderProgram(vertexShaderPath, fragmentShaderPath) {
            var _this = _super.call(this, vertexShaderPath, fragmentShaderPath) || this;
            var textureCoords = [
                1.0, 1.0,
                0.0, 1.0,
                1.0, 0.0,
                0.0, 0.0
            ];
            _this._texCoordBuffer = _this._gl.createBuffer();
            _this._gl.bindBuffer(_this._gl.ARRAY_BUFFER, _this._texCoordBuffer);
            _this._gl.bufferData(_this._gl.ARRAY_BUFFER, new Float32Array(textureCoords), _this._gl.DYNAMIC_DRAW);
            return _this;
        }
        SpriteShaderProgram.prototype.Active = function (color, vpMatrix) {
            _super.prototype.Active.call(this, color, vpMatrix);
            var gl = EngineCore_1.default.Instance.gl;
            gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordBuffer);
            gl.vertexAttribPointer(this._aTexCoordLocation, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(this._aTexCoordLocation);
        };
        SpriteShaderProgram.prototype.SetTextureCoordinate = function (texCoord) {
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._texCoordBuffer);
            this._gl.bufferSubData(this._gl.ARRAY_BUFFER, 0, new Float32Array(texCoord));
        };
        return SpriteShaderProgram;
    }(TextureShaderProgram_1.default));
    exports.default = SpriteShaderProgram;
});
//# sourceMappingURL=SpriteShaderProgram.js.map