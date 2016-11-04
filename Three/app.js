var ThreeGame = (function () {
    function ThreeGame() {
        this.game = new Phaser.Game(GRID_SIZE * MAP_SIZE, GRID_SIZE * MAP_SIZE + UI_SIZE, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }
    ThreeGame.prototype.preload = function () {
        this.game.load.image('white', 'resource/white.png');
        this.game.load.image('red', 'resource/red.png');
        this.game.load.image('blue', 'resource/blue.png');
    };
    ThreeGame.prototype.create = function () {
        this.ui = new UI(this.game);
        this.scene = new Scene(this.game, this.ui);
    };
    ThreeGame.prototype.update = function () {
        // Only register input if input_flag is ON
        if (input_flag) {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.scene.moveBlocks(KEY_UP);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.scene.moveBlocks(KEY_DOWN);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.scene.moveBlocks(KEY_LEFT);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.scene.moveBlocks(KEY_RIGHT);
            }
        }
    };
    return ThreeGame;
}());
// CONSTANTS
var UI_SIZE = 150; // Size of UI part
var GRID_SIZE = 100; // Size of one grid
var MAP_SIZE = 4; // Map size by grid
var KEY_UP = 1;
var KEY_RIGHT = 2;
var KEY_DOWN = 3;
var KEY_LEFT = 4;
var ANIMATION_TIME = 200; //ms
var FONT_SIZE = 40; // Size of text on block
var STYLE = { font: FONT_SIZE + "px Arial", fill: "#000000" };
var FONT_SIZE_LABEL = 35; // Size of text on ui
var STYLE_LABEL = { font: FONT_SIZE_LABEL + "px Arial", fill: "#FFFFFF" };
var STYLE_LABEL_WARNING = { font: FONT_SIZE_LABEL + "px Arial", fill: "#FF0000" };
var BLOCK_ID = 1; // Track block
var BLOCK_VALUE_ONE = 1;
var BLOCK_VALUE_TWO = 2;
var BLOCK_VALUE_THREE = 3;
// Flags and Global variables
var input_flag = 1; // 1 = can input
var move_flag = 0; // 1 = block was moved
var game;
var last_key_pressed = 0;
var next_block_value = 0;
window.onload = function () {
    game = new ThreeGame();
};
//# sourceMappingURL=app.js.map