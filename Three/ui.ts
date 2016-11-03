class UI {
    constructor(_game: Phaser.Game) {
        this.game = _game;
        this.elements = new Phaser.Group(_game);

        this.moveCountLabel = new Label(_game, 0, 0, "MOVE");
        this.elements.add(this.moveCountLabel);
        this.pointCountLabel = new Label(_game, 0, FONT_SIZE_LABEL * 1.2, "POINT");
        this.elements.add(this.pointCountLabel);
        this.warningLabel = new Warning(_game, 0, FONT_SIZE_LABEL * 2 * 1.2, "Use arrow keys to move");
        this.elements.add(this.warningLabel);
    }

    game: Phaser.Game;
    elements: Phaser.Group;
    moveCountLabel: Label;
    pointCountLabel: Label;
    warningLabel: Warning;

    addMoveCount(value = 1) {
        this.moveCountLabel.increaseValue(value);
    }

    addPointCount(value = 1) {
        this.pointCountLabel.increaseValue(value);
    }

    showWarning(text) {
        this.warningLabel.changeText(text);
    }
}