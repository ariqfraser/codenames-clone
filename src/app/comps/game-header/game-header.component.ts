import { GameManagerService } from './../../services/game-manager.service';
import { ScoreManagerService } from './../../services/score-manager.service';
import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs';

@Component({
    selector: 'app-game-header',
    templateUrl: './game-header.component.html',
    styleUrls: ['./game-header.component.scss'],
})
export class GameHeaderComponent implements OnInit {
    constructor(private score: ScoreManagerService, private gm: GameManagerService) {}

    score$ = this.score.points$;

    bombCount: any[] = [];
    gameData$ = this.gm.gameData$.pipe(
        tap(({ bombCount, blueCount, redCount }) => {
            this.bombCount = new Array(bombCount);
        })
    );

    ngOnInit() {}
}
