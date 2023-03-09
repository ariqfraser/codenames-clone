import { PossibleWords } from './../util/words';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameManagerService {
  constructor() {}

  bombCount: number = 3;
  playWords: string[] = [];
  answers: CardAnswer[] = [];

  private getRandomWords(): void {
    const randomWords: string[] = [];

    const indexList: number[] = [];

    function getWord() {
      if (indexList.length === 25) {
        return;
      }
      const randomIndex = Math.floor(Math.random() * PossibleWords.length);
      if (indexList.includes(randomIndex)) {
        getWord();
        return;
      }
      randomWords.push(PossibleWords[randomIndex]);
      indexList.push(randomIndex);
      getWord();
    }

    getWord();

    this.playWords = randomWords;
  }

  private shuffleAnswers() {
    this.answers = [];
    const teamSize = (25 - this.bombCount) / 2;
    for (let i = 0; i < teamSize; i++) {
      this.answers[i] = CardAnswer.BLUE;
      this.answers[i + teamSize] = CardAnswer.RED;
    }

    for (let i = 0; i < this.bombCount; i++) {
      this.answers.push(CardAnswer.BOMB);
    }
    console.log(teamSize, this.answers);

    const shuffledArray: CardAnswer[] = [...this.answers];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // generate a random index within the range of the unshuffled subarray
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]; // swap the elements at indices i and j
    }

    this.answers = shuffledArray;
  }

  startGame() {
    this.getRandomWords();
    this.shuffleAnswers();
  }
}

export enum CardAnswer {
  RED = 'RED',
  BLUE = 'BLUE',
  BOMB = 'BOMB',
}
