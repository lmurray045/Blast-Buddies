class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction, pnum) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setCollideWorldBounds(true)

        //set properties
        this.direction = direction
        this.moveSpeed = 100
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
}

class IdleState extends State {
    enter(scene, player) {
        player.setVelocity(0)
        player.anims.play(`p${pnum}_idle`)

    }

    execute(scene, player) {
        if(pnum == 1) {

        }


    }
}

class RunState extends State {
    enter(scene, player) {

    }

    execute(scene, player) {

    }
}

class JumpState extends State {
    enter(scene, player) {

    }

    execute(scene, player) {

    }
}

class ShootState extends State {
    enter(scene, player) {

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