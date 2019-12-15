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
    var Rect = /** @class */ (function (_super) {
        __extends(Rect, _super);
        function Rect() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Rect;
    }(Object3D_1.default));
    exports.default = Rect;
});
//# sourceMappingURL=Rect.js.map