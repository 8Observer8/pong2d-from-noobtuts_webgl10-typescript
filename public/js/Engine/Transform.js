define(["require", "exports", "gl-matrix"], function (require, exports, gl_matrix_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Transform = /** @class */ (function () {
        function Transform() {
            this._position = gl_matrix_1.vec3.fromValues(0, 0, 0);
            this._scale = gl_matrix_1.vec3.fromValues(1, 1, 1);
            this._rotationInRad = 0.0;
        }
        Transform.prototype.SetPosition = function (xPos, yPos, zPos) {
            this.XPos = xPos;
            this.YPos = yPos;
            this.ZPos = zPos;
        };
        Transform.prototype.GetPosition = function () {
            return this._position;
        };
        Object.defineProperty(Transform.prototype, "XPos", {
            get: function () {
                return this._position[0];
            },
            set: function (xPos) {
                this._position[0] = xPos;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "YPos", {
            get: function () {
                return this._position[1];
            },
            set: function (yPos) {
                this._position[1] = yPos;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "ZPos", {
            get: function () {
                return this._position[2];
            },
            set: function (zPos) {
                this._position[2] = zPos;
            },
            enumerable: true,
            configurable: true
        });
        Transform.prototype.IncXPosBy = function (delta) {
            this._position[0] += delta;
        };
        Transform.prototype.IncYPosBy = function (delta) {
            this._position[1] += delta;
        };
        Transform.prototype.IncZPosBy = function (delta) {
            this._position[2] += delta;
        };
        Transform.prototype.IncRotationByDegree = function (rotationInDegree) {
            this.RotationInRad += rotationInDegree * Math.PI / 180.0;
        };
        Transform.prototype.IncRotationByRad = function (deltaRad) {
            this.RotationInRad += this._rotationInRad + deltaRad;
        };
        Object.defineProperty(Transform.prototype, "RotationInRad", {
            get: function () {
                return this._rotationInRad;
            },
            set: function (value) {
                this._rotationInRad = value;
                while (this._rotationInRad > (2.0 * Math.PI)) {
                    this._rotationInRad -= (2.0 * Math.PI);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "RotationInDegree", {
            get: function () {
                return this._rotationInRad * 180.0 / Math.PI;
            },
            set: function (value) {
                this.RotationInRad = value * Math.PI / 180.0;
            },
            enumerable: true,
            configurable: true
        });
        Transform.prototype.SetSize = function (width, height, depth) {
            this.Width = width;
            this.Height = height;
        };
        Object.defineProperty(Transform.prototype, "Width", {
            get: function () {
                return this._scale[0];
            },
            set: function (value) {
                this._scale[0] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "Height", {
            get: function () {
                return this._scale[1];
            },
            set: function (value) {
                this._scale[1] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "Depth", {
            get: function () {
                return this._scale[2];
            },
            set: function (value) {
                this._scale[2] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "ModelMatrix", {
            get: function () {
                var matrix = gl_matrix_1.mat4.create();
                gl_matrix_1.mat4.translate(matrix, matrix, gl_matrix_1.vec3.fromValues(this.XPos, this.YPos, 0.0));
                gl_matrix_1.mat4.rotateZ(matrix, matrix, this.RotationInRad);
                gl_matrix_1.mat4.scale(matrix, matrix, gl_matrix_1.vec3.fromValues(this.Width, this.Height, 1.0));
                return matrix;
            },
            enumerable: true,
            configurable: true
        });
        return Transform;
    }());
    exports.default = Transform;
});
//# sourceMappingURL=Transform.js.map