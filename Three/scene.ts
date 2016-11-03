// Game scene
class Scene {
    constructor(_game: Phaser.Game, _ui: UI) {
        this.game = _game;
        this.ui = _ui;
        this.blockList = new Phaser.Group(_game);
        this.blockList.y = UI_SIZE;
    }

    game: Phaser.Game;
    ui: UI;
    blockList: Phaser.Group;

    // Add blocks
    // Call on init game
    addBlock() {
        this.blockList.add(new Block(this.game, this, this.ui, 0, 0, 1));
    }

    // Add block at random position
    addRandomBlock() {
        // Stop if there's no space left to add block
        if (!this.canAddBlocks()) {
            // Add gameover here
            return;
        }

        var _x;
        var _y;
        var _value;
        // Random position until fitable position found
        do {
            _x = Math.floor(Math.random() * MAP_SIZE);
            _y = Math.floor(Math.random() * MAP_SIZE);
            _value = Math.floor(Math.random() * 3) + 1;
        } while (this.getBlock(_x, _y));
        this.blockList.add(new Block(this.game, this, this.ui, _x, _y, _value));
    }

    // Add random block on edge depend on last key pressed
    addRandomBlockOnEdge() {
        // Stop if there's no space left to add block
        if (!this.canAddBlocks()) {
            // Add gameover here
            return;
        }

        if (!last_key_pressed) {
            return;
        }

        var _x = null;
        var _y = null;
        var _value;
        var _temp_x;
        var _temp_y;
        switch (last_key_pressed) {
            case KEY_UP:
                _y = MAP_SIZE - 1;
                break;
            case KEY_DOWN:
                _y = 0;
                break;
            case KEY_LEFT:
                _x = MAP_SIZE - 1;
                break;
            case KEY_RIGHT:
                _x = 0;
                break;
        }
        // Random position until fitable position found
        do {
            _temp_x = _x != null ? _x : Math.floor(Math.random() * MAP_SIZE);
            _temp_y = _y != null ? _y : Math.floor(Math.random() * MAP_SIZE);          
        } while (this.getBlock(_temp_x, _temp_y));
        _x = _temp_x;
        _y = _temp_y;
        _value = Math.floor(Math.random() * 3) + 1;
        this.blockList.add(new Block(this.game, this, this.ui, _x, _y, _value));
        last_key_pressed = 0;
    }

    // Check if there is any block in (_x, _y) and return its
    // return null if empty
    getBlock(_x, _y) {
        for (var i in this.blockList.children) {
            var block = this.blockList.children[i] as Block;
            if (block.currentPositionCheck(_x, _y)) {
                return block;
            }
        }
        return null;
    }

    // Can add blocks or not
    canAddBlocks() {
        return this.blockList.children.length < MAP_SIZE * MAP_SIZE;
    }

    // Move blocks
    moveBlocks(_key) {
        // Stop if there's no space left to move
        //if (!this.canAddBlocks()) {
        //    return;
        //}

        // Turn flag off to prevent further input
        input_flag = 0;

        if (_key == KEY_UP || _key == KEY_DOWN) {
            for (var a = 0; a < MAP_SIZE; a++) {
                if (_key == KEY_UP) {
                    for (var b = 0; b < MAP_SIZE; b++) {
                        var block = this.getBlock(a, b);
                        if (block) {
                            block.getAfterMovePosition(_key);
                        }
                    }
                } else {
                    for (var b = MAP_SIZE; b >= 0; b--) {
                        var block = this.getBlock(a, b);
                        if (block) {
                            block.getAfterMovePosition(_key);
                        }
                    }
                }
            }
        } else {
            for (var b = 0; b < MAP_SIZE; b++) {
                if (_key == KEY_LEFT) {
                    for (var a = 0; a < MAP_SIZE; a++) {
                        var block = this.getBlock(a, b);
                        if (block) {
                            block.getAfterMovePosition(_key);
                        }
                    }
                } else {
                    for (var a = MAP_SIZE; a >= 0; a--) {
                        var block = this.getBlock(a, b);
                        if (block) {
                            block.getAfterMovePosition(_key);
                        }
                    }
                }
            }
        }

        if (move_flag) {
            last_key_pressed = _key;
            for (var i in this.blockList.children) {
                var block = this.blockList.children[i] as Block;
                if (block.haveAfterPosition()) {
                    // Call each block move animation
                    var tween = this.game.add.tween(block);
                    tween.to({ x: GRID_SIZE * block.after_x, y: GRID_SIZE * block.after_y }, ANIMATION_TIME);
                    tween.start();
                    block.updatePosition();
                }
            }
        }
        // Add timer to call afterMove right after the animation stop
        this.game.time.events.add(Phaser.Timer.SECOND * ANIMATION_TIME / 900, this.afterMove, this);
    }

    // Remove stacked blocks
    removeStackedBlocks() {
        // Mark blocks for destroy
        for (var i = 0; i < this.blockList.children.length; i++) {
            var block1 = this.blockList.children[i] as Block;
            for (var j = i + 1; j < this.blockList.children.length; j++) {
                var block2 = this.blockList.children[j] as Block;
                if (block1.currentPositionCheck(block2.pos_x, block2.pos_y) && !block1.delete_flag) {
                    block1.delete_flag = 1;
                    block2.combineBlock(block1);
                }
            }
        }

        // Destroy marked blocks from the last element to first to prevent error
        var count = 0;
        for (var k = this.blockList.children.length - 1; k >= 0; k--) {
            var block = this.blockList.children[k] as Block;
            if (block.delete_flag) {
                block.destroy();
                count++;
            }
        }
    }

    // After moving blocks, there's something need to be done!!
    afterMove() {
        if (move_flag) {
            // Add move count
            this.ui.addMoveCount();
            this.removeStackedBlocks();
            this.addRandomBlockOnEdge();
            move_flag = 0;
        }

        if (!this.isGameOver()) {
            // Enable flag to receive input again
            input_flag = 1;
        } else {
            console.log("GAMEOVER")
            this.ui.showWarning("GAMEOVER");
        }
    }

    // Gameover check
    isGameOver() {
        if (this.canAddBlocks())
            return false;
        for (var i in this.blockList.children) {
            var block = this.blockList.children[i] as Block;
            if (block.canCombineAroundBlocks())
                return false;
        }
        return true;
    }
}