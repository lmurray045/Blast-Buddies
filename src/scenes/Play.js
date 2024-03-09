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

        //add p1
        const p1spawn = map.findObject('objects', (obj) => obj.name === 'Player One')

        //add p2
        const p2spawn = map.findObject('objects', (obj) => obj.name === 'Player Two')

        //p1 keys
        this.KEYS = this.scene.get('keyScene').KEYS
    

        //players
        this.p1 = new Player1(this, p1spawn.x, p1spawn.y, 'p1sheet', 0, 'right', 1)
        this.p1.setGravityY(2000)
        this.p1.body.setAllowDrag(true)
        this.p1.body.setDragX(1000)

        this.p2 = new Player2(this, p2spawn.x, p2spawn.y, 'p2sheet', 0, 'right', 1)
        this.p2.setGravityY(2000)
        this.p2.body.setAllowDrag(true)
        this.p2.body.setDragX(1000)

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

        this.robot1 = new Robot(this, r1spawn.x, r1spawn.y, "robot", 0, 'left', 0).setOrigin(0, .8)
        this.robot1.anims.play('robot_walk')
        this.enemyGroup.add(this.robot1)

        //robot two

        this.robot2 = new Robot(this, r2spawn.x, r2spawn.y, "robot", 0, 'left', 0).setOrigin(0, 1)
        this.robot2.anims.play('robot_walk')
        this.enemyGroup.add(this.robot2)


        //lava
        this.lava = this.physics.add.sprite(192, game.config.height, 'lava', 0).setOrigin(0, 1)
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
            if(player.hp == 0) {
                player.destroy()
            }
        })

        //players and lava
        this.physics.add.collider(this.lava, this.playerGroup, (lava, player) => {
            player.hp = 0
            this.sound.play('hurt')
            player.hp_sprite.anims.play(`health_${player.hp}`)
            if(player.hp == 0) {
                player.destroy()
            }
        })

        //players and robots
        this.physics.add.collider(this.enemyGroup, this.playerGroup, (robot, player) => {
            robot.destroy()
            this.sound.play('hurt')
            player.hp -= 1
            player.hp_sprite.anims.play(`health_${player.hp}`)
            if(player.hp == 0) {
                player.stateMachine.transition('dead')
                player.destroy()
            }
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
        this.p1.update()
        this.p2.update()
    }

} 