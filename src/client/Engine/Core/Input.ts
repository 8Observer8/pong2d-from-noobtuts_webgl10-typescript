export default class Input
{
    private static _instance: Input;

    private constructor() { }

    public Keys = { // Key code constants
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
    private _keyPreviousState: boolean[] = [];
    // The pressed keys
    private _isKeyPressed: boolean[] = [];
    // Click events: once an event is set, it will remain there until polled
    private _isKeyClicked: boolean[] = [];

    private OnKeyDown(event: KeyboardEvent): void
    {
        this._isKeyPressed[event.keyCode] = true;
    }

    private OnKeyUp(event: KeyboardEvent): void
    {
        this._isKeyPressed[event.keyCode] = false;
    }

    public static get Instance()
    {
        if (this._instance == null)
        {
            this._instance = new Input();
        }
        return this._instance;
    }

    public Initialize(): void
    {
        for (let i = 0; i < this.Keys.LastKeyCode; i++)
        {
            this._isKeyPressed[i] = false;
            this._keyPreviousState[i] = false;
            this._isKeyClicked[i] = false;
        }

        // register handlers 
        window.addEventListener('keyup', (event) => { this.OnKeyUp(event); });
        window.addEventListener('keydown', (event) => { this.OnKeyDown(event); });
    }

    public Update(): void
    {
        for (let i = 0; i < this.Keys.LastKeyCode; i++)
        {
            this._isKeyClicked[i] = (!this._keyPreviousState[i]) && this._isKeyPressed[i];
            this._keyPreviousState[i] = this._isKeyPressed[i];
        }
    }

    public IsKeyPressed(keyCode: number): boolean
    {
        return this._isKeyPressed[keyCode];
    }

    public IsKeyClicked(keyCode: number): boolean
    {
        return this._isKeyClicked[keyCode];
    }
}
