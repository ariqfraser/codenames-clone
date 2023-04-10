import { ScoreManagerService } from './../../services/score-manager.service';
import { Router } from '@angular/router';
import { TeamManagerService } from './../../services/team-manager.service';
import {
  GameManagerService,
  CardAnswer,
} from './../../services/game-manager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {
  constructor(
    private gs: GameManagerService,
    private tm: TeamManagerService,
    private router: Router,
  ) {}
  

  words: string[] = this.gs.playWords;
  answers: CardAnswer[] = this.gs.answers;
  redTeam = this.tm._redTeam;
  blueTeam = this.tm._blueTeam;
  startingTeam: CardAnswer = this.gs.startingTeam;

  ngOnInit() {
    if (!this.words.length) {
      this.router.navigate(['/lobby']);
    }
  }
  
  copyAnswers() {
    this.gs.getAnswers();
  }
}
