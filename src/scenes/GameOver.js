class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create() {
        console.log("GameOver Scene")
        this.KEYS = this.scene.get('keyScene').KEYS
        //CITATION: This is also taken from Paddle Parkour
        // add snapshot image from prior Scene
        if (this.textures.exists('titlesnapshot')) {
            this.add.image(globalWidth/2, globalHeight/2, 'titlesnapshot').setOrigin(0.5);
        } else {
            console.log('texture error');
        }

        //game over text
        this.add.bitmapText(globalWidth / 2, (globalHeight / 2) - 32, 'dogica_font', 'GAME OVER', 20).setOrigin(0.5)
        this.add.bitmapText(globalWidth / 2, (globalHeight / 2), 'dogica_font', 'R to RESTART', 10).setOrigin(0.5)
        this.add.bitmapText(globalWidth / 2, (globalHeight / 2) + 32, 'dogica_font', 'M for MENU', 10).setOrigin(0.5)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.MENU_R)){
            this.scene.start('loadScene')
        }
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.MENU_M)){
            this.scene.start('menuScene')
        }
        
    }
}