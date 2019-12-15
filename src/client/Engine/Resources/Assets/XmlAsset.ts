import Asset from "./Asset";

export default class XmlAsset extends Asset
{
    private _xmlContent: Document;

    public constructor(xmlContent: Document)
    {
        super();
        this._xmlContent = xmlContent;
    }

    public get XmlContent(): Document
    {
        return this._xmlContent;
    }
}
