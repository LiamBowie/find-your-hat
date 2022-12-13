const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Game { 
    constructor(field){ 
        this.field = field;
        this.playerX = 0;
        this.playerY = 0;
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

    play() { 
        console.log(`\nUse WASD keys to move your character ${pathCharacter} around the map to find your hat (${hat})`);
        console.log(`Don't fall in the holes (${hole}), and don't walk off the edge!`);
        while(this.playing) { 
            this.print();
            const move = prompt("Which way?: ");
            this.movePlayer(move);
        }
    }
}

const findYourHat = new Game([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

findYourHat.play();