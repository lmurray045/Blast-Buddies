//Liam Murray
//Blast Buddies
//Description:
//total hours: 30
//Citations: 
    //STATE MACHINE CODE    
        //statemachine.js is taken from professor Altices "CP-Scrolling-States" repositiory


let config = {
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
    zoom: 2,
    width: 288,
    height: 240,
    scales: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Keys, Menu, Controls, Play, GameOver, Load]
}

let game = new Phaser.Game(config)

let cursors


//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3