class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction, pnum) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        //physics parameters
        this.body.setCollideWorldBounds(true)
        this.setGravityY(1000)
        this.body.setAllowDrag(true)
        this.body.setDragX(500)
        this.body.setMaxVelocityX(100)

        //set properties
        this.direction = direction
        this.moveSpeed = 500
        this.shotCooldown = 100
        this.pnum = pnum


        scene.playerFSM = new StateMachine('idle', {
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

    vector
}

class IdleState extends State {
    enter(scene, player) {
        player.setAcceleration(0)
        player.anims.play(`p1_idle`)
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
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.P1_SHOOT)) {    
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
        if(Phaser.Input.Keyboard.JustDown(this.KEYS.P1_SHOOT)) {    
            this.stateMachine.transition('runshoot')
            return
        }

        //move player
        let playerVector = new Phaser.Math.Vector2(0, 0)
        //left and right
        player.play('p1_run')
        if(this.KEYS.P1_LEFT.isDown) {
            playerVector.x = -1
        }
        else if(this.KEYS.P1_RIGHT.isDown) {
            playerVector.x = 1
        }

        //apply Acceleration
        player.setAcceleration(player.moveSpeed * playerVector.x, player.moveSpeed * playerVector.y)
        
    }
}

class JumpState extends State {
    enter(scene, player) {
        console.log("jump state")
    }

    execute(scene, player) {

    }
}

class ShootState extends State {
    enter(scene, player) {
        console.log("shoot state")
    }

    execute(scene, player) {

    }
}

class RunShootState extends State {
    enter(scene, player) {

    }

    execute(scene, player) {

    }
}

class JumpShootState extends State {
    enter(scene, player) {

    }

    execute(scene, player) {

    }
}