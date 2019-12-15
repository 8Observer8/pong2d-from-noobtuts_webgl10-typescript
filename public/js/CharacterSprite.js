define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CharacterSprite = /** @class */ (function () {
        function CharacterSprite(sprite, data) {
            this._sprite = sprite;
            this._data = data;
        }
        Object.defineProperty(CharacterSprite.prototype, "Sprite", {
            get: function () {
                return this._sprite;
            },
            set: function (v) {
                this._sprite = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CharacterSprite.prototype, "Data", {
            get: function () {
                return this._data;
            },
            set: function (v) {
                this._data = v;
            },
            enumerable: true,
            configurable: true
        });
        return CharacterSprite;
    }());
    exports.default = CharacterSprite;
});
//# sourceMappingURL=CharacterSprite.js.map