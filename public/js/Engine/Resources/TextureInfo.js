define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TextureInfo = /** @class */ (function () {
        function TextureInfo(name, width, height, id) {
            this.Name = name;
            this.Width = width;
            this.Height = height;
            this.Id = id;
        }
        Object.defineProperty(TextureInfo.prototype, "Name", {
            get: function () {
                return this._name;
            },
            set: function (v) {
                this._name = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextureInfo.prototype, "Width", {
            get: function () {
                return this._width;
            },
            set: function (v) {
                this._width = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextureInfo.prototype, "Height", {
            get: function () {
                return this._height;
            },
            set: function (v) {
                this._height = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextureInfo.prototype, "Id", {
            get: function () {
                return this._id;
            },
            set: function (v) {
                this._id = v;
            },
            enumerable: true,
            configurable: true
        });
        return TextureInfo;
    }());
    exports.default = TextureInfo;
});
//# sourceMappingURL=TextureInfo.js.map