define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Input = /** @class */ (function () {
        function Input() {
            this.Keys = {
                // arrows
                Left: 37,
                Up: 38,
                Right: 39,
                Down: 40,
                // space bar
                Space: 32,
                // numbers 
                Zero: 48,
                One: 49,
                Two: 50,
                Three: 51,
                Four: 52,
                Five: 53,
                Six: 54,
                Seven: 55,
                Eight: 56,
                Nine: 57,
                // Alphabets
                A: 65,
                D: 68,
                E: 69,
                F: 70,
                G: 71,
                I: 73,
                J: 74,
                K: 75,
                L: 76,
                R: 82,
                S: 83,
                W: 87,
                LastKeyCode: 222
            };
            // Previous key state
            this._keyPreviousState = [];
            // The pressed keys
            this._isKeyPressed = [];
            // Click events: once an event is set, it will remain there until polled
            this._isKeyClicked = [];
        }
        Input.prototype.OnKeyDown = function (event) {
            this._isKeyPressed[event.keyCode] = true;
        };
        Input.prototype.OnKeyUp = function (event) {
            this._isKeyPressed[event.keyCode] = false;
        };
        Object.defineProperty(Input, "Instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new Input();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        Input.prototype.Initialize = function () {
            var _this = this;
            for (var i = 0; i < this.Keys.LastKeyCode; i++) {
                this._isKeyPressed[i] = false;
                this._keyPreviousState[i] = false;
                this._isKeyClicked[i] = false;
            }
            // register handlers 
            window.addEventListener('keyup', function (event) { _this.OnKeyUp(event); });
            window.addEventListener('keydown', function (event) { _this.OnKeyDown(event); });
        };
        Input.prototype.Update = function () {
            for (var i = 0; i < this.Keys.LastKeyCode; i++) {
                this._isKeyClicked[i] = (!this._keyPreviousState[i]) && this._isKeyPressed[i];
                this._keyPreviousState[i] = this._isKeyPressed[i];
            }
        };
        Input.prototype.IsKeyPressed = function (keyCode) {
            return this._isKeyPressed[keyCode];
        };
        Input.prototype.IsKeyClicked = function (keyCode) {
            return this._isKeyClicked[keyCode];
        };
        return Input;
    }());
    exports.default = Input;
});
//# sourceMappingURL=Input.js.map