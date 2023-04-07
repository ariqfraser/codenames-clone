import { GameManagerService } from './../../services/game-manager.service';
import { ScoreManagerService } from './../../services/score-manager.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.scss'],
})
export class GameHeaderComponent implements OnInit {
  constructor(
    private score: ScoreManagerService,
    private gm: GameManagerService
  ) {}

  score$ = this.score.points$;
  @Input() startingTeam: string = '';

  maxRed = 0;
  maxBlue = 0;
  bombCount: any[] = [];

  ngOnInit() {
    const count: { RED: number; BLUE: number; BOMB: number } =
      this.gm.answers.reduce(
        (acc: any, curr) => {
          acc[curr] = (acc[curr] || 0) + 1;
          return acc;
        },
        {}
      );

    console.log(count);

    this.maxRed = count.RED || 0;
    this.maxBlue = count.BLUE || 0;
    this.bombCount = new Array(count.BOMB || 0);
  }
}
