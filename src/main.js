//Liam Murray
//Blast Buddies
//Description: A two player competative platform shooter.
    //Battle to the death to determine who is superior!

//Major Systems
    //Arcade Physics Engine (acceleration based)
    //Tweens
    //animation manager
    //tilemaps
    //bitmap text objects
    //screen captures
    //page formatting
    //music and sfx

//polish and style
    //I am really proud of the menu sequence and start game transitions!

//total hours: 50ish?

//Citations: 
    //STATE MACHINE CODE    
        //statemachine.js is taken from professor Altices "CP-Scrolling-States" repositiory
    //SCREENSHOT CODE
        //in game over scene when the view port is screenshotted, that is taken from Nathan Altices "Paddle Parkour"
    //KEY SCENE UNDERLAY
        //the method of creating a key scene underlay was taken from StinOfSin: https://phaser.discourse.group/t/configure-keyboard-inputs-once-for-all-scenes-to-use/10470/6
    //LOADING BAR
        //taken from paddle parkour aswell



let config = {
    //parent: 'gameView',
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            //gravity: { y: 1000 }
        }
    },
    width: 336,
    height: 240,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Keys, Menu, Controls, Credits, Play, Play2, Play3, GameOver, Load]
}

let game = new Phaser.Game(config)

let cursors

//load flag
let loaded = false

//music flags
let playing = false

//game scoring
let p1_score = 0
let p2_score = 0


//set global sizes
let globalWidth = 336
let globalHeight = 240