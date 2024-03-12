class Robot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction, distance) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.body.setCollideWorldBounds(true)
        this.setImmovable(true)

        //properties
        this.moveSpeed = 500
        this.direction = direction
        this.distance = distance //space it can travel in pixels
        this.moved = 0
    }
    
    
    preload() {
        
    }

    create() {

    }

    update() {
        
    }
}