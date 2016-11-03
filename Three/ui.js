var UI = (function () {
    function UI(_game) {
        this.game = _game;
        this.elements = new Phaser.Group(_game);
        this.moveCountLabel = new Label(_game, 0, 0, "MOVE");
        this.elements.add(this.moveCountLabel);
        this.pointCountLabel = new Label(_game, 0, FONT_SIZE_LABEL * 1.2, "POINT");
        this.elements.add(this.pointCountLabel);
        this.warningLabel = new Warning(_game, 0, FONT_SIZE_LABEL * 2 * 1.2, "Use arrow keys to move");
        this.elements.add(this.warningLabel);
    }
    UI.prototype.addMoveCount = function (value) {
        if (value === void 0) { value = 1; }
        this.moveCountLabel.increaseValue(value);
    };
    UI.prototype.addPointCount = function (value) {
        if (value === void 0) { value = 1; }
        this.pointCountLabel.increaseValue(value);
    };
    UI.prototype.showWarning = function (text) {
        this.warningLabel.changeText(text);
    };
    return UI;
}());
//# sourceMappingURL=ui.js.map