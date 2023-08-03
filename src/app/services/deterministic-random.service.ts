import { Injectable } from '@angular/core';
import { PossibleWords } from '../util/words';
import { Card, GameData } from '../types/game.types';

@Injectable({
  providedIn: 'root',
})
export class DeterministicRandomService {
  private seed: number = 0;
  private m: number = 2147483647; // 2^31 - 1 (a Mersenne prime)
  private a: number = 16807; // Prime multiplier
  private q: number = 0;
  private r: number = 0;

  constructor() {
    this.q = Math.floor(this.m / this.a);
    this.r = this.m % this.a;
  }

  private setSeed(seed: number) {
    this.seed = seed;
  }

  private getNextRandom(): number {
    const hi = Math.floor(this.seed / this.q);
    const lo = this.seed % this.q;
    const test = this.a * lo - this.r * hi;
    if (test > 0) {
      this.seed = test;
    } else {
      this.seed = test + this.m;
    }
    return (this.seed * 4.656612875e-10) % 1; // Uniformly distributed random number between 0 and 1
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.abs(this.getNextRandom()) * max);
  }

  getRandomSelection(
    seed: number,
    numWordsToSelect: number,
    data: string[]
  ): string[] {
    this.setSeed(seed);
    const selectedWords = [];

    const remainingIndices = data.reduce((acc, _, i) => {
      acc.push(i);
      return acc;
    }, [] as number[]);

    for (let i = 0; i < numWordsToSelect; i++) {
      const randomIndex = this.getRandomInt(remainingIndices.length);
      const selectedWord = data[remainingIndices[randomIndex]];
      selectedWords.push(selectedWord);
      remainingIndices.splice(randomIndex, 1);
    }

    return selectedWords;
  }

  private assignRandomAnswers(
    seed: number,
    selection: string[],
    desiredBombs: number
  ) {
    const startingOffset = 1;
    const teamSize = (selection.length - desiredBombs - startingOffset) / 2;

    const bombs = this.getRandomSelection(seed, desiredBombs, selection);
    selection = selection.filter((word) => !bombs.includes(word));

    const teamA = this.getRandomSelection(seed, teamSize, selection);
    selection = selection.filter((word) => !teamA.includes(word));

    const teamB = this.getRandomSelection(seed, teamSize, selection);
    selection = selection.filter((word) => !teamB.includes(word));

    const firstTeam = this.getRandomSelection(seed, 1, ['A', 'B']);

    if (firstTeam[0] === 'A') {
      teamA.push(selection[0]);
    } else {
      teamB.push(selection[0]);
    }

    console.log(teamA, teamB, bombs);
    return { teamA, teamB, bombs };
  }

  getAnswers(seed: number, desiredBombs: number = 2): GameData {
    const words = this.getRandomSelection(seed, 25, PossibleWords);
    const { teamA, teamB } = this.assignRandomAnswers(
      seed,
      words,
      desiredBombs
    );
    console.log(words);

    const answers: Card[] = words.map((word) => ({
      word,
      answer: teamA.includes(word)
        ? 'RED'
        : teamB.includes(word)
        ? 'BLUE'
        : 'BOMB',
    }));

    console.log(answers);
    return {
      cards: answers,
      redCount: teamA.length,
      blueCount: teamB.length,
      bombCount: desiredBombs,
      seed,
    };
  }

  generateSeed() {
    return Math.floor(Math.random() * this.m);
  }
}
