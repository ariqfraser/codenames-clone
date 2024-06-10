import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LcgService } from './lcg.service';
import { TileService } from './tile.service';
import { Tile } from '../types/tile.types';
import { GameData, isGameData } from '../types/saved-game.types';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    constructor(
        private router: Router,
        private lcg: LcgService,
        private tileService: TileService
    ) {}

    tiles = signal<Tile[]>([]);
    startingTeam: 0 | 1 = 0;
    gameData = signal<GameData>({
        bombCount: 4,
        clickedTiles: [],
        seed: this.lcg.newSeed(),
        state: 'PLAYING',
        teamBlue: [],
        teamRed: [],
    });

    newGame(blues: string[], reds: string[], bombCount = 4) {
        this.gameData.set({
            bombCount: bombCount,
            clickedTiles: [],
            seed: this.lcg.newSeed(),
            state: 'PLAYING',
            teamBlue: blues,
            teamRed: reds,
        });
        this.initGame();
        this.saveGameData();
        this.router.navigate(['/play']);
    }

    generateAnswers(seed: number, bombCount: number) {
        this.initGame(seed, bombCount);
        this.tiles.update(tiles => {
            return tiles.map(tile => ({...tile, clicked: true}))
        })
    }

    private initGame(seed?: number, bombCount?: number) {
        this.lcg.setSeed(seed || this.gameData().seed);
        this.startingTeam = Math.round(this.lcg.next()) as 0 | 1;
        this.tiles.set(
            this.tileService.generateTiles(
                this.startingTeam,
                bombCount || this.gameData().bombCount,
                this.gameData().clickedTiles
            )
        );
    }

    private saveGameData() {
        const data = JSON.stringify(this.gameData());
        window.localStorage.setItem('SAVED_GAME', data);
    }

    loadGameData() {
        let gameData: GameData | null = null;

        try {
            const parsedData = JSON.parse(
                window.localStorage.getItem('SAVED_GAME') || 'null'
            );

            if (isGameData(parsedData)) {
                gameData = parsedData;
            } else {
                console.error('Invalid game data structure', parsedData);
            }
        } catch (error) {
            console.error('Failed to parse game data', error);
        }

        this.gameData.set(gameData!);
        this.initGame();
    }

    revealTile(tileIndex: number) {
        const gameData = structuredClone(this.gameData());
        gameData.clickedTiles.push(tileIndex);
        this.gameData.set(gameData)

        const tiles = structuredClone(this.tiles());
        tiles[tileIndex].clicked = true;
        this.tiles.set(tiles);

        this.saveGameData();
    }
}
