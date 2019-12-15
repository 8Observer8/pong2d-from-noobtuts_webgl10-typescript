import Scene from "../../Scene";
import ResourceMap from "../Resources/ResourceMap";

export default class GameLoop
{
    private static _instance: GameLoop = null;
    private readonly _FPS = 60; // Frames per second
    private readonly _MPF = 1000 / this._FPS; // Milliseconds per frame

    // Variables for timing gameloop
    private _previousTime: number;
    private _lagTime: number;
    private _currentTime: number;
    private _elapsedTime: number;

    // The current loop state (running or should stop)
    private _isLoopRunning = false;

    private _scene: Scene = null;

    private constructor() { }

    public static get Instance(): GameLoop
    {
        if (this._instance === null)
        {
            this._instance = new GameLoop;
        }
        return this._instance;
    }

    private RunLoop()
    {
        if (this._isLoopRunning)
        {
            requestAnimationFrame(() => { this.RunLoop(); });

            this._currentTime = Date.now();
            this._elapsedTime = this._currentTime - this._previousTime;
            this._previousTime = this._currentTime;
            this._lagTime += this._elapsedTime;

            while ((this._lagTime >= this._MPF) && this._isLoopRunning)
            {
                // Engine.Input.Instance.Update();
                this._scene.Update();
                this._lagTime -= this._MPF;
            }

            this._scene.Draw();
        }
        else
        {
            this._scene.Unload();
        }
    }

    public StartLoop()
    {
        this._previousTime = Date.now();
        this._lagTime = 0.0;

        this._isLoopRunning = true;

        requestAnimationFrame(() => { this.RunLoop(); });
    }

    public Start(scene: Scene)
    {
        this._scene = scene;
        ResourceMap.Instance.SetLoadCompleteCallback(
            () =>
            {
                this._scene.Initialize();
                this.StartLoop();
            }
        );
    }

    public Stop()
    {
        this._isLoopRunning = false;
    }
}