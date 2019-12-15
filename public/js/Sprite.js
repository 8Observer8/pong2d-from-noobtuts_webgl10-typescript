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
define(["require", "exports", "./Object3D"], function (require, exports, Object3D_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Sprite = /** @class */ (function (_super) {
        __extends(Sprite, _super);
        function Sprite() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._textureInfo = null;
            _this._texCoords = [];
            return _this;
        }
        Object.defineProperty(Sprite, "VertexAmount", {
            get: function () {
                return this._vertexAmount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "TextureInfo", {
            get: function () {
                return this._textureInfo;
            },
            set: function (v) {
                this._textureInfo = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "TexCoords", {
            get: function () {
                return this._texCoords;
            },
            enumerable: true,
            configurable: true
        });
        Sprite.prototype.SetUVs = function (topLeft, bottomRight) {
            this._texCoords[0] = topLeft.X;
            this._texCoords[1] = topLeft.Y;
            this._texCoords[2] = topLeft.X;
            this._texCoords[3] = bottomRight.Y;
            this._texCoords[4] = bottomRight.X;
            this._texCoords[5] = topLeft.Y;
            this._texCoords[6] = bottomRight.X;
            this._texCoords[7] = bottomRight.Y;
        };
        Sprite._vertexAmount = 4;
        return Sprite;
    }(Object3D_1.default));
    exports.default = Sprite;
});
//# sourceMappingURL=Sprite.js.map