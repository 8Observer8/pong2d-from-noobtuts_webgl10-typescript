define(["require", "exports", "./VertexBuffer", "../Resources/DefaultResources", "./GameLoop", "./Input"], function (require, exports, VertexBuffer_1, DefaultResources_1, GameLoop_1, Input_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EngineCore = /** @class */ (function () {
        function EngineCore() {
            this._gl = null;
        }
        Object.defineProperty(EngineCore, "Instance", {
            get: function () {
                if (this._instance === null) {
                    this._instance = new EngineCore;
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        EngineCore.prototype.Initialize = function (canvasName, scene) {
            var _this = this;
            this.InitializeGL(canvasName);
            VertexBuffer_1.default.Instance.Initialize();
            Input_1.default.Instance.Initialize();
            DefaultResources_1.default.Instance.Initialize(function () { _this.StartScene(scene); });
        };
        EngineCore.prototype.ClearCanvas = function (color) {
            var gl = EngineCore.Instance.gl;
            gl.clearColor(color[0], color[1], color[2], color[3]);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        };
        EngineCore.prototype.InitializeGL = function (canvasName) {
            var canvas = document.getElementById(canvasName);
            if (canvas === null) {
                console.log("Failed to get an element with the name: " + canvasName);
                return;
            }
            this._gl = canvas.getContext("webgl");
            if (this._gl === null) {
                console.log("Your browser does not support the HTML5 canvas element");
                return;
            }
            var gl = this._gl;
            gl.enable(gl.DEPTH_TEST);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.enable(gl.BLEND);
        };
        EngineCore.prototype.StartScene = function (scene) {
            scene.Load();
            // Will wait until async loading is done and call scene.Initialize()
            GameLoop_1.default.Instance.Start(scene);
        };
        Object.defineProperty(EngineCore.prototype, "gl", {
            get: function () {
                return this._gl;
            },
            enumerable: true,
            configurable: true
        });
        EngineCore._instance = null;
        return EngineCore;
    }());
    exports.default = EngineCore;
});
//# sourceMappingURL=EngineCore.js.map