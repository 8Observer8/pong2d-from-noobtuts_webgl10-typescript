define(["require", "exports", "./CharacterSprite", "./Sprite", "./Point"], function (require, exports, CharacterSprite_1, Sprite_1, Point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Font = /** @class */ (function () {
        function Font(textureInfo, charData) {
            this._textureInfo = null;
            this._textureInfo = textureInfo;
            this._charData = charData;
        }
        Font.prototype.CreateSprite = function (charCode) {
            var charData = this._charData[charCode];
            var sprite = new Sprite_1.default();
            sprite.TextureInfo = this._textureInfo;
            // Setup UVs
            var topLeft = new Point_1.default(charData.X / this._textureInfo.Width, charData.Y / this._textureInfo.Height);
            var bottomRight = new Point_1.default(topLeft.X + (charData.Width / this._textureInfo.Width), topLeft.Y + (charData.Height / this._textureInfo.Height));
            sprite.SetUVs(topLeft, bottomRight);
            sprite.XForm.Width = charData.Width;
            sprite.XForm.Height = charData.Height;
            return new CharacterSprite_1.default(sprite, charData);
        };
        return Font;
    }());
    exports.default = Font;
});
//# sourceMappingURL=Font.js.map