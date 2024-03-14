class Player2 extends Phaser.Physics.Arcade.Sprite {
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

        //health data
        this.hp = 3
        this.hp_sprite = this.scene.add.sprite(game.config.width - 48, 0, 'health', 0).setOrigin(0)
        this.hp_sprite.setScale(.7)

        //set properties
        this.direction = direction
        this.moveSpeed = 500
        this.jumpHeight = 500
        this.shotCooldown = 1000
        this.shotCheck = false
        this.pnum = pnum


        scene.player2FSM = new StateMachine('idle', {
            idle: new Idle2State(),
            run: new Run2State(),
            jump: new Jump2State(),
            shoot: new Shoot2State(),
            runshoot: new RunShoot2State(),
            jumpshoot: new JumpShoot2State(),
            dead: new DeadState()
        }, [scene, this])

    }
    update() {

    }
}

class Idle2State extends State {
    enter(scene, player) {
        console.log('idle state')
        if(player.hp == 0) {
            this.stateMachine.transition('dead')
        }
        player.setAcceleration(0)
        player.anims.play(`p2_idle`, false)
    }

    execute(scene, player) {
        //key binds for p2
        this.KEYS = scene.KEYS

        if(player.hp == 0) {
            this.stateMachine.transition('dead')
        }

        //a/e to run
        if(this.KEYS.P2_LEFT.isDown || this.KEYS.P2_RIGHT.isDown) {    
            this.stateMachine.transition('run')
            return
        }

        //w to jump
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.P2_JUMP)) {    
            this.stateMachine.transition('jump')
            return
        }

        //e to shoot
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.P2_SHOOT) && !player.shotCheck) {    
            this.stateMachine.transition('shoot')
            return
        }

    }
}

class Run2State extends State {
    enter(scene, player) {
        console.log("run state")
    }

    execute(scene, player) {
        this.KEYS = scene.KEYS

        if(player.hp == 0) {
            this.stateMachine.transition('dead')
        }
        //go idle if no key press
        if((this.KEYS.P2_LEFT.isUp && this.KEYS.P2_RIGHT.isUp)) {    
            this.stateMachine.transition('idle')
            return
        }

        //w to jump
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.P2_JUMP)) {    
            this.stateMachine.transition('jump')
            return
        }

        //e to shoot
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.P2_SHOOT) && !player.shotCheck) {    
            this.stateMachine.transition('runshoot')
            return
        }

        //move player
        let playerVector = new Phaser.Math.Vector2(0, 0)
        //left and right
        player.anims.play('p2_run', true)
        if(this.KEYS.P2_LEFT.isDown) {
            playerVector.x = -1
            player.flipX = false
        }
        else if(this.KEYS.P2_RIGHT.isDown) {
            playerVector.x = 1
            player.flipX = true
        }

        //apply Acceleration
        player.body.setAcceleration(player.moveSpeed * playerVector.x, player.moveSpeed * playerVector.y)
        
    }
}

class Jump2State extends State {
    enter(scene, player) {
        console.log("jump state")
        scene.sound.play('jump')
        this.jumped1 = false
        this.jumped2 = false
    }

    execute(scene, player) {

        if(player.hp == 0) {
            this.stateMachine.transition('dead')
        }

        this.KEYS = scene.KEYS
        //jump once
        if(this.jumped1 == false) {
            player.setVelocityY(player.jumpHeight * -1)
            player.anims.play('p2_jump', true)
            this.jumped1 = true
        }

        //double jump
        // if(Phaser.Input.Keyboard.JustDown(this.KEYS.P1_JUMP) && this.jumped2 == false) {
        //     player.setVelocityY(player.jumpHeight * -1)
        //     player.anims.play('p1_jump', true)
        //     this.jumped2 = true
        // }
        
        //a/e to run
        if(this.KEYS.P2_LEFT.isDown || this.KEYS.P2_RIGHT.isDown) {    
            //move player
            let playerVector = new Phaser.Math.Vector2(0, 0)
            //left and right
            if(this.KEYS.P2_LEFT.isDown) {
                playerVector.x = -1
                player.flipX = false
            }
            else if(this.KEYS.P2_RIGHT.isDown) {
                playerVector.x = 1
                player.flipX = true
            }

            //apply Acceleration
            player.body.setAcceleration(player.moveSpeed * playerVector.x, player.moveSpeed * playerVector.y)
        }

        //e to shoot
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.P2_SHOOT) && !player.shotCheck) {    
            this.stateMachine.transition('jumpshoot')
            return
        }

        if(player.body.onFloor() == true) {
            this.stateMachine.transition('idle')
        }

    }
}

class Shoot2State extends State {
    enter(scene, player) {
        console.log("shoot state")
        scene.sound.play('shoot')
        if(player.hp == 0) {
            this.stateMachine.transition('dead')
        }
        player.shotCheck = true
        player.anims.play("p2_shoot", true)
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

class RunShoot2State extends State {
    enter(scene, player) {
        console.log("shoot state")
        scene.sound.play('shoot')
        if(player.hp == 0) {
            this.stateMachine.transition('dead')
        }
        player.shotCheck = true
        player.anims.play("p2_shoot", true)
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

class JumpShoot2State extends State {
    enter(scene, player) {
        console.log("shoot state")
        scene.sound.play('shoot')
        if(player.hp == 0) {
            this.stateMachine.transition('dead')
        }
        player.shotCheck = true
        player.anims.play("p2_shoot", true)
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

class Dead2State extends State {
    enter(scene, player) {
        console.log("deadstate")
        player.setAlpha(0)
    }
}