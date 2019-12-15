define(["require", "exports", "./Engine/Core/EngineCore", "./Engine/Resources/ResourceMap", "./Font", "./Engine/Camera", "gl-matrix", "./Engine/Core/VertexBuffer", "./Engine/Core/Renderer", "./Text", "./FontParser", "./Rect", "./Engine/Core/Input"], function (require, exports, EngineCore_1, ResourceMap_1, Font_1, Camera_1, gl_matrix_1, VertexBuffer_1, Renderer_1, Text_1, FontParser_1, Rect_1, Input_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Scene = /** @class */ (function () {
        function Scene() {
            this._font = null;
            this._scoreText = null;
            this._leftControlText = null;
            this._rightControlText = null;
            this._camera = null;
            this._renderer = null;
            this._bgColor = gl_matrix_1.vec4.fromValues(0.905, 0.850, 0.752, 1);
            this._scoreLeft = 0;
            this._scoreRight = 0;
            this._racketWidth = 10;
            this._racketHeight = 80;
            this._racketSpeed = 3;
            this._ballSize = 8;
            this._ballInitDirY = 0;
            this._ballDirX = -1;
            this._ballDirY = 0;
            this._ballSpeed = 2;
            this._tempNormVector = gl_matrix_1.vec2.fromValues(0, 0);
        }
        Scene.prototype.Load = function () {
        };
        Scene.prototype.Initialize = function () {
            var gl = EngineCore_1.default.Instance.gl;
            this._racketLeftInitXPos = 20;
            this._racketLeftInitYPos = gl.canvas.height / 2;
            this._racketRightInitXPos = gl.canvas.width - 20;
            this._racketRightInitYPos = gl.canvas.height / 2;
            this._ballInitXPos = gl.canvas.width / 2;
            this._ballInitYPos = gl.canvas.height / 2;
            gl.clearColor(0, 0, 0, 1);
            this._camera = new Camera_1.default(gl_matrix_1.vec3.fromValues(gl.canvas.width / 2, gl.canvas.height / 2, 0), gl.canvas.width, gl_matrix_1.vec4.fromValues(0, 0, gl.canvas.width, gl.canvas.height));
            this._camera.BackgroundColor = this._bgColor;
            this._camera.SetupViewProjection();
            VertexBuffer_1.default.Instance.Initialize();
            this._renderer = new Renderer_1.default();
            var textureInfo = ResourceMap_1.default.Instance.RetrieveAsset("./assets-for-pong2d-from-noobtuts/fonts/font.png").TextureInfo;
            this._font = new Font_1.default(textureInfo, FontParser_1.default.Parse("./assets-for-pong2d-from-noobtuts/fonts/font.fnt"));
            this.SetScoreText();
            this._leftControlText = new Text_1.default("W/S", this._font);
            this._leftControlText.SetColor(gl_matrix_1.vec4.fromValues(0, 0, 0, 1));
            this._leftControlText.Translate(gl_matrix_1.vec3.fromValues(20, 20, 0));
            this._rightControlText = new Text_1.default("Up/Down", this._font);
            this._rightControlText.SetColor(gl_matrix_1.vec4.fromValues(0, 0, 0, 1));
            this._rightControlText.Translate(gl_matrix_1.vec3.fromValues(gl.canvas.width - 130, 20, 0));
            this._racketLeft = new Rect_1.default();
            this._racketLeft.XForm.SetPosition(this._racketLeftInitXPos, this._racketLeftInitYPos, 0);
            this._racketLeft.XForm.SetSize(this._racketWidth, this._racketHeight, 1);
            this._racketLeft.Color[0] = 0;
            this._racketLeft.Color[1] = 0.5;
            this._racketLeft.Color[2] = 0;
            this._racketLeft.Color[3] = 1;
            // this._racketLeft.Color = vec4.fromValues(0, 0.5, 0, 1);
            this._racketRight = new Rect_1.default();
            this._racketRight.XForm.SetPosition(this._racketRightInitXPos, this._racketRightInitYPos, 0);
            this._racketRight.XForm.SetSize(this._racketWidth, this._racketHeight, 1);
            this._racketRight.Color[0] = 0;
            this._racketRight.Color[1] = 0.5;
            this._racketRight.Color[2] = 0;
            this._racketRight.Color[3] = 1;
            // this._racketRight.Color = vec4.fromValues(0, 0.5, 0, 1);
            this._ball = new Rect_1.default();
            this._ball.XForm.SetPosition(this._ballInitXPos, this._ballInitYPos, 0);
            this._ball.XForm.SetSize(this._ballSize, this._ballSize, 1);
            this._ball.Color[0] = 0;
            this._ball.Color[1] = 0;
            this._ball.Color[2] = 0.5;
            this._ball.Color[3] = 1;
            // this._ball.Color = vec4.fromValues(0, 0, 0.5, 1);
        };
        Scene.prototype.Update = function () {
            this.KeyboardHandler();
            this.UpdateBall();
        };
        Scene.prototype.KeyboardHandler = function () {
            if (Input_1.default.Instance.IsKeyPressed(Input_1.default.Instance.Keys.W)) {
                this._racketLeft.XForm.YPos += this._racketSpeed;
            }
            if (Input_1.default.Instance.IsKeyPressed(Input_1.default.Instance.Keys.S)) {
                this._racketLeft.XForm.YPos -= this._racketSpeed;
            }
            if (Input_1.default.Instance.IsKeyPressed(Input_1.default.Instance.Keys.Up)) {
                this._racketRight.XForm.YPos += this._racketSpeed;
            }
            if (Input_1.default.Instance.IsKeyPressed(Input_1.default.Instance.Keys.Down)) {
                this._racketRight.XForm.YPos -= this._racketSpeed;
            }
        };
        Scene.prototype.UpdateBall = function () {
            var gl = EngineCore_1.default.Instance.gl;
            var width = gl.canvas.width;
            var height = gl.canvas.height;
            this._ball.XForm.XPos += this._ballDirX * this._ballSpeed;
            this._ball.XForm.YPos += this._ballDirY * this._ballSpeed;
            // Hit by left racket?
            if (this._ball.XForm.XPos < this._racketLeft.XForm.XPos + this._racketLeft.XForm.Width / 2 &&
                this._ball.XForm.XPos > this._racketLeft.XForm.XPos - this._racketLeft.XForm.Width / 2 &&
                this._ball.XForm.YPos < this._racketLeft.XForm.YPos + this._racketLeft.XForm.Height / 2 &&
                this._ball.XForm.YPos > this._racketLeft.XForm.YPos - this._racketLeft.XForm.Height / 2) {
                // Set fly direction depending on where it hit the racket
                // (t is 0.5 if hit at top, 0 at center, -0.5 at bottom)
                var t = (this._ball.XForm.YPos - this._racketLeft.XForm.YPos) / this._racketLeft.XForm.Height;
                this._ballDirX = Math.abs(this._ballDirX);
                this._ballDirY = t;
            }
            // Hit by right racket?
            if (this._ball.XForm.XPos > this._racketRight.XForm.XPos - this._racketRight.XForm.Width / 2 &&
                this._ball.XForm.XPos < this._racketRight.XForm.XPos + this._racketRight.XForm.Width / 2 &&
                this._ball.XForm.YPos < this._racketRight.XForm.YPos + this._racketRight.XForm.Height / 2 &&
                this._ball.XForm.YPos > this._racketRight.XForm.YPos - this._racketRight.XForm.Height / 2) {
                // Set fly direction depending on where it hit the racket
                // (t is 0.5 if hit at top, 0 at center, -0.5 at bottom)
                var t = (this._ball.XForm.YPos - this._racketRight.XForm.YPos) / this._racketRight.XForm.Height;
                this._ballDirX = -Math.abs(this._ballDirX);
                this._ballDirY = t;
            }
            // Hit left wall?
            if (this._ball.XForm.XPos < 0 - this._ball.XForm.Width / 2) {
                ++this._scoreRight;
                this.SetScoreText();
                this.ResetPositionsAndStates();
            }
            // Hit right wall?
            if (this._ball.XForm.XPos > width + this._ball.XForm.Width / 2) {
                ++this._scoreLeft;
                this.SetScoreText();
                this.ResetPositionsAndStates();
            }
            // Hit top wall?
            if (this._ball.XForm.YPos > height - this._ball.XForm.Width / 2) {
                this._ballDirY = -Math.abs(this._ballDirY);
            }
            // Hit bottom wall?
            if (this._ball.XForm.YPos < 0 + this._ball.XForm.Width / 2) {
                this._ballDirY = Math.abs(this._ballDirY);
            }
            // Make sure that length of dir stays at 1
            this.Norm(this._ballDirX, this._ballDirY);
            this._ballDirX = this._tempNormVector[0];
            this._ballDirY = this._tempNormVector[1];
        };
        Scene.prototype.Norm = function (x, y) {
            // Sets a vectors length to 1 (which means that x + y == 1)
            var length = Math.sqrt((x * x) + (y * y));
            if (length !== 0) {
                length = 1 / length;
                x *= length;
                y *= length;
            }
            this._tempNormVector[0] = x;
            this._tempNormVector[1] = y;
        };
        Scene.prototype.ResetPositionsAndStates = function () {
            this._racketLeft.XForm.SetPosition(this._racketLeftInitXPos, this._racketLeftInitYPos, 0);
            this._racketRight.XForm.SetPosition(this._racketRightInitXPos, this._racketRightInitYPos, 0);
            this._ball.XForm.SetPosition(this._ballInitXPos, this._ballInitYPos, 0);
            this._ballDirX = this.GetBallInitDirX();
            this._ballDirY = this._ballInitDirY;
        };
        Scene.prototype.GetBallInitDirX = function () {
            return (Math.random() > 0.5) ? 1 : -1;
        };
        Scene.prototype.Draw = function () {
            var gl = EngineCore_1.default.Instance.gl;
            EngineCore_1.default.Instance.ClearCanvas(this._bgColor);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            this._renderer.DrawColoredRect(this._racketLeft, this._camera.VPMatrix);
            this._renderer.DrawColoredRect(this._racketRight, this._camera.VPMatrix);
            this._renderer.DrawColoredRect(this._ball, this._camera.VPMatrix);
            this._renderer.DrawText(this._scoreText, this._camera.VPMatrix);
            this._renderer.DrawText(this._leftControlText, this._camera.VPMatrix);
            this._renderer.DrawText(this._rightControlText, this._camera.VPMatrix);
        };
        Scene.prototype.Unload = function () {
        };
        Scene.prototype.SetScoreText = function () {
            var gl = EngineCore_1.default.Instance.gl;
            var text = this._scoreLeft + ":" + this._scoreRight;
            this._scoreText = new Text_1.default(text, this._font);
            this._scoreText.SetColor(gl_matrix_1.vec4.fromValues(0, 0, 0, 1));
            this._scoreText.Translate(gl_matrix_1.vec3.fromValues(gl.canvas.width / 2.0 - 10, gl.canvas.height - 15.0, 0));
        };
        return Scene;
    }());
    exports.default = Scene;
});
//# sourceMappingURL=Scene.js.map