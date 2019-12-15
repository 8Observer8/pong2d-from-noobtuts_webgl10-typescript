import EngineCore from "./Engine/Core/EngineCore";
import ResourceMap from "./Engine/Resources/ResourceMap";
import Font from "./Font";
import Camera from "./Engine/Camera";
import { vec3, vec4, vec2 } from "gl-matrix";
import VertexBuffer from "./Engine/Core/VertexBuffer";
import TextureAsset from "./Engine/Resources/Assets/TextureAsset";
import Renderer from "./Engine/Core/Renderer";
import Text from "./Text";
import FontParser from "./FontParser";
import Rect from "./Rect";
import Input from "./Engine/Core/Input";

export default class Scene
{
    private _font: Font = null;
    private _scoreText: Text = null;
    private _leftControlText: Text = null;
    private _rightControlText: Text = null;

    private _camera: Camera = null;
    private _renderer: Renderer = null;
    private _bgColor = vec4.fromValues(0.905, 0.850, 0.752, 1);

    private _scoreLeft = 0;
    private _scoreRight = 0;

    private _racketLeft: Rect;
    private _racketRight: Rect;
    private _racketWidth = 10;
    private _racketHeight = 80;
    private _racketSpeed = 3;

    private _ball: Rect;
    private _ballSize = 8;
    private _ballInitDirY = 0;
    private _ballDirX = -1;
    private _ballDirY = 0;
    private _ballSpeed = 2;
    private _tempNormVector: vec2 = vec2.fromValues(0, 0);

    private _racketLeftInitXPos: number;
    private _racketLeftInitYPos: number;
    private _racketRightInitXPos: number;
    private _racketRightInitYPos: number;
    private _ballInitXPos: number;
    private _ballInitYPos: number;

    public Load(): void
    {

    }

    public Initialize(): void
    {
        let gl = EngineCore.Instance.gl;

        this._racketLeftInitXPos = 20;
        this._racketLeftInitYPos = gl.canvas.height / 2;
        this._racketRightInitXPos = gl.canvas.width - 20;
        this._racketRightInitYPos = gl.canvas.height / 2;
        this._ballInitXPos = gl.canvas.width / 2;
        this._ballInitYPos = gl.canvas.height / 2;

        gl.clearColor(0, 0, 0, 1);

        this._camera = new Camera(
            vec3.fromValues(gl.canvas.width / 2, gl.canvas.height / 2, 0),
            gl.canvas.width,
            vec4.fromValues(0, 0, gl.canvas.width, gl.canvas.height));

        this._camera.BackgroundColor = this._bgColor;

        this._camera.SetupViewProjection();

        VertexBuffer.Instance.Initialize();

        this._renderer = new Renderer();

        let textureInfo = (ResourceMap.Instance.RetrieveAsset("./assets-for-pong2d-from-noobtuts/fonts/font.png") as TextureAsset).TextureInfo;

        this._font = new Font(textureInfo, FontParser.Parse("./assets-for-pong2d-from-noobtuts/fonts/font.fnt"));

        this.SetScoreText();

        this._leftControlText = new Text("W/S", this._font);
        this._leftControlText.SetColor(vec4.fromValues(0, 0, 0, 1));
        this._leftControlText.Translate(vec3.fromValues(20, 20, 0));

        this._rightControlText = new Text("Up/Down", this._font);
        this._rightControlText.SetColor(vec4.fromValues(0, 0, 0, 1));
        this._rightControlText.Translate(vec3.fromValues(gl.canvas.width - 130, 20, 0));

        this._racketLeft = new Rect();
        this._racketLeft.XForm.SetPosition(this._racketLeftInitXPos, this._racketLeftInitYPos, 0);
        this._racketLeft.XForm.SetSize(this._racketWidth, this._racketHeight, 1);
        this._racketLeft.Color[0] = 0;
        this._racketLeft.Color[1] = 0.5;
        this._racketLeft.Color[2] = 0;
        this._racketLeft.Color[3] = 1;
        // this._racketLeft.Color = vec4.fromValues(0, 0.5, 0, 1);

        this._racketRight = new Rect();
        this._racketRight.XForm.SetPosition(this._racketRightInitXPos, this._racketRightInitYPos, 0);
        this._racketRight.XForm.SetSize(this._racketWidth, this._racketHeight, 1);
        this._racketRight.Color[0] = 0;
        this._racketRight.Color[1] = 0.5;
        this._racketRight.Color[2] = 0;
        this._racketRight.Color[3] = 1;
        // this._racketRight.Color = vec4.fromValues(0, 0.5, 0, 1);

        this._ball = new Rect();
        this._ball.XForm.SetPosition(this._ballInitXPos, this._ballInitYPos, 0);
        this._ball.XForm.SetSize(this._ballSize, this._ballSize, 1);
        this._ball.Color[0] = 0;
        this._ball.Color[1] = 0;
        this._ball.Color[2] = 0.5;
        this._ball.Color[3] = 1;
        // this._ball.Color = vec4.fromValues(0, 0, 0.5, 1);
    }

    public Update(): void
    {
        this.KeyboardHandler();
        this.UpdateBall();
    }

    private KeyboardHandler(): void
    {
        if (Input.Instance.IsKeyPressed(Input.Instance.Keys.W))
        {
            this._racketLeft.XForm.YPos += this._racketSpeed;
        }
        if (Input.Instance.IsKeyPressed(Input.Instance.Keys.S))
        {
            this._racketLeft.XForm.YPos -= this._racketSpeed;
        }

        if (Input.Instance.IsKeyPressed(Input.Instance.Keys.Up))
        {
            this._racketRight.XForm.YPos += this._racketSpeed;
        }
        if (Input.Instance.IsKeyPressed(Input.Instance.Keys.Down))
        {
            this._racketRight.XForm.YPos -= this._racketSpeed;
        }
    }

    private UpdateBall(): void
    {
        let gl = EngineCore.Instance.gl;
        let width = gl.canvas.width;
        let height = gl.canvas.height;

        this._ball.XForm.XPos += this._ballDirX * this._ballSpeed;
        this._ball.XForm.YPos += this._ballDirY * this._ballSpeed;

        // Hit by left racket?
        if (this._ball.XForm.XPos < this._racketLeft.XForm.XPos + this._racketLeft.XForm.Width / 2 &&
            this._ball.XForm.XPos > this._racketLeft.XForm.XPos - this._racketLeft.XForm.Width / 2 &&
            this._ball.XForm.YPos < this._racketLeft.XForm.YPos + this._racketLeft.XForm.Height / 2 &&
            this._ball.XForm.YPos > this._racketLeft.XForm.YPos - this._racketLeft.XForm.Height / 2)
        {
            // Set fly direction depending on where it hit the racket
            // (t is 0.5 if hit at top, 0 at center, -0.5 at bottom)
            let t = (this._ball.XForm.YPos - this._racketLeft.XForm.YPos) / this._racketLeft.XForm.Height;
            this._ballDirX = Math.abs(this._ballDirX);
            this._ballDirY = t;
        }

        // Hit by right racket?
        if (this._ball.XForm.XPos > this._racketRight.XForm.XPos - this._racketRight.XForm.Width / 2 &&
            this._ball.XForm.XPos < this._racketRight.XForm.XPos + this._racketRight.XForm.Width / 2 &&
            this._ball.XForm.YPos < this._racketRight.XForm.YPos + this._racketRight.XForm.Height / 2 &&
            this._ball.XForm.YPos > this._racketRight.XForm.YPos - this._racketRight.XForm.Height / 2)
        {
            // Set fly direction depending on where it hit the racket
            // (t is 0.5 if hit at top, 0 at center, -0.5 at bottom)
            let t = (this._ball.XForm.YPos - this._racketRight.XForm.YPos) / this._racketRight.XForm.Height;
            this._ballDirX = -Math.abs(this._ballDirX);
            this._ballDirY = t;
        }

        // Hit left wall?
        if (this._ball.XForm.XPos < 0 - this._ball.XForm.Width / 2)
        {
            ++this._scoreRight;
            this.SetScoreText();
            this.ResetPositionsAndStates();
        }

        // Hit right wall?
        if (this._ball.XForm.XPos > width + this._ball.XForm.Width / 2)
        {
            ++this._scoreLeft;
            this.SetScoreText();
            this.ResetPositionsAndStates();
        }

        // Hit top wall?
        if (this._ball.XForm.YPos > height - this._ball.XForm.Width / 2)
        {
            this._ballDirY = -Math.abs(this._ballDirY);
        }

        // Hit bottom wall?
        if (this._ball.XForm.YPos < 0 + this._ball.XForm.Width / 2)
        {
            this._ballDirY = Math.abs(this._ballDirY);
        }

        // Make sure that length of dir stays at 1
        this.Norm(this._ballDirX, this._ballDirY);
        this._ballDirX = this._tempNormVector[0];
        this._ballDirY = this._tempNormVector[1];
    }

    private Norm(x: number, y: number): void
    {
        // Sets a vectors length to 1 (which means that x + y == 1)
        let length = Math.sqrt((x * x) + (y * y));
        if (length !== 0)
        {
            length = 1 / length;
            x *= length;
            y *= length;
        }

        this._tempNormVector[0] = x;
        this._tempNormVector[1] = y;
    }

    private ResetPositionsAndStates(): void
    {
        this._racketLeft.XForm.SetPosition(this._racketLeftInitXPos, this._racketLeftInitYPos, 0);
        this._racketRight.XForm.SetPosition(this._racketRightInitXPos, this._racketRightInitYPos, 0);
        this._ball.XForm.SetPosition(this._ballInitXPos, this._ballInitYPos, 0);
        this._ballDirX = this.GetBallInitDirX();
        this._ballDirY = this._ballInitDirY;
    }

    private GetBallInitDirX(): number
    {
        return (Math.random() > 0.5) ? 1 : -1;
    }

    public Draw(): void
    {
        let gl = EngineCore.Instance.gl;

        EngineCore.Instance.ClearCanvas(this._bgColor);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        this._renderer.DrawColoredRect(this._racketLeft, this._camera.VPMatrix);
        this._renderer.DrawColoredRect(this._racketRight, this._camera.VPMatrix);
        this._renderer.DrawColoredRect(this._ball, this._camera.VPMatrix);

        this._renderer.DrawText(this._scoreText, this._camera.VPMatrix);
        this._renderer.DrawText(this._leftControlText, this._camera.VPMatrix);
        this._renderer.DrawText(this._rightControlText, this._camera.VPMatrix);
    }

    public Unload(): void
    {

    }

    private SetScoreText(): void
    {
        let gl = EngineCore.Instance.gl;
        let text = `${this._scoreLeft}:${this._scoreRight}`;
        this._scoreText = new Text(text, this._font);
        this._scoreText.SetColor(vec4.fromValues(0, 0, 0, 1));
        this._scoreText.Translate(vec3.fromValues(gl.canvas.width / 2.0 - 10, gl.canvas.height - 15.0, 0));
    }
}