class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }
    
    preload() {
        this.load.bitmapFont('dogica_font', 'assets/fonts/dogica.png', 'assets/fonts/dogica.xml')
        this.load.bitmapFont('dogica_reg_font', 'assets/fonts/dogica_reg.png', 'assets/fonts/dogica_reg.xml')
        this.load.audio('menumusic', 'assets/menumusic.mp3')
        this.load.audio('battlemusic', 'assets/battlemusic.mp3')
        this.load.audio('metalslam', 'assets/metalslam.mp3')
        this.load.audio('menuclick', 'assets/menuclick.mp3')
        this.load.spritesheet('titlescreen', 'assets/titlescreen.png', {
            frameWidth: 336,
            frameHeight: 240,
            startFrame: 0,
            endFrame: 1
        })
    }

    create() {
        console.log("menu scene")
        this.p1side = this.add.sprite(0, 0, "titlescreen", 0).setOrigin(1, 0)
        this.p2side = this.add.sprite(336, 0, "titlescreen", 1).setOrigin(0, 0)

        this.sound.stopAll()

        //resize windows
        game.scale.resize(336, 240)

        //reset score
        p1_score = 0
        p2_score = 0
        
        //resize reference variables
        globalHeight = 240
        globalWidth = 336

        //steal inputs from Keys Scene
        this.KEYS = this.scene.get('keyScene').KEYS

        // add title text
        let t1 = this.add.bitmapText(game.config.width / 2, (game.config.height / 2) - 32, 'dogica_font', 'BLAST BUDDIES', 20).setOrigin(0.5).setAlpha(0)
        let t2 = this.add.bitmapText(game.config.width / 2, game.config.height / 2, 'dogica_font', 'Press SPACE to start', 15).setOrigin(0.5).setAlpha(0)
        let t3 = this.add.bitmapText(game.config.width / 2, (game.config.height / 2) + 40, 'dogica_font', 'Press P for Player Controls', 7).setOrigin(0.5).setAlpha(0)
        let t4 = this.add.bitmapText(game.config.width / 2, (game.config.height / 2) + 60, 'dogica_font', 'Press C for Credits', 7).setOrigin(0.5).setAlpha(0)

        let menuTween = this.tweens.chain({
            tweens: [
                {
                    targets: this.p1side,
                    x: 336,
                    duration: 500,
                    ease: 'Bounce.easeOut',
                    onStart: () => {
                        this.sound.play('metalslam')
                    }
                },
                {
                    targets: this.p2side,
                    x: 0,
                    duration: 500,
                    ease: 'Bounce.easeOut',
                    onStart: () => {
                        this.sound.play('metalslam')
                    }
                },
                {
                    targets: t1,
                    alpha: {from: 0, to: 1},
                    duration: 500,
                },
                {
                    targets: t2,
                    alpha: {from: 0, to: 1},
                    duration: 500,
                    onStart: () => {
                        //sound
                        if(playing == false){
                        this.sound.stopAll()
                        this.music = this.sound.add('menumusic', {
                            loop: true,
                            volume: 0.5
                        })
                        this.music.play()
                        playing = true
                        }
                    }
                },
                {
                    targets: t3,
                    alpha: {from: 0, to: 1},
                    duration: 500
                },
                {
                    targets: t4,
                    alpha: {from: 0, to: 1},
                    duration: 500
                }
            ]
        })
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.SPACE)){
            this.sound.stopAll()
            let sound = this.sound.play('menuclick')
            if(loaded == false) {
                this.scene.start('loadScene')
                loaded = true
            } else {
                this.scene.start('playScene')
            }
        }
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.MENU_C)){
            this.scene.start('creditScene')
        }
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.MENU_P)){
            this.scene.start('controlScene')
        }
    }
}
