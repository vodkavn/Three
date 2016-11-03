class Label extends Phaser.Text {
    constructor(_game: Phaser.Game, _x, _y, _text) {
        super(_game, _x, _y, _text + " " + 0, STYLE_LABEL);

        this.game = _game;
        this.value = 0;
        this.title = _text;
    }
    
    game: Phaser.Game;
    title;
    value;

    increaseValue(amount = 1) {
        this.value += amount;
        this.changeText(this.title + " " + this.value);
    }

    changeText(text) {
        this.text = text;
    }
}