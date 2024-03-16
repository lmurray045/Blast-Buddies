class Credits extends Phaser.Scene {
    constructor() {
        super('creditScene')
    }
    
    preload() {


    }

    create() {
        console.log("credits scene")

        //resize windows
        game.scale.resize(360, 300)
        
        //resize reference variables
        globalWidth = 360
        globalHeight = 300

        //steal inputs from Keys Scene
        this.KEYS = this.scene.get('keyScene').KEYS

        // add title text
        this.add.bitmapText(globalWidth / 2, (globalHeight) - 10, 'dogica_font', 'Press R to return to Menu', 15).setOrigin(0.5)
        //this.add.bitmapText(game.config.width / 2, game.config.height / 2, 'dogica_font', 'Press SPACE to start', 15).setOrigin(0.5)


        //credits text
        this.add.bitmapText(globalWidth / 2, 40 , 'dogica_reg_font', 'Written and designed by Liam Murray', 12, 3).setOrigin(0.5)
        this.add.bitmapText(globalWidth / 2, 60 , 'dogica_reg_font', 'Based on "Breakfast Cheese" - Teen Titans Go', 10, 3).setOrigin(0.5)
        this.add.bitmapText(globalWidth / 2, 130 , 'dogica_reg_font', 'Menu Music:\n\nGame Music:\n\nFont: "Dogica" by Roberto Mocci', 10, 3).setOrigin(0.5)
        this.add.bitmapText(globalWidth / 2, 200 , 'dogica_reg_font', 'Created for CMPM 120', 10).setOrigin(0.5)
        this.add.bitmapText(globalWidth / 2, 230 , 'dogica_reg_font', 'Special Thanks to Nathan Altice for "teaching"', 10).setOrigin(0.5)

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.MENU_R)){
            this.scene.start('menuScene')
        }
    }
}