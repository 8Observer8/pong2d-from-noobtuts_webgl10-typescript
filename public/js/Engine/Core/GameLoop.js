define(["require", "exports", "../Resources/ResourceMap"], function (require, exports, ResourceMap_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GameLoop = /** @class */ (function () {
        function GameLoop() {
            this._FPS = 60; // Frames per second
            this._MPF = 1000 / this._FPS; // Milliseconds per frame
            // The current loop state (running or should stop)
            this._isLoopRunning = false;
            this._scene = null;
        }
        Object.defineProperty(GameLoop, "Instance", {
            get: function () {
                if (this._instance === null) {
                    this._instance = new GameLoop;
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        GameLoop.prototype.RunLoop = function () {
            var _this = this;
            if (this._isLoopRunning) {
                requestAnimationFrame(function () { _this.RunLoop(); });
                this._currentTime = Date.now();
                this._elapsedTime = this._currentTime - this._previousTime;
                this._previousTime = this._currentTime;
                this._lagTime += this._elapsedTime;
                while ((this._lagTime >= this._MPF) && this._isLoopRunning) {
                    // Engine.Input.Instance.Update();
                    this._scene.Update();
                    this._lagTime -= this._MPF;
                }
                this._scene.Draw();
            }
            else {
                this._scene.Unload();
            }
        };
        GameLoop.prototype.StartLoop = function () {
            var _this = this;
            this._previousTime = Date.now();
            this._lagTime = 0.0;
            this._isLoopRunning = true;
            requestAnimationFrame(function () { _this.RunLoop(); });
        };
        GameLoop.prototype.Start = function (scene) {
            var _this = this;
            this._scene = scene;
            ResourceMap_1.default.Instance.SetLoadCompleteCallback(function () {
                _this._scene.Initialize();
                _this.StartLoop();
            });
        };
        GameLoop.prototype.Stop = function () {
            this._isLoopRunning = false;
        };
        GameLoop._instance = null;
        return GameLoop;
    }());
    exports.default = GameLoop;
});
//# sourceMappingURL=GameLoop.js.map