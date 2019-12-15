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
define(["require", "exports", "./ColorShaderProgram"], function (require, exports, ColorShaderProgram_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TextureShaderProgram = /** @class */ (function (_super) {
        __extends(TextureShaderProgram, _super);
        function TextureShaderProgram(vertexShaderPath, fragmentShaderPath) {
            var _this = _super.call(this, vertexShaderPath, fragmentShaderPath) || this;
            _this._aTexCoordLocation = _this._gl.getAttribLocation(_this._shaderProgram, "aTexCoord");
            if (_this._aTexCoordLocation < 0) {
                console.log("Failed to get the storage location of aTexCoord");
                return _this;
            }
            return _this;
        }
        return TextureShaderProgram;
    }(ColorShaderProgram_1.default));
    exports.default = TextureShaderProgram;
});
//# sourceMappingURL=TextureShaderProgram.js.map