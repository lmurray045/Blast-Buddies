class Controls extends Phaser.Scene {
    constructor() {
        super('controlScene')
    }
    
    preload() {
        this.load.spritesheet('p1sheet', 'assets/p1sheet.png', {
            frameWidth: 16,
            frameHeight: 28,
            startFrame: 0,
            endFrame: 23
        })

        this.load.spritesheet('p2sheet', 'assets/p2sheet.png', {
            frameWidth: 16,
            frameHeight: 28,
            startFrame: 0,
            endFrame: 23
        })

    }

    create() {
        console.log("controls scene")

        this.anims.create({
            key: "p1_example",
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('p1sheet', {
                start: 0,
                end: 23
            })
        })

        this.anims.create({
            key: "p2_example",
            repeat: -1,
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('p2sheet', {
                start: 0,
                end: 23
            })
        })

        //steal inputs from Keys Scene
        this.KEYS = this.scene.get('keyScene').KEYS

        // add title text
        this.add.bitmapText(game.config.width / 2, (game.config.height) - 10, 'dogica_font', 'Press R to return to Menu', 8).setOrigin(0.5)
        //this.add.bitmapText(game.config.width / 2, game.config.height / 2, 'dogica_font', 'Press SPACE to start', 15).setOrigin(0.5)

        this.p2 = this.add.sprite(3 * game.config.width / 4, 3 *game.config.height / 4, 'p2sheet', 0).setOrigin(.5)
        this.p1 = this.add.sprite(game.config.width / 4, 3 * game.config.height / 4, 'p1sheet', 0).setOrigin(.5)

        this.p1.setScale(2)
        this.p2.setScale(2)

        this.p2.anims.play('p2_example', true)
        this.p1.anims.play('p1_example', true)

        //p1 text
        this.add.bitmapText(game.config.width / 4, (3 * game.config.height / 4) - 60, 'dogica_reg_font', 'A / D: Left/Right\n\nW: Jump\n\nE: Shoot', 9, 1).setOrigin(0.5)

        //p2 text
        this.add.bitmapText(3* game.config.width / 4, (3 * game.config.height / 4) - 60, 'dogica_reg_font', '{- / -}: Left/Right\n\nUp Arrow: Jump\n\nSHIFT: Shoot', 9 , 1).setOrigin(0.5)

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.MENU_R)){
            this.scene.start('menuScene')
        }
    }
}