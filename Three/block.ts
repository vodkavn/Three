// Block extend from Sprite to have full properies and methods from Sprite
class Block extends Phaser.Sprite {

    constructor(_game: Phaser.Game, _scene: Scene, _pos_x = 0, _pos_y = 0, _value = 0) {
        var _color;
        switch (_value) {
            case 1:
                _color = 'blue';
                break;
            case 2:
                _color = 'red';
                break;
            default:
                _color = 'white';
        }
        // Init block as sprite (call super)
        super(_game, GRID_SIZE * _pos_x, GRID_SIZE * _pos_y, _color);
        this.game = _game;
        this.scene = _scene;
        this.id = BLOCK_ID++;
        this.value = _value;
        this.color = _color;
        this.pos_x = _pos_x;
        this.pos_y = _pos_y;
        this.after_x = null;
        this.after_y = null;
        this.delete_flag = 0;

        // Add text on block
        var label = this.game.add.text((GRID_SIZE - FONT_SIZE) / 2, (GRID_SIZE - FONT_SIZE) / 2, this.value, STYLE);
        this.addChild(label);
    }

    // Custom properties
    game: Phaser.Game;
    scene: Scene;
    id;
    value;
    pos_x;
    pos_y;
    after_x;
    after_y;
    color;
    delete_flag; // Use to mark this block for remove

    // Custom methods
    // Calculate block position
    getAfterMovePosition(_key) {
        var _new_x = this.pos_x;
        var _new_y = this.pos_y;
        switch (_key) {
            case KEY_UP:
                _new_y = this.pos_y - 1;
                if (_new_y < 0)
                    return;
                break;
            case KEY_DOWN:
                _new_y = this.pos_y + 1;
                if (_new_y >= MAP_SIZE)
                    return;
                break;
            case KEY_LEFT:
                _new_x = this.pos_x - 1;
                if (_new_x < 0)
                    return;
                break;
            case KEY_RIGHT:
                _new_x = this.pos_x + 1;
                if (_new_x >= MAP_SIZE)
                    return;
                break;
            default:
                return;
        }

        // Only move if there's no block at the new position
        if ((this.pos_x != _new_x || this.pos_y != _new_y)) {
            this.after_x = _new_x;
            this.after_y = _new_y;
            var afterBlock = this.getAfterPositionBlock();
            if (afterBlock) {
                if (this.canCombineBlock(afterBlock)) {
                    move_flag = 1;
                } else {
                    this.after_x = null;
                    this.after_y = null;
                }
            } else {
                move_flag = 1;
            }
        }
    }

    getAfterPositionBlock() {
        for (var i in this.scene.blockList.children) {
            var block = this.scene.blockList.children[i] as Block;
            if (block.afterPositionCheck(this.after_x, this.after_y, this.id)) {
                return block;
            }
        }
        return null;
    }

    // Check if this block position is at (_x, _y)
    currentPositionCheck(_x, _y) {
        return this.pos_x == _x && this.pos_y == _y;
    }

    afterPositionCheck(_x, _y, _id) {
        // Return false if same block
        if (this.id == _id)
            return false;
        // Check current position if this block doesn't have after position
        if (!this.haveAfterPosition())
            return this.currentPositionCheck(_x, _y);
        return this.after_x == _x && this.after_y == _y;
    }

    canCombineBlock(block: Block) {
        return (this.value + block.value == 3) || (this.value == block.value && this.value > 2);
    }

    combineBlock(block: Block) {
        this.value += block.value;
        this.color = 'white';
        this.loadTexture(this.color, 0);
        var label = this.children[0] as Phaser.Text;
        label.text = this.value;
    }

    haveAfterPosition() {
        return this.after_x != null && this.after_y != null
    }

    updatePosition() {
        this.pos_x = this.after_x;
        this.pos_y = this.after_y;
        this.after_x = null;
        this.after_y = null;
    }
}