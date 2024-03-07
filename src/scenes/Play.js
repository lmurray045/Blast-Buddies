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

        //add p1
        const p1spawn = map.findObject('objects', (obj) => obj.name === 'Player One')

        //add p2
        const p2spawn = map.findObject('objects', (obj) => obj.name === 'Player Two')

        //p1 keys
        this.KEYS = this.scene.get('keyScene').KEYS
    
        //player group
        this.playerGroup = this.add.group({
            runChildUpdate: true
        })

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

        //health



        //camera bounds
        this.cameras.main.setViewport(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        //this.cameras.main.startFollow(this.slime, true, 0.25, 0.25)
        
        //physics and colliders
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.physics.add.collider(this.p1, terrainLayer)
        this.physics.add.collider(this.p2, terrainLayer)

        //bullets
        this.physics.add.collider(this.bulletGroup, terrainLayer, (bullet) => {bullet.destroy()})

        //players and bullets
        this.physics.add.collider(this.bulletGroup, this.playerGroup, (bullet, player) => {
            bullet.destroy()
            player.hp -= 1
            player.hp_sprite.anims.play(`health_${player.hp}`)
            if(player.hp == 0) {
                player.destroy()
            }
        })



    }

    update() {
        this.player1FSM.step()
        this.player2FSM.step()
    }

} 