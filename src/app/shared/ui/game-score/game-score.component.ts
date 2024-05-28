import {
    Component,
    Input,
    OnInit,
    WritableSignal,
    computed,
    effect,
    inject,
    input,
    signal,
} from '@angular/core';
import { Tile, TileType } from '../../types/tile.types';
import { GameService } from '../../services/game.service';

@Component({
    selector: 'app-game-score',
    standalone: true,
    imports: [],
    templateUrl: './game-score.component.html',
    styleUrl: './game-score.component.scss',
})
export class GameScoreComponent implements OnInit {
    private gameService = inject(GameService);
    bombArray: void[] = [];
    private tiles = this.gameService.tiles;
    gameData = this.gameService.gameData;

    red = computed(() => {
        const tiles = this.tiles().filter(({ type }) => type === TileType.RED);
        const score = tiles.reduce(
            (acc, curr) => (curr.clicked ? acc + 1 : acc),
            0
        );
        const total = tiles.length;
        return { total, score, percent: (score / total) * 100 };
    });

    blue = computed(() => {
        const tiles = this.tiles().filter(({ type }) => type === TileType.BLUE);
        const score = tiles.reduce(
            (acc, curr) => (curr.clicked ? acc + 1 : acc),
            0
        );
        const total = tiles.length;
        return { total, score, percent: (score / total) * 100 };
    });

    ngOnInit(): void {
        this.bombArray = new Array(this.gameData().bombCount);
    }
}
