import { ScoreManagerService } from './../../services/score-manager.service';
import { CardAnswer } from './../../services/game-manager.service';
import { Component, Input } from '@angular/core';
import { Answer } from 'src/app/types/game.types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  constructor(private score: ScoreManagerService) {}

  @Input() answer: Answer = 'BOMB';
  @Input() word: string = '';

  showAns: boolean = false;

  revealAns() {
    this.updateScore();
    this.showAns = true;
  }

  private updateScore() {
    console.log('clic');
    if (this.answer === 'BOMB') {
      return;
    }

    if (this.showAns) {
      return;
    }
    if (this.answer === 'BLUE') {
      this.score.addBlue();
    }
    if (this.answer === 'RED') {
      this.score.addRed();
    }
  }
}
