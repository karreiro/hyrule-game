class Game {

  constructor(character) {
    this.character = character
  }

  update() {
    this.character.move()
  }
}

export default Game;
