define(["require", "exports", "../Core/EngineCore", "../Resources/ResourceMap", "../Core/VertexBuffer"], function (require, exports, EngineCore_1, ResourceMap_1, VertexBuffer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ColorShaderProgram = /** @class */ (function () {
        function ColorShaderProgram(vertexShaderPath, fragmentShaderPath) {
            var gl = EngineCore_1.default.Instance.gl;
            this._gl = gl; // For later usage
            var vShader = this.CompileShader(vertexShaderPath, gl.VERTEX_SHADER);
            var fShader = this.CompileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);
            if ((vShader === null) || (fShader === null))
                return;
            this._shaderProgram = gl.createProgram();
            gl.attachShader(this._shaderProgram, vShader);
            gl.attachShader(this._shaderProgram, fShader);
            gl.linkProgram(this._shaderProgram);
            if (!gl.getProgramParameter(this._shaderProgram, gl.LINK_STATUS)) {
                console.log("Failed to link a shader program");
                return;
            }
            this._aPositionLocation = gl.getAttribLocation(this._shaderProgram, "aPosition");
            if (this._aPositionLocation < 0) {
                console.log("Failed to get the storage location of aPosition");
                return;
            }
            this._colorLocation = gl.getUniformLocation(this._shaderProgram, "uColor");
            this._vpMatrixLocation = gl.getUniformLocation(this._shaderProgram, "uVPMatrix");
            this._modelMatrixLocation = gl.getUniformLocation(this._shaderProgram, "uModelMatrix");
            if (this._colorLocation === null) {
                console.log("ColorShaderProgram.ts. Failed to get the storage location of uColor or uColor");
                return;
            }
            if (this._vpMatrixLocation === null) {
                console.log("ColorShaderProgram.ts. Failed to get the storage location of uColor or uVPMatrix");
                return;
            }
            if (this._modelMatrixLocation === null) {
                console.log("ColorShaderProgram.ts. Failed to get the storage location of uModelMatrix");
                return;
            }
        }
        Object.defineProperty(ColorShaderProgram.prototype, "ShaderProgram", {
            get: function () {
                return this._shaderProgram;
            },
            enumerable: true,
            configurable: true
        });
        ColorShaderProgram.prototype.Active = function (color, vpMatrix) {
            this._gl.useProgram(this._shaderProgram);
            this._gl.uniform4f(this._colorLocation, color[0], color[1], color[2], color[3]);
            this._gl.uniformMatrix4fv(this._vpMatrixLocation, false, vpMatrix);
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, VertexBuffer_1.default.Instance.SquareVertexBuffer);
            this._gl.vertexAttribPointer(this._aPositionLocation, 3, this._gl.FLOAT, false, 0, 0);
            this._gl.enableVertexAttribArray(this._aPositionLocation);
        };
        ColorShaderProgram.prototype.LoadObjectTransform = function (modelMatrix) {
            var gl = EngineCore_1.default.Instance.gl;
            gl.uniformMatrix4fv(this._modelMatrixLocation, false, modelMatrix);
        };
        ColorShaderProgram.prototype.CompileShader = function (filePath, shaderType) {
            var gl = EngineCore_1.default.Instance.gl;
            var shaderSource = ResourceMap_1.default.Instance.RetrieveAsset(filePath).FileContent;
            if ((shaderSource === null) || (shaderSource === undefined)) {
                console.log("ColorShaderProgram.ts, CompileShader(). Failed to load \"" + filePath + "\"");
                return null;
            }
            var shader = gl.createShader(shaderType);
            gl.shaderSource(shader, shaderSource);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.log("Failed to compile the shader \"" + filePath + "\". Message: " + gl.getShaderInfoLog(shader));
                return null;
            }
            return shader;
        };
        return ColorShaderProgram;
    }());
    exports.default = ColorShaderProgram;
});
//# sourceMappingURL=ColorShaderProgram.js.map