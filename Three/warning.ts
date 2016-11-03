class Warning extends Phaser.Text {
    constructor(_game: Phaser.Game, _x, _y, _text) {
        super(_game, _x, _y, _text, STYLE_LABEL_WARNING);

        this.game = _game;
    }

    game: Phaser.Game;

    changeText(text) {
        this.text = text;
    }
}