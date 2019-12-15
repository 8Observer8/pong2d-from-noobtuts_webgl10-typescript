define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MapEntry = /** @class */ (function () {
        function MapEntry() {
            this._refCount = 1;
            this._asset = null;
        }
        Object.defineProperty(MapEntry.prototype, "RefCount", {
            get: function () {
                return this._refCount;
            },
            set: function (v) {
                this._refCount = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapEntry.prototype, "Asset", {
            get: function () {
                return this._asset;
            },
            set: function (v) {
                this._asset = v;
            },
            enumerable: true,
            configurable: true
        });
        return MapEntry;
    }());
    exports.default = MapEntry;
});
//# sourceMappingURL=MapEntry.js.map