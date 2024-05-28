import { Component, OnInit, inject } from '@angular/core';
import { GameService } from '../shared/services/game.service';
import { CommonModule } from '@angular/common';
import { TileComponent } from '../shared/ui/tile/tile.component';
import { Tile } from '../shared/types/tile.types';
import { GameScoreComponent } from '../shared/ui/game-score/game-score.component';

@Component({
    selector: 'app-game-page',
    standalone: true,
    imports: [CommonModule, TileComponent, GameScoreComponent],
    templateUrl: './game-page.component.html',
    styleUrl: './game-page.component.scss',
})
export class GamePageComponent implements OnInit {
    private gameService = inject(GameService);

    gameData = this.gameService.gameData;
    tiles = this.gameService.tiles;

    ngOnInit(): void {
        this.gameService.loadGameData();
    }

    tileClick(tileIndex: number) {
        this.gameService.revealTile(tileIndex);
    }
}
