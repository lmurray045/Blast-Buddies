class Play2 extends Phaser.Scene {
    constructor() {
        super('play2Scene')
    }

    init() {
        //add bullet group
        this.bulletGroup = this.add.group({
            runChildUpdate: true
        })
    }

    create() {
        console.log("Play2 Scene")
        
        this.ended = false

        //tilemap creation
        const map = this.add.tilemap('tilemapJSON2')
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


        //robot one

        this.robot1 = new Robot(this, r1spawn.x, r1spawn.y, "robot", 0, 'left', 70).setOrigin(0.5, 1)
        this.robot1.anims.play('robot_walk')
        this.enemyGroup.add(this.robot1)

        //robot two

        this.robot2 = new Robot(this, r2spawn.x, r2spawn.y, "robot", 0, 'left', 32).setOrigin(0.5, .9)
        this.robot2.anims.play('robot_walk')
        this.enemyGroup.add(this.robot2)

        //robot three

        this.robot3 = new Robot(this, r3spawn.x, r3spawn.y, "robot", 0, 'left', 32).setOrigin(0.5, 1)
        this.robot1.anims.play('robot_walk')
        this.enemyGroup.add(this.robot3)

        //robot four

        this.robot4 = new Robot(this, r4spawn.x, r4spawn.y, "robot", 0, 'left', 70).setOrigin(0.5, .9)
        this.robot4.anims.play('robot_walk')
        this.enemyGroup.add(this.robot4)


        //lava

        this.lavaGroup = this.add.group({
            runChildUpdate: true
        })

        //sprites
        this.lava = this.physics.add.sprite(176, map.heightInPixels, 'lava', 0).setOrigin(0, 1)
        this.lava.anims.play('gurgle', true)
        this.lava.setImmovable(true)
        this.lava.setSize(32, 16, false)
        this.lava.setOffset(0, 15)

        this.lava2 = this.physics.add.sprite(208, map.heightInPixels, 'lava', 0).setOrigin(0, 1)
        this.lava2.anims.play('gurgle', true)
        this.lava2.setImmovable(true)
        this.lava2.setSize(32, 16, false)
        this.lava2.setOffset(0, 15)

        this.lava3 = this.physics.add.sprite(240, map.heightInPixels, 'lava', 0).setOrigin(0, 1)
        this.lava3.anims.play('gurgle', true)
        this.lava3.setImmovable(true)
        this.lava3.setSize(32, 16, false)
        this.lava3.setOffset(0, 15)

        this.lavaGroup.add(this.lava)
        this.lavaGroup.add(this.lava2)
        this.lavaGroup.add(this.lava3)
        
        
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

        //players and lava
        this.physics.add.collider(this.lavaGroup, this.playerGroup, (lava, player) => {
            player.hp = 0
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
        if((this.p1.hp == 0 || this.p2.hp == 0) && this.ended == false) {
            //game over text
            this.add.bitmapText(globalWidth / 2, (globalHeight / 2) - 32, 'dogica_font', 'ROUND OVER', 20).setOrigin(0.5)
            if(this.p1.hp == 0) {
                this.add.bitmapText(globalWidth / 2, (globalHeight / 2), 'dogica_font', 'Player 2 WINS', 10).setOrigin(0.5)
            }
            else{
                this.add.bitmapText(globalWidth / 2, (globalHeight / 2), 'dogica_font', 'Player 1 WINS', 10).setOrigin(0.5)
            }
            setTimeout(() => {
                this.scene.start("play3Scene")
            }, 5000)

            this.ended = true
        }
    }

} 