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
  constructor(private gs: GameManagerService) {}
  words: string[] = this.gs.playWords;
  answers: CardAnswer[] = this.gs.answers;
}
