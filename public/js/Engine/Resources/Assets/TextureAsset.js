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
define(["require", "exports", "./Asset"], function (require, exports, Asset_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TextureAsset = /** @class */ (function (_super) {
        __extends(TextureAsset, _super);
        function TextureAsset(textureInfo) {
            var _this = _super.call(this) || this;
            _this._textureInfo = textureInfo;
            return _this;
        }
        Object.defineProperty(TextureAsset.prototype, "TextureInfo", {
            get: function () {
                return this._textureInfo;
            },
            enumerable: true,
            configurable: true
        });
        return TextureAsset;
    }(Asset_1.default));
    exports.default = TextureAsset;
});
//# sourceMappingURL=TextureAsset.js.map