const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field { 
    constructor(field){ 
        this.field = field;
    }

    print() { 
        let string = '';
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field.length; j++) {
                string += this.field[i][j];
                
            }
            string += '\n';
        }

        console.log(string);
    }
}

// GAME LOOP

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

const alive = true;

console.log(`Use WASD keys to move your character ${pathCharacter} around the map and find your hat (${hat}). Don't fall in the holes (${hole}), and don't walk off the edge!`);
while(alive) { 
    myField.print();
    const move = prompt("Which way?: ");
}