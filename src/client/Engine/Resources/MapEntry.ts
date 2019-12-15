import Asset from "./Assets/Asset";

export default class MapEntry
{
    private _refCount = 1;
    private _asset: Asset = null;

    public get RefCount(): number
    {
        return this._refCount;
    }
    public set RefCount(v: number)
    {
        this._refCount = v;
    }

    public get Asset(): Asset
    {
        return this._asset;
    }
    public set Asset(v: Asset)
    {
        this._asset = v;
    }
}