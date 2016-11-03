var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Warning = (function (_super) {
    __extends(Warning, _super);
    function Warning(_game, _x, _y, _text) {
        _super.call(this, _game, _x, _y, _text, STYLE_LABEL_WARNING);
        this.game = _game;
    }
    Warning.prototype.changeText = function (text) {
        this.text = text;
    };
    return Warning;
}(Phaser.Text));
//# sourceMappingURL=warning.js.map