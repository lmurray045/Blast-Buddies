class Player1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction, pnum) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        //physics parameters
        this.body.setCollideWorldBounds(true)
        this.onWorldBounds = true
        //this.setGravityY(1000)
        this.body.setAllowDrag(true)
        this.body.setDragX(500)
        this.body.setDragY(500)
        this.body.setMaxVelocityX(150)

        //set properties
        this.direction = direction
        this.moveSpeed = 500
        this.jumpHeight = 500
        this.shotCooldown = 100
        this.shotCheck = false
        this.pnum = pnum

        //health data
        this.hp = 3
        this.hp_sprite = this.scene.add.sprite(0, 0, 'health', 0).setOrigin(0)
        this.hp_sprite.setScale(.7)


        scene.player1FSM = new StateMachine('idle', {
            idle: new IdleState(),
            run: new RunState(),
            jump: new JumpState(),
            shoot: new ShootState(),
            runshoot: new RunShootState(),
            jumpshoot: new JumpShootState(),
            //dead: new DeadState()
        }, [scene, this])

    }
    update() {

    }
}

class IdleState extends State {
    enter(scene, player) {
        console.log('idle state')
        player.setAcceleration(0)
        player.anims.play(`p1_idle`, false)
    }

    execute(scene, player) {
        //key binds for p1
        this.KEYS = scene.KEYS

        //a/e to run
        if(this.KEYS.P1_LEFT.isDown || this.KEYS.P1_RIGHT.isDown) {    
            this.stateMachine.transition('run')
            return
        }

        //w to jump
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.P1_JUMP)) {    
            this.stateMachine.transition('jump')
            return
        }

        //e to shoot
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.P1_SHOOT) && !player.shotCheck) {    
            this.stateMachine.transition('shoot')
            return
        }

    }
}

class RunState extends State {
    enter(scene, player) {
        console.log("run state")
    }

    execute(scene, player) {
        this.KEYS = scene.KEYS
        //go idle if no key press
        if((this.KEYS.P1_LEFT.isUp && this.KEYS.P1_RIGHT.isUp)) {    
            this.stateMachine.transition('idle')
            return
        }

        //w to jump
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.P1_JUMP)) {    
            this.stateMachine.transition('jump')
            return
        }

        //e to shoot
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.P1_SHOOT) && !player.shotCheck) {    
            this.stateMachine.transition('runshoot')
            return
        }

        //move player
        let playerVector = new Phaser.Math.Vector2(0, 0)
        //left and right
        player.anims.play('p1_run', true)
        if(this.KEYS.P1_LEFT.isDown) {
            playerVector.x = -1
            player.flipX = false
        }
        else if(this.KEYS.P1_RIGHT.isDown) {
            playerVector.x = 1
            player.flipX = true
        }

        //apply Acceleration
        player.body.setAcceleration(player.moveSpeed * playerVector.x, player.moveSpeed * playerVector.y)
        
    }
}

class JumpState extends State {
    enter(scene, player) {
        console.log("jump state")
        this.jumped1 = false
        this.jumped2 = false
    }

    execute(scene, player) {
        this.KEYS = scene.KEYS
        //jump once
        if(this.jumped1 == false) {
            player.setVelocityY(player.jumpHeight * -1)
            player.anims.play('p1_jump', true)
            this.jumped1 = true
        }

        //double jump
        // if(Phaser.Input.Keyboard.JustDown(this.KEYS.P1_JUMP) && this.jumped2 == false) {
        //     player.setVelocityY(player.jumpHeight * -1)
        //     player.anims.play('p1_jump', true)
        //     this.jumped2 = true
        // }
        
        //a/e to run
        if(this.KEYS.P1_LEFT.isDown || this.KEYS.P1_RIGHT.isDown) {    
            //move player
            let playerVector = new Phaser.Math.Vector2(0, 0)
            //left and right
            if(this.KEYS.P1_LEFT.isDown) {
                playerVector.x = -1
                player.flipX = false
            }
            else if(this.KEYS.P1_RIGHT.isDown) {
                playerVector.x = 1
                player.flipX = true
            }

            //apply Acceleration
            player.body.setAcceleration(player.moveSpeed * playerVector.x, player.moveSpeed * playerVector.y)
        }

        //e to shoot
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.P1_SHOOT) && !player.shotCheck) {    
            this.stateMachine.transition('jumpshoot')
            return
        }

        if(player.body.onFloor() == true) {
            this.stateMachine.transition('idle')
        }

    }
}

class ShootState extends State {
    enter(scene, player) {
        console.log("shoot state")
        //set cooldown
        player.shotCheck = true
        //play animation
        player.anims.play("p1_shoot", true)

        //shoot the actual bullet
        let direction = 'left'
        if(player.flipX == true) {
            direction = 'right'
            this.shot = new Bullet(scene, player.x + 14, player.y + 4, 'bullet', 0, direction)
        }
        else {
            this.shot = new Bullet(scene, player.x - 14, player.y + 4, 'bullet', 0, direction)
        }

        //reset cooldown
        setTimeout(() => {
            player.shotCheck = false
        }, player.shotCooldown)

        //leave
        this.stateMachine.transition('idle')
    }
}

class RunShootState extends State {
    enter(scene, player) {
        console.log("shoot state")
        player.shotCheck = true
        player.anims.play("p1_shoot", true)
        let direction = 'left'
        if(player.flipX == true) {
            direction = 'right'
            this.shot = new Bullet(scene, player.x + 14, player.y + 4, 'bullet', 0, direction)
        }
        else {
            this.shot = new Bullet(scene, player.x - 14, player.y + 4, 'bullet', 0, direction)
        }
        setTimeout(() => {
            player.shotCheck = false
        }, player.shotCooldown)
        this.stateMachine.transition('idle')
    }
}

class JumpShootState extends State {
    enter(scene, player) {
        console.log("shoot state")
        player.shotCheck = true
        player.anims.play("p1_shoot", true)
        let direction = 'left'
        if(player.flipX == true) {
            direction = 'right'
            this.shot = new Bullet(scene, player.x + 14, player.y + 4, 'bullet', 0, direction)
        }
        else {
            this.shot = new Bullet(scene, player.x - 14, player.y + 4, 'bullet', 0, direction)
        }
        setTimeout(() => {
            player.shotCheck = false
        }, player.shotCooldown)
        this.stateMachine.transition('idle')
    }
}