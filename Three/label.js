var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Label = (function (_super) {
    __extends(Label, _super);
    function Label(_game, _x, _y, _text) {
        _super.call(this, _game, _x, _y, _text + " " + 0, STYLE_LABEL);
        this.game = _game;
        this.value = 0;
        this.title = _text;
    }
    Label.prototype.increaseValue = function (amount) {
        if (amount === void 0) { amount = 1; }
        this.value += amount;
        this.changeText(this.title + " " + this.value);
    };
    Label.prototype.changeText = function (text) {
        this.text = text;
    };
    return Label;
}(Phaser.Text));
//# sourceMappingURL=label.js.map