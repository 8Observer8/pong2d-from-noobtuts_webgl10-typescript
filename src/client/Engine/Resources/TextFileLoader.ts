import ResourceMap from "./ResourceMap";
import TextAsset from "./Assets/TextAsset";
import XmlAsset from "./Assets/XmlAsset";

export enum FileType
{
    XmlFile, TextFile
}

export default class TextFileLoader
{
    private static _instance: TextFileLoader = null;
    private constructor() { }

    public static get Instance(): TextFileLoader
    {
        if (this._instance === null)
        {
            this._instance = new TextFileLoader();
        }
        return this._instance;
    }

    public LoadTextFile(
        fileName: string, fileType: FileType,
        callbackFunction: (fileName: string) => void): void
    {
        if (!ResourceMap.Instance.IsAssetLoaded(fileName))
        {
            ResourceMap.Instance.AsyncLoadRequested(fileName);

            let req = new XMLHttpRequest();

            req.onreadystatechange = () =>
            {
                if ((req.readyState === 4) && (req.status !== 200))
                {
                    console.log("TextFileLoader.ts. LoadTextFile(). Message: failed to load the file: " + fileName);
                    return;
                }
            };
            req.open("GET", fileName, true);
            req.setRequestHeader("Content-Type", "text/xml");

            req.onload = () =>
            {
                let fileContent: string | Document = null;

                if (fileType === FileType.XmlFile)
                {
                    let parser = new DOMParser();
                    fileContent = parser.parseFromString(req.responseText, "text/xml");
                    let xmlAsset = new XmlAsset(fileContent);
                    ResourceMap.Instance.AsyncLoadComleted(fileName, xmlAsset);
                }
                else if (fileType === FileType.TextFile)
                {
                    fileContent = req.responseText;
                    let textAsset = new TextAsset(fileContent);
                    ResourceMap.Instance.AsyncLoadComleted(fileName, textAsset);
                }

                if ((callbackFunction !== null) && (callbackFunction !== undefined))
                {
                    callbackFunction(fileName);
                }
            }

            req.send();
        }
        else
        {
            ResourceMap.Instance.IncAssetRefCount(fileName);
            if ((callbackFunction !== null) && (callbackFunction !== undefined))
            {
                callbackFunction(fileName);
            }
        }
    }
}