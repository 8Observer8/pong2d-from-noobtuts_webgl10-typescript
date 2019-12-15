define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Texture = /** @class */ (function () {
        function Texture() {
        }
        Object.defineProperty(Texture.prototype, "Width", {
            get: function () {
                return this._width;
            },
            set: function (v) {
                this._width = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Texture.prototype, "Height", {
            get: function () {
                return this._height;
            },
            set: function (v) {
                this._height = v;
            },
            enumerable: true,
            configurable: true
        });
        return Texture;
    }());
    exports.default = Texture;
});
//# sourceMappingURL=Texture.js.map