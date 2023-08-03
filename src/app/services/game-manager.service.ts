import { PossibleWords } from './../util/words';
import { Injectable } from '@angular/core';
import { DeterministicRandomService } from './deterministic-random.service';
import { GameData } from '../types/game.types';
import { BehaviorSubject } from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';

@Injectable({
    providedIn: 'root',
})
export class GameManagerService {
    constructor(private dr: DeterministicRandomService, private clipboard: Clipboard) {}

    bombCount: number = 2;

    startingTeam: CardAnswer = CardAnswer.BOMB;

    gameSeed: number = 0;

    private gameDataSubject = new BehaviorSubject<GameData>({
        cards: [],
        blueCount: 0,
        redCount: 0,
        bombCount: 0,
        seed: 0,
    });
    gameData$ = this.gameDataSubject.asObservable();

    startGame() {
        this.gameSeed = this.dr.generateSeed();
        const gameData = this.dr.getAnswers(this.gameSeed, this.bombCount);
        this.gameDataSubject.next(gameData);
        console.log(gameData);
        this.copyAnswers();
        // this.getRandomWords();
        // this.shuffleAnswers();
    }

    copyAnswers() {
        const { seed, bombCount } = this.gameDataSubject.getValue();
        const url = `
sdlajsdlkjadas
dasd
asd
http://localhost:4200/answers/${seed}/${bombCount}
`;
        this.clipboard.copy(url);
        console.log('answers copied');
    }

    setRandomStartingTeam() {
        this.startingTeam = Math.random() < 0.5 ? CardAnswer.BLUE : CardAnswer.RED;
    }

    private generateMap(answers: Answer[]): string {
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
