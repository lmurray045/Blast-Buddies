class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = './assets/'
        this.load.image('tilesetImage', 'floormap.png')
        this.load.spritesheet('p1sheet', 'p1sheet.png', {
            frameWidth: 16,
            frameHeight: 28,
            startFrame: 0,
            endFrame: 23
        })
        this.load.spritesheet('p2sheet', 'p2sheet.png', {
            frameWidth: 16,
            frameHeight: 28,
            startFrame: 0,
            endFrame: 23
        })
        this.load.spritesheet('bullet', 'bullet.png', {
            frameWidth: 8,
            frameHeight: 8
        })
        this.load.spritesheet('health', 'health.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        })
        this.load.spritesheet('robot', 'robot.png', {
            frameWidth: 16,
            frameHeight: 23,
            startFrame: 0,
            endFrame: 4
        })
        this.load.spritesheet('lava', 'lava.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        })
        this.load.tilemapTiledJSON('tilemapJSON', 'lvl1.json')
        this.load.tilemapTiledJSON('tilemapJSON2', 'lvl2.json')
        this.load.tilemapTiledJSON('tilemapJSON3', 'lvl3.json')

        //audio
        this.load.audio('jump', 'jump.wav')
        this.load.audio('hurt', 'hurt.wav')
        this.load.audio('shoot', 'shoot.wav')

        this.load.audio('menumusic', 'menumusic.mp3')
        this.load.audio('battlemusic', 'battlemusic.mp3')
    }

    create() {

        //p1 Animations-------------------------------------------

        this.anims.create({
            key: "p1_run",
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('p1sheet', {
                start: 1,
                end: 6
            })
        })

        this.anims.create({
            key: "p1_jump",
            repeat: 0,
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('p1sheet', {
                start: 7,
                end: 10
            })
        })

        this.anims.create({
            key: "p1_shoot",
            repeat: 0,
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('p1sheet', {
                start: 12,
                end: 17
            })
        })

        this.anims.create({
            key: "p1_jumpshoot",
            repeat: 0,
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('p1sheet', {
                start: 18,
                end: 19
            })
        })

        this.anims.create({
            key: "p1_runshoot",
            repeat: 0,
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('p1sheet', {
                start: 19,
                end: 23
            })
        })

        this.anims.create({
            key: "p1_idle",
            repeat: 0,
            frameRate: 4,
            frames: this.anims.generateFrameNumbers('p1sheet', {
                frames: [0, 11]
            })
        })


        //p2 animations--------------------------------------------
        
        this.anims.create({
            key: "p2_run",
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('p2sheet', {
                start: 1,
                end: 6
            })
        })

        this.anims.create({
            key: "p2_jump",
            repeat: 0,
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('p2sheet', {
                start: 7,
                end: 10
            })
        })

        this.anims.create({
            key: "p2_shoot",
            repeat: 0,
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('p2sheet', {
                start: 12,
                end: 17
            })
        })

        this.anims.create({
            key: "p2_jumpshoot",
            repeat: 0,
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('p2sheet', {
                start: 18,
                end: 19
            })
        })

        this.anims.create({
            key: "p2_runshoot",
            repeat: 0,
            frameRate: 8,
            frames: this.anims.generateFrameNumbers('p2sheet', {
                start: 19,
                end: 23
            })
        })

        this.anims.create({
            key: "p2_idle",
            repeat: 0,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('p2sheet', {
                frames: [0, 11]
            })
        })

        this.anims.create({
            key: "p2_example",
            repeat: -1,
            frameRate: 4,
            frames: this.anims.generateFrameNumbers('p2sheet', {
                start: 0,
                end: 23
            })
        })

        //health anims---------------------------------------------

        this.anims.create({
            key: 'health_3',
            frames: this.anims.generateFrameNumbers('health', {start: 0, end: 0, first: 0}),
            frameRate: 0
        })

        this.anims.create({
            key: 'health_2',
            frames: this.anims.generateFrameNumbers('health', {start: 1, end: 1, first: 1}),
            frameRate: 0
        })

        this.anims.create({
            key: 'health_1',
            frames: this.anims.generateFrameNumbers('health', {start: 2, end: 2, first: 2}),
            frameRate: 0
        })

        this.anims.create({
            key: 'health_0',
            frames: this.anims.generateFrameNumbers('health', {start: 3, end: 3, first: 3}),
            frameRate: 0
        })

        //enemy

        this.anims.create({
            key: 'robot_walk',
            frames: this.anims.generateFrameNumbers('robot', {
                frames: [0, 1, 2, 3, 4, 4, 3, 2, 1, 0]
            }),
            frameRate: 4,
            repeat: -1
        })

        //lava

        this.anims.create({
            key: 'gurgle',
            frames: this.anims.generateFrameNumbers('lava', {start: 0, end: 3}),
            frameRate: 4,
            repeat: -1
        })


    }

    update() {
        //go to play
        this.scene.start("playScene")
    }
}