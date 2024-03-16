class Robot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction, distance) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.body.setCollideWorldBounds(true)
        this.setImmovable(true)

        //properties
        this.moveSpeed = 1
        this.direction = direction
        this.distance = distance //space it can travel in pixels
        this.moved = distance / 2
    }
    
    
    preload() {
        
    }

    create() {

    }

    update() {
        if(this.moved < this.distance && this.direction == 'right'){
            this.x += this.moveSpeed
            this.moved += this.moveSpeed
        }
        if(this.moved < this.distance && this.direction == 'left'){
            this.x -= this.moveSpeed
            this.moved += this.moveSpeed
        }
        if(this.moved == this.distance){
            this.moved = 0
            if(this.direction == 'left') {
                this.direction = 'right'
            } else{
                this.direction = 'left'
            }
        }
    }
}