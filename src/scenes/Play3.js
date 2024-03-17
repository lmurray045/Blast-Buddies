class Play3 extends Phaser.Scene {
    constructor() {
        super('play3Scene')
    }

    init() {
        //add bullet group
        this.bulletGroup = this.add.group({
            runChildUpdate: true
        })
    }

    create() {
        console.log("Play3 Scene")
        
        this.ended = false


        //tilemap creation
        const map = this.add.tilemap('tilemapJSON3')
        const tileset = map.addTilesetImage("floormap", "tilesetImage")
        const bgLayer = map.createLayer("background", tileset)
        const terrainLayer = map.createLayer("terrain", tileset)

        //collision
        terrainLayer.setCollisionByProperty({collides: true})

        //camera bounds
        this.cameras.main.setViewport(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        //resize windows
        game.scale.resize(map.widthInPixels, map.heightInPixels)
        
        //resize reference variables
        globalHeight = map.heightInPixels
        globalWidth = map.widthInPixels

        //game score counter
        this.add.bitmapText(globalWidth / 2, 10, 'dogica_reg_font', `Player One: ${p1_score} | Player Two: ${p2_score}`, 8).setOrigin(0.5)

        //add p1
        const p1spawn = map.findObject('objects', (obj) => obj.name === 'Player One')

        //add p2
        const p2spawn = map.findObject('objects', (obj) => obj.name === 'Player Two')

        //p1 keys
        this.KEYS = this.scene.get('keyScene').KEYS
    

        //players
        this.p1 = new Player1(this, p1spawn.x, p1spawn.y, 'p1sheet', 0, 'right', 1)
        this.p1.setGravityY(1700)
        this.p1.body.setAllowDrag(true)
        this.p1.body.setDragX(1500)

        this.p2 = new Player2(this, p2spawn.x, p2spawn.y, 'p2sheet', 0, 'right', 1)
        this.p2.setGravityY(1700)
        this.p2.body.setAllowDrag(true)
        this.p2.body.setDragX(1000)

        this.p1.setSize(8, 28)
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

        const r3spawn = map.findObject('objects', (obj) => obj.name === 'Robot_3')

        const r4spawn = map.findObject('objects', (obj) => obj.name === 'Robot_4')

        const r5spawn = map.findObject('objects', (obj) => obj.name === 'Robot_5')

        const r6spawn = map.findObject('objects', (obj) => obj.name === 'Robot_6')

        const r7spawn = map.findObject('objects', (obj) => obj.name === 'Robot_7')

        const r8spawn = map.findObject('objects', (obj) => obj.name === 'Robot_8')


        //robot one

        this.robot1 = new Robot(this, r1spawn.x, r1spawn.y, "robot", 0, 'left', 0).setOrigin(0.5, 1)
        this.robot1.anims.play('robot_walk')
        this.enemyGroup.add(this.robot1)

        //robot two

        this.robot2 = new Robot(this, r2spawn.x, r2spawn.y, "robot", 0, 'left', 120).setOrigin(0.5, .9)
        this.robot2.anims.play('robot_walk')
        this.enemyGroup.add(this.robot2)

        //robot three

        this.robot3 = new Robot(this, r3spawn.x, r3spawn.y, "robot", 0, 'left', 120).setOrigin(0.5, .9)
        this.robot1.anims.play('robot_walk')
        this.enemyGroup.add(this.robot3)

        //robot four

        this.robot4 = new Robot(this, r4spawn.x, r4spawn.y, "robot", 0, 'left', 0).setOrigin(0.5, .9)
        this.robot4.anims.play('robot_walk')
        this.enemyGroup.add(this.robot4)

        //robot five

        this.robot5 = new Robot(this, r5spawn.x, r5spawn.y, "robot", 0, 'left', 60).setOrigin(0.5, 1)
        this.robot5.anims.play('robot_walk')
        this.enemyGroup.add(this.robot5)

        //robot six

        this.robot6 = new Robot(this, r6spawn.x, r6spawn.y, "robot", 0, 'left', 120).setOrigin(0.5, .9)
        this.robot6.anims.play('robot_walk')
        this.enemyGroup.add(this.robot6)

        //robot seven

        this.robot7 = new Robot(this, r7spawn.x, r7spawn.y, "robot", 0, 'left', 120).setOrigin(0.5, 1)
        this.robot7.anims.play('robot_walk')
        this.enemyGroup.add(this.robot7)

        //robot eight

        this.robot8 = new Robot(this, r8spawn.x, r8spawn.y, "robot", 0, 'left', 60).setOrigin(0.5, .9)
        this.robot8.anims.play('robot_walk')
        this.enemyGroup.add(this.robot8)


        
        
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
        })

        //players and robots
        this.physics.add.collider(this.enemyGroup, this.playerGroup, (robot, player) => {
            robot.destroy()
            this.sound.play('hurt')
            player.hp -= 1
            player.hp_sprite.anims.play(`health_${player.hp}`)
        })

        //robots and bullets

        this.physics.add.collider(this.bulletGroup, this.enemyGroup, (bullet, robot) => {
            bullet.destroy()
            robot.destroy()
        })

        //robots and terrain
        this.physics.add.collider(this.robot1, terrainLayer)
        this.physics.add.collider(this.robot2, terrainLayer)


    }

    update() {
        this.player1FSM.step()
        this.player2FSM.step()
        this.robot1.update()
        this.robot2.update()
        this.robot3.update()
        this.robot4.update()
        this.robot5.update()
        this.robot6.update()
        this.robot7.update()
        this.robot8.update()
        if((this.p1.hp == 0 || this.p2.hp == 0) && this.ended == false) {
            if(this.p1.hp == 0) {
                p2_score += 1
            } else {
                p1_score += 1
            }
            setTimeout(() => {
                //CITATION: This screen shot code is ripped directly from nathans paddle parkour
                //let textureManager = this.textures;
                // take snapshot of the entire game viewport
                // https://newdocs.phaser.io/docs/3.55.2/Phaser.Renderer.WebGL.WebGLRenderer#snapshot
                // .snapshot(callback, type, encoderOptions)
                // the image is automatically passed to the callback
                game.renderer.snapshot((snapshotImage) => {
                // make sure an existing texture w/ that key doesn't already exist
                    if(this.textures.exists('titlesnapshot')) {
                        this.textures.remove('titlesnapshot')
                    }
                    // take the snapshot img returned from callback and add to texture manager
                    this.textures.addImage('titlesnapshot', snapshotImage)
                    this.scene.start('gameOverScene')
                })
            },500)

            this.ended = true
        }
    }

} 