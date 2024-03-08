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
        this.load.tilemapTiledJSON('tilemapJSON', 'lvl1.json')
    }

    create() {
        console.log("Load Scene")

        //p1 Animations-------------------------------------------

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

        //p2 animations--------------------------------------------
        
        this.anims.create({
            key: "p2_run",
            repeat: -1,
            framerate: 1,
            frames: this.anims.generateFrameNumbers('p2sheet', {
                start: 1,
                end: 6
            })
        })

        this.anims.create({
            key: "p2_jump",
            repeat: 0,
            framerate: 8,
            frames: this.anims.generateFrameNumbers('p2sheet', {
                start: 7,
                end: 10
            })
        })

        this.anims.create({
            key: "p2_shoot",
            repeat: 0,
            framerate: 8,
            frames: this.anims.generateFrameNumbers('p2sheet', {
                start: 12,
                end: 17
            })
        })

        this.anims.create({
            key: "p2_jumpshoot",
            repeat: 0,
            framerate: 8,
            frames: this.anims.generateFrameNumbers('p2sheet', {
                start: 18,
                end: 19
            })
        })

        this.anims.create({
            key: "p2_runshoot",
            repeat: 0,
            framerate: 8,
            frames: this.anims.generateFrameNumbers('p2sheet', {
                start: 19,
                end: 23
            })
        })

        this.anims.create({
            key: "p2_idle",
            repeat: 0,
            framerate: 2,
            frames: this.anims.generateFrameNumbers('p2sheet', {
                frames: [0, 11]
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


    }

    update() {
        //go to play
        this.scene.start("playScene")
    }
}