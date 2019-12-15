import Asset from "./Asset";

export default class TextAsset extends Asset
{
    private _fileContent: string;

    public constructor(fileContent: string)
    {
        super();
        this._fileContent = fileContent;
    }

    public get FileContent(): string
    {
        return this._fileContent;
    }
}
