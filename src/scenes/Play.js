class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {

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

        this.p1 = new Player(this, p1spawn.x, p1spawn.y, 'p1sheet', 0, 'idle', 1)
        this.p1.setGravityY(100)

        //camera bounds
        this.cameras.main.setViewport(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        //this.cameras.main.startFollow(this.slime, true, 0.25, 0.25)
        
        //physics and colliders
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.physics.add.collider(this.p1, terrainLayer)

    }

    update() {

    }
} 