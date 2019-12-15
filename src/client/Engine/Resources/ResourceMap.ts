
import MapEntry from "./MapEntry";
import Asset from "./Assets/Asset";

export default class ResourceMap
{
    private static _instance: ResourceMap = null;
    private _resourceMap: { rName: string, mapEntry: MapEntry }[] = [];
    private _numOutstandingLoads = 0;
    private _loadCompliteCallback: () => void;

    private constructor() { }

    public static get Instance(): ResourceMap
    {
        if (this._instance === null)
        {
            this._instance = new ResourceMap();
        }
        return this._instance;
    }

    public IsAssetLoaded(rName: string): boolean
    {
        return (rName in this._resourceMap);
    }

    public AsyncLoadRequested(rName: string): void
    {
        this._resourceMap[rName] = new MapEntry();
        ++this._numOutstandingLoads;
    }

    public IncAssetRefCount(rName: string): void
    {
        (this._resourceMap[rName] as MapEntry).RefCount++;
    }

    public SetLoadCompleteCallback(callbackFunction: () => void): void
    {
        this._loadCompliteCallback = callbackFunction;
        this.CheckForAllLoadCompleted();
    }

    public AsyncLoadComleted(rName: string, asset: Asset)
    {
        if (!this.IsAssetLoaded(rName))
        {
            console.log(`ResourceMap.ts, AsyncLoadCompleted(). "${rName}" is not in the map.`);
            return;
        }
        (this._resourceMap[rName] as MapEntry).Asset = asset;
        --this._numOutstandingLoads;
        this.CheckForAllLoadCompleted();
    }

    public RetrieveAsset(rName: string): Asset
    {
        let r: Asset = null;
        if (rName in this._resourceMap)
        {
            r = (this._resourceMap[rName] as MapEntry).Asset;
        }
        else
        {
            console.log(`ResourceMap.ts, RetrieveAsset(). "${rName}" is not in the map.`);
        }
        return r;
    }

    private CheckForAllLoadCompleted(): void
    {
        if ((this._numOutstandingLoads === 0) && this._loadCompliteCallback !== null)
        {
            let funcToCall = this._loadCompliteCallback;
            this._loadCompliteCallback = null;
            funcToCall();
        }
    }
}
