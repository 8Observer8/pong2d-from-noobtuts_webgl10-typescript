define(["require", "exports", "gl-matrix"], function (require, exports, gl_matrix_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Text = /** @class */ (function () {
        function Text(text, font) {
            this._font = null;
            this._bitmapText = [];
            this._color = gl_matrix_1.vec4.fromValues(1, 1, 1, 1);
            this._text = text;
            this._font = font;
            this.CreateText(0, 0, 0);
        }
        Object.defineProperty(Text.prototype, "CharacterSprites", {
            get: function () {
                return this._bitmapText;
            },
            enumerable: true,
            configurable: true
        });
        Text.prototype.CreateText = function (x, y, z) {
            this._bitmapText = [];
            var currentX = x;
            var currentY = y;
            for (var i = 0; i < this._text.length; i++) {
                var sprite = this._font.CreateSprite(this._text.charCodeAt(i));
                var xOffset = sprite.Data.XOffset / 2.0;
                var yOffset = sprite.Data.YOffset / 2.0;
                sprite.Sprite.SetPosition(currentX + xOffset, currentY - yOffset, z);
                currentX += sprite.Data.XAdvance;
                this._bitmapText.push(sprite);
            }
            this.SetColor(this._color);
        };
        Text.prototype.SetColor = function (color) {
            var _this = this;
            this._color = color;
            this._bitmapText.forEach(function (s) {
                s.Sprite.Color = _this._color;
            });
        };
        Text.prototype.Translate = function (vector) {
            this._bitmapText.forEach(function (s) {
                s.Sprite.SetPosition(s.Sprite.XForm.XPos + vector[0], s.Sprite.XForm.YPos + vector[1], s.Sprite.XForm.ZPos + vector[2]);
            });
        };
        return Text;
    }());
    exports.default = Text;
});
//# sourceMappingURL=Text.js.map