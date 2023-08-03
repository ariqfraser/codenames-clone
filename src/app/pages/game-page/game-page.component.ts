import { ScoreManagerService } from './../../services/score-manager.service';
import { Router } from '@angular/router';
import { TeamManagerService } from './../../services/team-manager.service';
import { GameManagerService, CardAnswer } from './../../services/game-manager.service';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/types/game.types';
import { tap } from 'rxjs';

@Component({
    selector: 'app-game-page',
    templateUrl: './game-page.component.html',
    styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {
    constructor(
        private gs: GameManagerService,
        private tm: TeamManagerService,
        private router: Router
    ) {}

    redTeam = this.tm._redTeam;
    blueTeam = this.tm._blueTeam;
    startingTeam: CardAnswer = this.gs.startingTeam;

    gameData$ = this.gs.gameData$.pipe(
        tap((gameData) => {
            this.validateData(gameData.cards);
        })
    );

    ngOnInit() {}

    validateData(cards: Card[]) {
        console.log(cards);
        if (!cards.length) {
            this.router.navigate(['/lobby']);
        }
    }

    copyAnswers() {
        console.log('lcikk');
        this.gs.copyAnswers();
    }
}
