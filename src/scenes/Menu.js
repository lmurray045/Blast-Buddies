class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }
    
    preload() {
        this.load.bitmapFont('dogica_font', 'assets/fonts/dogica.png', 'assets/fonts/dogica.xml')
        this.load.bitmapFont('dogica_reg_font', 'assets/fonts/dogica_reg.png', 'assets/fonts/dogica_reg.xml')
    }

    create() {
        console.log("menu scene")

        //steal inputs from Keys Scene
        this.KEYS = this.scene.get('keyScene').KEYS

        // add title text
        this.add.bitmapText(game.config.width / 2, (game.config.height / 2) - 32, 'dogica_font', 'BLAST BUDDIES', 20).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, game.config.height / 2, 'dogica_font', 'Press SPACE to start', 15).setOrigin(0.5)
        this.add.bitmapText(game.config.width / 2, (game.config.height / 2) + 40, 'dogica_font', 'Press P for Player Controls', 7).setOrigin(0.5)

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.SPACE)){
            this.scene.start('loadScene')
        }
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.MENU_C)){
            this.scene.start('loadScene')
        }
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.MENU_P)){
            this.scene.start('controlScene')
        }
    }
}
