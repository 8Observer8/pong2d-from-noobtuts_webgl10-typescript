import Scene from "./Scene";
import EngineCore from "./Engine/Core/EngineCore";

class Program
{
    public static Main(): void
    {
        let scene = new Scene();
        EngineCore.Instance.Initialize("renderCanvas", scene);
    }
}

// Debug Version
Program.Main();

// Release Version
// window.onload = () => Program.Main();
