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
    var TextAsset = /** @class */ (function (_super) {
        __extends(TextAsset, _super);
        function TextAsset(fileContent) {
            var _this = _super.call(this) || this;
            _this._fileContent = fileContent;
            return _this;
        }
        Object.defineProperty(TextAsset.prototype, "FileContent", {
            get: function () {
                return this._fileContent;
            },
            enumerable: true,
            configurable: true
        });
        return TextAsset;
    }(Asset_1.default));
    exports.default = TextAsset;
});
//# sourceMappingURL=TextAsset.js.map