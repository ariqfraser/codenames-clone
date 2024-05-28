import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { LcgService } from './lcg.service';
import { shareReplay, take, tap } from 'rxjs';
import { Tile, TileType } from '../types/tile.types';

@Injectable({
    providedIn: 'root',
})
export class TileService {
    constructor(private http: HttpClient, private lcg: LcgService) {}

    private _words: string[] = [];
    loaded = signal(false);

    get words() {
        return structuredClone(this._words);
    }

    loadWords() {
        return this.http.get<string[]>('assets/words.json').pipe(
            take(1),
            shareReplay(1),
            tap((words) => {
                this._words = words;
                this.loaded.set(true);
            })
        );
    }

    generateTiles(startingTeam: 0 | 1, nBombs: number, clickedTiles: number[]): Tile[] {
        const words = this.words;
        const nWordsPerTeam = (24 - nBombs) / 2;

        const generate = (n: number): string[] => {
            const teamWords: string[] = [];
            for (let _ = 0; _ < n; _++) {
                const i = this.lcg.nextInRange(0, words.length);
                const word = words[i];
                teamWords.push(word);
                words.splice(i, 1);
            }
            return teamWords;
        };

        const blueWords: string[] = generate(nWordsPerTeam);
        const redWords: string[] = generate(nWordsPerTeam);
        const extraWord = generate(1)[0];
        const bombs = generate(nBombs);

        if (startingTeam) {
            redWords.push(extraWord);
        } else {
            blueWords.push(extraWord);
        }

        const blueTiles = this.wordToTileArray(blueWords, TileType.BLUE);
        const redTiles = this.wordToTileArray(redWords, TileType.RED);
        const bombTiles = this.wordToTileArray(bombs, TileType.BOMB);
        const tiles: Tile[] = [...blueTiles, ...redTiles, ...bombTiles];
        // Fisher-Yates
        for (let i = tiles.length - 1; i > 0; i--) {
            const j = this.lcg.nextInRange(0, i + 1);
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }

        for (const i of clickedTiles) {
            tiles[i].clicked = true;
        }

        return tiles;
    }

    private wordToTileArray(words: string[], type: TileType): Tile[] {
        return words.map((text) => ({ text, clicked: false, type }));
    }
}
