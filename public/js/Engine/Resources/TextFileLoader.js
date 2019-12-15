define(["require", "exports", "./ResourceMap", "./Assets/TextAsset", "./Assets/XmlAsset"], function (require, exports, ResourceMap_1, TextAsset_1, XmlAsset_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FileType;
    (function (FileType) {
        FileType[FileType["XmlFile"] = 0] = "XmlFile";
        FileType[FileType["TextFile"] = 1] = "TextFile";
    })(FileType = exports.FileType || (exports.FileType = {}));
    var TextFileLoader = /** @class */ (function () {
        function TextFileLoader() {
        }
        Object.defineProperty(TextFileLoader, "Instance", {
            get: function () {
                if (this._instance === null) {
                    this._instance = new TextFileLoader();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        TextFileLoader.prototype.LoadTextFile = function (fileName, fileType, callbackFunction) {
            if (!ResourceMap_1.default.Instance.IsAssetLoaded(fileName)) {
                ResourceMap_1.default.Instance.AsyncLoadRequested(fileName);
                var req_1 = new XMLHttpRequest();
                req_1.onreadystatechange = function () {
                    if ((req_1.readyState === 4) && (req_1.status !== 200)) {
                        console.log("TextFileLoader.ts. LoadTextFile(). Message: failed to load the file: " + fileName);
                        return;
                    }
                };
                req_1.open("GET", fileName, true);
                req_1.setRequestHeader("Content-Type", "text/xml");
                req_1.onload = function () {
                    var fileContent = null;
                    if (fileType === FileType.XmlFile) {
                        var parser = new DOMParser();
                        fileContent = parser.parseFromString(req_1.responseText, "text/xml");
                        var xmlAsset = new XmlAsset_1.default(fileContent);
                        ResourceMap_1.default.Instance.AsyncLoadComleted(fileName, xmlAsset);
                    }
                    else if (fileType === FileType.TextFile) {
                        fileContent = req_1.responseText;
                        var textAsset = new TextAsset_1.default(fileContent);
                        ResourceMap_1.default.Instance.AsyncLoadComleted(fileName, textAsset);
                    }
                    if ((callbackFunction !== null) && (callbackFunction !== undefined)) {
                        callbackFunction(fileName);
                    }
                };
                req_1.send();
            }
            else {
                ResourceMap_1.default.Instance.IncAssetRefCount(fileName);
                if ((callbackFunction !== null) && (callbackFunction !== undefined)) {
                    callbackFunction(fileName);
                }
            }
        };
        TextFileLoader._instance = null;
        return TextFileLoader;
    }());
    exports.default = TextFileLoader;
});
//# sourceMappingURL=TextFileLoader.js.map