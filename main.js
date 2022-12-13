const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let alive = true;

class Field { 
    constructor(field, positionX, positionY){ 
        this.field = field;
        this.positionX = 0;
        this.positionY = 0;
    }

    movePlayer(direction) { 
        switch(direction) { 
            case 'w': 
                this.positionX--;
                break;
            case 's': 
                this.positionX++;
                break;
            case 'a': 
                this.positionY--;
                break;
            case 'd': 
                this.positionY++;
            default: 
             console.log("Enter a valid direction: w (up), a (left), s (down), d (right)")
        }

        this.field[this.positionX][this.positionY] = pathCharacter;
    }

    print() { 
        let string = '\n';
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field.length; j++) {
                string += this.field[i][j];
                
            }
            string += '\n';
        }

        console.log(string);
    }
}

const gameField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

  gameField.print();
  gameField.movePlayer('h');
  gameField.print();
  
// console.log(`Use WASD keys to move your character ${pathCharacter} around the map to find your hat (${hat})`);
// console.log(`Don't fall in the holes (${hole}), and don't walk off the edge!`);

// while(alive) { 
//     myField.print();
//     const move = prompt("Which way?: ");
// }