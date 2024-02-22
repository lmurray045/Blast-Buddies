//Liam Murray
//High Noon
//Description:
    //an endless cowboy themed runner!
    //use the arrow keys to dodge the outlaws
//total hours: 30
//Citations: I used Nathans paddle parkour as a way to learn about enemy generation and
//to take screen captures of the game at given points

//creative tilt
//Techincal
    //I am particularly proud of my score mechanism. I figured out a way to use custom number drawings to display a score
    //counter that fits my theme, and update with each enemy dodged. This same technique is used in displaying the highscore
//Creative
    //Im really proud of the assets a drew. The menu screen and the cowboy leaning animations took me a while, however
    //I am most proud of the falling death animation.

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    },
    width: 640,
    height: 640,
    scene: [Menu, Play, GameOver, Load]
}

let game = new Phaser.Game(config)

let cursors

let loaded = false

let highscore = 0

//set global speeds
let speed = 7

let max_speed = 20

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3