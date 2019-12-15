define(["require", "exports", "./Engine/Transform", "gl-matrix"], function (require, exports, Transform_1, gl_matrix_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Object3D = /** @class */ (function () {
        function Object3D() {
            this._xForm = new Transform_1.default();
            this._color = gl_matrix_1.vec4.fromValues(0.5, 0.5, 0.5, 1);
        }
        Object.defineProperty(Object3D.prototype, "XForm", {
            get: function () {
                return this._xForm;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Object3D.prototype, "Color", {
            get: function () {
                return this._color;
            },
            set: function (v) {
                this._color = v;
            },
            enumerable: true,
            configurable: true
        });
        Object3D.prototype.SetPosition = function (x, y, z) {
            this.XForm.SetPosition(x, y, z);
        };
        return Object3D;
    }());
    exports.default = Object3D;
});
//# sourceMappingURL=Object3D.js.map