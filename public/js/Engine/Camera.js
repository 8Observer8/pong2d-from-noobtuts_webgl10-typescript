define(["require", "exports", "gl-matrix", "./Core/EngineCore"], function (require, exports, gl_matrix_1, EngineCore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Camera = /** @class */ (function () {
        function Camera(wcCenter, wcWidth, viewPort) {
            this._nearPlane = 0;
            this._farPlane = 1000;
            this._bgColor = gl_matrix_1.vec4.fromValues(0.8, 0.8, 0.8, 1.0);
            this._viewMatrix = gl_matrix_1.mat4.create();
            this._projMatrix = gl_matrix_1.mat4.create();
            this._vpMatrix = gl_matrix_1.mat4.create();
            this._wcCenter = wcCenter;
            this._wcWidth = wcWidth;
            this._viewPort = viewPort;
        }
        Object.defineProperty(Camera.prototype, "VPMatrix", {
            get: function () {
                return this._vpMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "BackgroundColor", {
            get: function () {
                return this._bgColor;
            },
            set: function (color) {
                this._bgColor = color;
            },
            enumerable: true,
            configurable: true
        });
        Camera.prototype.SetupViewProjection = function () {
            var gl = EngineCore_1.default.Instance.gl;
            gl.viewport(this._viewPort[0], this._viewPort[1], this._viewPort[2], this._viewPort[3]);
            gl.scissor(this._viewPort[0], this._viewPort[1], this._viewPort[2], this._viewPort[3]);
            gl.clearColor(this._bgColor[0], this._bgColor[1], this._bgColor[2], this._bgColor[3]);
            gl.enable(gl.SCISSOR_TEST);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.disable(gl.SCISSOR_TEST);
            gl_matrix_1.mat4.lookAt(this._viewMatrix, [this._wcCenter[0], this._wcCenter[1], 10], [this._wcCenter[0], this._wcCenter[1], 0], [0, 1, 0]);
            var halfWCWidth = 0.5 * this._wcWidth;
            var halfWCHeight = halfWCWidth * this._viewPort[3] / this._viewPort[2]; // viewportH/viewportW
            gl_matrix_1.mat4.ortho(this._projMatrix, -halfWCWidth, halfWCWidth, -halfWCHeight, halfWCHeight, this._nearPlane, this._farPlane);
            gl_matrix_1.mat4.multiply(this._vpMatrix, this._projMatrix, this._viewMatrix);
        };
        return Camera;
    }());
    exports.default = Camera;
});
//# sourceMappingURL=Camera.js.map