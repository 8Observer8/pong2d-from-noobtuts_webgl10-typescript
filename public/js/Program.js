define(["require", "exports", "./Scene", "./Engine/Core/EngineCore"], function (require, exports, Scene_1, EngineCore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Program = /** @class */ (function () {
        function Program() {
        }
        Program.Main = function () {
            var scene = new Scene_1.default();
            EngineCore_1.default.Instance.Initialize("renderCanvas", scene);
        };
        return Program;
    }());
    // Debug Version
    Program.Main();
});
// Release Version
// window.onload = () => Program.Main();
//# sourceMappingURL=Program.js.map