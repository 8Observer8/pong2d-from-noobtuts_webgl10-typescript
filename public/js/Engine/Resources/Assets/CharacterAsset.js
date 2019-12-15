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
    var CharacterAsset = /** @class */ (function (_super) {
        __extends(CharacterAsset, _super);
        function CharacterAsset(characterInfo, textAsset) {
            var _this = _super.call(this) || this;
            _this._fontImageName = null;
            _this._charData = characterInfo;
            _this._textAsset = textAsset;
            return _this;
        }
        Object.defineProperty(CharacterAsset.prototype, "CharacterInfo", {
            get: function () {
                return this._charData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CharacterAsset.prototype, "TextAsset", {
            get: function () {
                return this._textAsset;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CharacterAsset.prototype, "FontImageName", {
            get: function () {
                return this._fontImageName;
            },
            set: function (v) {
                this._fontImageName = v;
            },
            enumerable: true,
            configurable: true
        });
        return CharacterAsset;
    }(Asset_1.default));
    exports.default = CharacterAsset;
});
//# sourceMappingURL=CharacterAsset.js.map