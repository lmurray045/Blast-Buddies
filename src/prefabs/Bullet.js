class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        //physics parameters
        this.body.setCollideWorldBounds(true)
        this.setImmovable()
        this.body.setGravityY(0)

        //set properties
        this.direction = 0
        this.moveSpeed = 500


        if(direction == 'left') {
            this.direction = -1
        }
        else {
            this.direction = 1
        }

        scene.bulletGroup.add(this)

        let bulletVector = new Phaser.Math.Vector2(0, 0)
        bulletVector.x = this.direction
        this.body.setVelocity(this.moveSpeed * bulletVector.x, this.moveSpeed * bulletVector.y)

    }

    create() {
    
    }

    update() {
        if(this.body.onWall() == true) {
            this.destroy()
        }
    }

}