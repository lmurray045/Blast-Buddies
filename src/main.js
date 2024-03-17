//Liam Murray
//Blast Buddies
//Description:
//total hours: 30
//Citations: 
    //STATE MACHINE CODE    
        //statemachine.js is taken from professor Altices "CP-Scrolling-States" repositiory


let config = {
    parent: 'gameView',
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            //gravity: { y: 1000 }
        }
    },
    zoom: 2,
    width: 288,
    height: 240,
    scales: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Keys, Menu, Controls, Credits, Play, Play2, Play3, GameOver, Load]
}

let game = new Phaser.Game(config)

let cursors

//load flag
let loaded = false

//game scoring
let p1_score = 0
let p2_score = 0


//set global sizes
let globalWidth = 288
let globalHeight = 240