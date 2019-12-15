define(["require", "exports", "./MapEntry"], function (require, exports, MapEntry_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ResourceMap = /** @class */ (function () {
        function ResourceMap() {
            this._resourceMap = [];
            this._numOutstandingLoads = 0;
        }
        Object.defineProperty(ResourceMap, "Instance", {
            get: function () {
                if (this._instance === null) {
                    this._instance = new ResourceMap();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        ResourceMap.prototype.IsAssetLoaded = function (rName) {
            return (rName in this._resourceMap);
        };
        ResourceMap.prototype.AsyncLoadRequested = function (rName) {
            this._resourceMap[rName] = new MapEntry_1.default();
            ++this._numOutstandingLoads;
        };
        ResourceMap.prototype.IncAssetRefCount = function (rName) {
            this._resourceMap[rName].RefCount++;
        };
        ResourceMap.prototype.SetLoadCompleteCallback = function (callbackFunction) {
            this._loadCompliteCallback = callbackFunction;
            this.CheckForAllLoadCompleted();
        };
        ResourceMap.prototype.AsyncLoadComleted = function (rName, asset) {
            if (!this.IsAssetLoaded(rName)) {
                console.log("ResourceMap.ts, AsyncLoadCompleted(). \"" + rName + "\" is not in the map.");
                return;
            }
            this._resourceMap[rName].Asset = asset;
            --this._numOutstandingLoads;
            this.CheckForAllLoadCompleted();
        };
        ResourceMap.prototype.RetrieveAsset = function (rName) {
            var r = null;
            if (rName in this._resourceMap) {
                r = this._resourceMap[rName].Asset;
            }
            else {
                console.log("ResourceMap.ts, RetrieveAsset(). \"" + rName + "\" is not in the map.");
            }
            return r;
        };
        ResourceMap.prototype.CheckForAllLoadCompleted = function () {
            if ((this._numOutstandingLoads === 0) && this._loadCompliteCallback !== null) {
                var funcToCall = this._loadCompliteCallback;
                this._loadCompliteCallback = null;
                funcToCall();
            }
        };
        ResourceMap._instance = null;
        return ResourceMap;
    }());
    exports.default = ResourceMap;
});
//# sourceMappingURL=ResourceMap.js.map