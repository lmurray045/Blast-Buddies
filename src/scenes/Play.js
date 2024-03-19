class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        //add bullet group
        this.bulletGroup = this.add.group({
            runChildUpdate: true
        })
    }

    create() {
        console.log("Play Scene")

        this.ended = false

        //resize windows
        game.scale.resize(336, 240)
        
        //resize reference variables
        globalHeight = 240
        globalWidth = 336

            
        //tilemap creation
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage("floormap", "tilesetImage")
        const bgLayer = map.createLayer("background", tileset)
        const terrainLayer = map.createLayer("terrain", tileset)

        //collision
        terrainLayer.setCollisionByProperty({collides: true})

        //camera bounds
        this.cameras.main.setViewport(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        this.active = false

        let t1 = this.add.bitmapText(globalWidth / 2, (globalHeight / 2), 'dogica_font', '3', 30).setOrigin(0.5).setAlpha(0)
        let t2 = this.add.bitmapText(globalWidth / 2, (globalHeight / 2), 'dogica_font', '2', 30).setOrigin(0.5).setAlpha(0)
        let t3 = this.add.bitmapText(globalWidth / 2, (globalHeight / 2), 'dogica_font', '1', 30).setOrigin(0.5).setAlpha(0)
        let t4 = this.add.bitmapText(globalWidth / 2, (globalHeight / 2), 'dogica_font', 'FIGHT', 30).setOrigin(0.5).setAlpha(0)

        let playTween = this.tweens.chain({
            tweens: [
                {
                    targets: t1,
                    alpha: {from: 0, to: 1},
                    duration: 100
                },
                {
                    targets: t1,
                    alpha: {from: 1, to: 0},
                    scale: {from: 1, to: 0.1},
                    duration: 1000
                },
                {
                    targets: t2,
                    alpha: {from: 0, to: 1},
                    duration: 100
                },
                {
                    targets: t2,
                    alpha: {from: 1, to: 0},
                    scale: {from: 1, to: 0.1},
                    duration: 1000
                },
                {
                    targets: t3,
                    alpha: {from: 0, to: 1},
                    duration: 100
                },
                {
                    targets: t3,
                    alpha: {from: 1, to: 0},
                    scale: {from: 1, to: 0.1},
                    duration: 1000
                },
                {
                    targets: t4,
                    alpha: {from: 0, to: 1},
                    duration: 100
                },
                {
                    targets: t4,
                    alpha: {from: 1, to: 0},
                    scale: {from: 1, to: 0.1},
                    duration: 1000,
                    onStart: () => {
                        //music
                        this.active = true
                        this.sound.stopAll()
                        playing = false
                        this.music = this.sound.add('battlemusic', {
                            loop: true,
                            volume: 0.5
                        })
                        this.music.play()
                    }
                },
            ]
        })

        //add p1
        const p1spawn = map.findObject('objects', (obj) => obj.name === 'Player One')

        //add p2
        const p2spawn = map.findObject('objects', (obj) => obj.name === 'Player Two')

        //p1 keys
        this.KEYS = this.scene.get('keyScene').KEYS
    
        //game score counter
        this.add.bitmapText(globalWidth / 2, 10, 'dogica_reg_font', `Player One: ${p1_score} | Player Two: ${p2_score}`, 8).setOrigin(0.5)

        //players
        this.p1 = new Player1(this, p1spawn.x, p1spawn.y, 'p1sheet', 0, 'right', 1)
        this.p1.setGravityY(1700)
        this.p1.body.setAllowDrag(true)
        this.p1.body.setDragX(1500)
        this.p1.setSize(8, 28)

        this.p2 = new Player2(this, p2spawn.x, p2spawn.y, 'p2sheet', 0, 'right', 1)
        this.p2.setGravityY(1700)
        this.p2.body.setAllowDrag(true)
        this.p2.body.setDragX(1000)
        this.p2.setSize(8, 28)

        //player group
        this.playerGroup = this.add.group({
            runChildUpdate: true
        })
        this.playerGroup.add(this.p1)
        this.playerGroup.add(this.p2)

        //enemies

        //enemy group
        this.enemyGroup = this.add.group({
            runChildUpdate: true
        })


        // x and y coords
        const r1spawn = map.findObject('objects', (obj) => obj.name === 'Robot_1')

        const r2spawn = map.findObject('objects', (obj) => obj.name === 'Robot_2')


        //robot one

        this.robot1 = new Robot(this, r1spawn.x, r1spawn.y, "robot", 0, 'left', 100).setOrigin(0, .8)
        this.robot1.anims.play('robot_walk')
        this.enemyGroup.add(this.robot1)

        //robot two

        this.robot2 = new Robot(this, r2spawn.x, r2spawn.y, "robot", 0, 'left', 32).setOrigin(0, .9)
        this.robot2.anims.play('robot_walk')
        this.enemyGroup.add(this.robot2)


        //lava
        this.lava = this.physics.add.sprite(208, game.config.height, 'lava', 0).setOrigin(0, 1)
        this.lava.anims.play('gurgle', true)
        this.lava.setImmovable(true)
        this.lava.setSize(32, 16, false)
        this.lava.setOffset(0, 15)
        
        
        //physics and colliders----------------------------------

        //terrain stuff
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.physics.add.collider(this.p1, terrainLayer)
        this.physics.add.collider(this.p2, terrainLayer)

        //bullets and terrain
        this.physics.add.collider(this.bulletGroup, terrainLayer, (bullet) => {bullet.destroy()})

        //players and bullets
        this.physics.add.collider(this.bulletGroup, this.playerGroup, (bullet, player) => {
            bullet.destroy()
            player.hp -= 1
            this.sound.play('hurt')
            player.hp_sprite.anims.play(`health_${player.hp}`)
            player.tint = '0xFF0000'
            setTimeout(() => {
                player.tint = '0xFFFFFF'
            }, 200)
        })

        this.lava_damage = false

        //players and lava
        this.physics.add.collider(this.lava, this.playerGroup, (lava, player) => {
            player.hp = 0
            if(this.lava_damage == false){
                this.sound.play('hurt')
                this.lava_damage = true
            }
            player.hp_sprite.anims.play(`health_${player.hp}`)
            player.tint = '0xFF0000'
            setTimeout(() => {
                player.tint = '0xFFFFFF'
            }, 200)
        })

        //players and robots
        this.physics.add.collider(this.enemyGroup, this.playerGroup, (robot, player) => {
            robot.destroy()
            this.sound.play('hurt')
            player.hp -= 1
            player.hp_sprite.anims.play(`health_${player.hp}`)
            player.tint = '0xFF0000'
            setTimeout(() => {
                player.tint = '0xFFFFFF'
            }, 200)
        })

        //robots and bullets

        this.physics.add.collider(this.bulletGroup, this.enemyGroup, (bullet, robot) => {
            bullet.destroy()
            robot.destroy()
            this.sound.play('hurt')
        })

        //robots and terrain
        this.physics.add.collider(this.robot1, terrainLayer)
        this.physics.add.collider(this.robot2, terrainLayer)


    }

    update() {
        if(this.active) {
            this.player1FSM.step()
            this.player2FSM.step()
            this.robot1.update()
            this.robot2.update()
            if((this.p1.hp == 0 || this.p2.hp == 0) && this.ended == false) {
                //game over text
                this.add.bitmapText(game.config.width / 2, (game.config.height / 2) - 32, 'dogica_font', 'ROUND OVER', 20).setOrigin(0.5)
                if(this.p1.hp == 0) {
                    p2_score += 1
                    this.add.bitmapText(game.config.width / 2, (game.config.height / 2), 'dogica_font', 'Player 2 WINS', 10).setOrigin(0.5)
                }
                else{
                    p1_score += 1
                    this.add.bitmapText(game.config.width / 2, (game.config.height / 2), 'dogica_font', 'Player 1 WINS', 10).setOrigin(0.5)
                }
                setTimeout(() => {
                    this.scene.start("play2Scene")
                }, 5000)

                this.ended = true
            }
        }
    }

} 