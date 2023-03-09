import { PossibleWords } from './../util/words';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameManagerService {
  constructor() {}

  bombCount: number = 2;
  playWords: string[] = [];
  answers: CardAnswer[] = [];

  startingTeam: CardAnswer.BLUE | CardAnswer.RED = CardAnswer.BLUE;

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
    const teamSize = (24 - this.bombCount) / 2;
    for (let i = 0; i < teamSize; i++) {
      this.answers[i] = CardAnswer.BLUE;
      this.answers[i + teamSize] = CardAnswer.RED;
    }

    for (let i = 0; i < this.bombCount; i++) {
      this.answers.push(CardAnswer.BOMB);
    }
    this.answers.push(this.startingTeam);
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

  setRandomStartingTeam() {
    const rand = Math.round(Math.random());
    if (rand) {
      this.startingTeam = CardAnswer.BLUE;
      return;
    }
    this.startingTeam = CardAnswer.RED;
  }

  getAnswers(): void {
    const answers: Answer[] = this.playWords.map((word, i) => ({
      word,
      ans: this.answers[i],
    }));

    const blue = answers.filter((ans) => ans.ans === CardAnswer.BLUE);
    const red = answers.filter((ans) => ans.ans === CardAnswer.RED);
    const bomb = answers.filter((ans) => ans.ans === CardAnswer.BOMB);

    let output = this.generateMap() + '\n';

    output += `-----------------------------\n🟦 Blue Team's Answers 🟦\n-----------------------------\n`;
    blue.forEach((ans) => {
      output += ans.word + '\n';
    });

    output += `\n-------------------------------\n🟥 Red Team's Answers 🟥\n-------------------------------\n`;
    red.forEach((ans) => {
      output += ans.word + '\n';
    });

    output += `\n-----------\n💣 Bombs 💣\n-----------\n`;
    bomb.forEach((ans) => {
      output += ans.word + '\n';
    });

    navigator.clipboard.writeText(output);
  }

  private generateMap(answers?: Answer[]): string {
    if (!answers) {
      answers = this.playWords.map((word, i) => ({
        word,
        ans: this.answers[i],
      }));
    }

    let map = '----------\n🗺 MAP 🗺\n----------\n';

    for (let i = 0; i < answers.length; i++) {
      const ans = answers[i].ans;
      if (ans === CardAnswer.RED) map += '🟥';
      if (ans === CardAnswer.BLUE) map += '🟦';
      if (ans === CardAnswer.BOMB) map += '💣';
      if ((i + 1) % 5 === 0) {
        map += '\n';
      }
    }

    return map;
  }

  copyMap() {
    navigator.clipboard.writeText(this.generateMap());
  }
}

export interface Answer {
  word: string;
  ans: CardAnswer;
}

export enum CardAnswer {
  RED = 'RED',
  BLUE = 'BLUE',
  BOMB = 'BOMB',
}
