define(["require", "exports", "./CharData", "./Engine/Resources/ResourceMap"], function (require, exports, CharData_1, ResourceMap_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FontParser = /** @class */ (function () {
        function FontParser() {
        }
        // Gets the value after an equal sign and converts it
        // from a string to an integer
        FontParser.GetValue = function (s) {
            var value = s.substr(s.indexOf("=") + 1);
            return parseInt(value);
        };
        FontParser.Parse = function (filePath) {
            var charDictionary = {}; //  { char: string, charData: CharData }
            var fileContent = ResourceMap_1.default.Instance.RetrieveAsset(filePath).FileContent;
            var lines = fileContent.split("\n");
            for (var i = this.HeaderSize; i < lines.length; i++) {
                if (lines[i] === "")
                    break;
                var firstLine = lines[i];
                var typesAndValues = firstLine.split(/(\s+)/).filter(function (el) {
                    return el.trim().length > 0;
                });
                // All the data comes in a certain order,
                // used to make the parser shorter
                var charData = new CharData_1.default();
                charData.Id = this.GetValue(typesAndValues[1]);
                charData.X = this.GetValue(typesAndValues[2]);
                charData.Y = this.GetValue(typesAndValues[3]);
                charData.Width = this.GetValue(typesAndValues[4]);
                charData.Height = this.GetValue(typesAndValues[5]);
                charData.XOffset = this.GetValue(typesAndValues[6]);
                charData.YOffset = this.GetValue(typesAndValues[7]);
                charData.XAdvance = this.GetValue(typesAndValues[8]);
                charDictionary[charData.Id.toString()] = charData;
            }
            return charDictionary;
        };
        FontParser.HeaderSize = 4;
        return FontParser;
    }());
    exports.default = FontParser;
});
//# sourceMappingURL=FontParser.js.map