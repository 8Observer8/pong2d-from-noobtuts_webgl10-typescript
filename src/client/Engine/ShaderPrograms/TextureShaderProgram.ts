import ColorShaderProgram from "./ColorShaderProgram";

export default class TextureShaderProgram extends ColorShaderProgram
{
    protected _aTexCoordLocation: number;
    
    public constructor(vertexShaderPath: string, fragmentShaderPath: string)
    {
        super(vertexShaderPath, fragmentShaderPath);

        this._aTexCoordLocation = this._gl.getAttribLocation(this._shaderProgram, "aTexCoord");
        if (this._aTexCoordLocation < 0)
        {
            console.log("Failed to get the storage location of aTexCoord");
            return;
        }
    }
}