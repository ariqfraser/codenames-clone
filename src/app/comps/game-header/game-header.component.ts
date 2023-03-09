import { GameManagerService } from './../../services/game-manager.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.scss'],
})
export class GameHeaderComponent {
  constructor(private gm: GameManagerService) {}
  copyAns() {
    this.gm.getAnswers();
  }

  copyMap() {
    this.gm.copyMap();
  }
}
