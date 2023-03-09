import { TeamManagerService } from './../../services/team-manager.service';
import {
  GameManagerService,
  CardAnswer,
} from './../../services/game-manager.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent {
  constructor(private gs: GameManagerService, private tm: TeamManagerService) {}
  words: string[] = this.gs.playWords;
  answers: CardAnswer[] = this.gs.answers;
  redTeam = this.tm._redTeam;
  blueTeam = this.tm._blueTeam;
}
