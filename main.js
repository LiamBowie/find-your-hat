const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Game { 
    constructor(field, playerX=0, playerY=0){ 
        this.field = field;
        this.playerX = playerX;
        this.playerY = playerY;
        this.playing = true;
    }

    // Updates the players current (x, y) co-ordinates. 
    movePlayer(direction) { 
        switch(direction) { 
            case 'w': 
                this.playerX--;
                break;
            case 's': 
                this.playerX++;
                break;
            case 'a': 
                this.playerY--;
                break;
            case 'd': 
                this.playerY++;
                break;
            default: 
             console.log("Enter a valid direction: w (up), a (left), s (down), d (right)")
        }

        if(this.evaluateCurrentPosition(this.playerX, this.playerY)){ 
            this.field[this.playerX][this.playerY] = pathCharacter;
        }
        else { 
            this.playing = false;
        }
    }

    // Returns false if the current position results in the end of a game. 
    evaluateCurrentPosition(x, y) { 
 
        if ( x < 0 || x >= this.field.length || y < 0 || y >= this.field[x]) { 

            console.log("You have fell off the map!");
            return false;
        }
        else if ( this.field[x][y] === hole ){ 
            
            console.log("You have fell into a hole!");
            return false;
        }
        else if ( this.field[x][y] === hat) {

            console.log(`CONGRATULATIONS! You found your hat ${hat}` )
            return false;
        }
        else { 
            return true;
        }
    }

    // Prints the current state of the game to the console. 
    print() { 
        let string = '\n';
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                
                string += this.field[i][j];
            }
            string += '\n';
        }

        console.log(string);
    }

    // Prints out instructions for the player and starts the game loop.
    play() { 
        console.log(`\nUse WASD keys to move your character ${pathCharacter} around the map to find your hat (${hat})`);
        console.log(`Don't fall in the holes (${hole}), and don't walk off the edge!`);

        while(this.playing) { 

            this.print();
            const move = prompt("Which way?: ");
            this.movePlayer(move);
        }
    }

    // Returns an object that contains the x and y co-ordinates of a player character
    static findPlayer(field) { 
        for(let i = 0; i < field.length; i++) { 
            for(let j = 0; j < field[i].length; j++) { 
                if (field[i][j] === pathCharacter) { 
                    return {x: i, y: j}
                }
            }
        }
    }

    // Generates a random field with a specified height and width.
    static generateField(height, width, randomStartPosition = false, percentage = 25) { 
        let field = [];
        for(let i = 0; i < height; i++) { 
            field[i] = [];
            for(let j = 0; j < width; j++) { 
                
                if ( Math.floor(Math.random() * 100) < percentage) { 
                    field[i][j] = hole;
                }
                else { 
                    field[i][j] = fieldCharacter;
                }
            }
        }
        let playerX = 0;
        let playerY = 0;

        if (randomStartPosition) { 
            playerX = Math.floor(Math.random()*height);
            playerY = Math.floor(Math.random()*width);
        }

        field[playerX][playerY] = pathCharacter;

        let hatPositionX = Math.floor(Math.random()*height);
        let hatPositionY = Math.floor(Math.random()*width);

        while (this.playerX === hatPositionX && this.playerY === hatPositionY){ 
            hatPositionX = Math.floor(Math.random()*height);
            hatPositionY = Math.floor(Math.random()*width);
        }
        field[hatPositionX][hatPositionY] = hat;
        return field;
    }
}

// Player starts in the top left corner. 
defaultField = Game.generateField(12, 12);

// Player starts in a random location. 
randomStartField = Game.generateField(14, 28, true);
playerCoords = Game.findPlayer(randomStartField);

const fyh = new Game(randomStartField, playerCoords.x, playerCoords.y);
fyh.play();

// const findYourHat = new Game([
//     ['*', '░', 'O'],
//     ['░', 'O', '░'],
//     ['░', 'O', '░'],
//     ['░', '^', '░'],
// ]);