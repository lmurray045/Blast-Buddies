class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }
    
    preload() {
        
    }

    create() {
        console.log("menu scene")
        //make inputs
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        this.scene.start('loadScene')
    }
}
