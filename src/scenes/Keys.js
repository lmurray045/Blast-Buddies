//KEY SCENE UNDERLAY
        //the method of creating a key scene underlay was taken from StinOfSin: https://phaser.discourse.group/t/configure-keyboard-inputs-once-for-all-scenes-to-use/10470/6

class Keys extends Phaser.Scene {
    constructor() {
        super('keyScene')
    }

    init() {
        const { KeyCodes } = Phaser.Input.Keyboard
        this.KEYS = this.input.keyboard.addKeys({
            P1_JUMP: KeyCodes.W,
            P1_LEFT: KeyCodes.A,
            P1_RIGHT: KeyCodes.D,
            P1_SHOOT: KeyCodes.E,

            P2_JUMP: KeyCodes.UP,
            P2_LEFT: KeyCodes.LEFT,
            P2_RIGHT: KeyCodes.RIGHT,
            P2_SHOOT: KeyCodes.SHIFT,

            MENU_C: KeyCodes.C,
            MENU_P: KeyCodes.P,
            MENU_R: KeyCodes.R,
            MENU_M: KeyCodes.M,
            SPACE: KeyCodes.SPACE
        })
    }

    create() {
        console.log("keysScene")
        this.scene.launch('menuScene')
    }
}