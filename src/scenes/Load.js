class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = './assets/'
        this.load.image('tilesetImage', 'floormap.png')
        this.load.spritesheet('p1sheet', 'p1sheet.png', {
            frameWidth: 16,
            frameHeight: 28
        })
        this.load.spritesheet('p2sheet', 'p2sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet('bullet', 'bullet.png', {
            frameWidth: 8,
            frameHeight: 8
        })
        this.load.tilemapTiledJSON('tilemapJSON', 'lvl1.json')
    }

    create() {
        console.log("Load Scene")
        this.anims.create({
            key: "p1_run",
            repeat: -1,
            framerate: 1,
            frames: this.anims.generateFrameNumbers('p1sheet', {
                start: 1,
                end: 6
            })
        })

        this.anims.create({
            key: "p1_jump",
            repeat: 0,
            framerate: 8,
            frames: this.anims.generateFrameNumbers('p1sheet', {
                start: 7,
                end: 10
            })
        })

        this.anims.create({
            key: "p1_shoot",
            repeat: 0,
            framerate: 8,
            frames: this.anims.generateFrameNumbers('p1sheet', {
                start: 12,
                end: 17
            })
        })

        this.anims.create({
            key: "p1_jumpshoot",
            repeat: 0,
            framerate: 8,
            frames: this.anims.generateFrameNumbers('p1sheet', {
                start: 18,
                end: 19
            })
        })

        this.anims.create({
            key: "p1_runshoot",
            repeat: 0,
            framerate: 8,
            frames: this.anims.generateFrameNumbers('p1sheet', {
                start: 19,
                end: 23
            })
        })

        this.anims.create({
            key: "p1_idle",
            repeat: 0,
            framerate: 2,
            frames: this.anims.generateFrameNumbers('p1sheet', {
                frames: [0, 11]
            })
        })

    }

    update() {
        //go to play
        this.scene.start("playScene")
    }
}