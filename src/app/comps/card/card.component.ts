import { ScoreManagerService } from './../../services/score-manager.service';
import { CardAnswer } from './../../services/game-manager.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  constructor(private score: ScoreManagerService) {}

  @Input() answer: CardAnswer = CardAnswer.BOMB;
  @Input() word: string = '';

  showAns: boolean = false;

  revealAns() {
    this.updateScore();
    this.showAns = true;
  }

  private updateScore() {
    if (this.answer === CardAnswer.BOMB) {
      return;
    }
    
    if (this.showAns) {
      return;
    }
    if (this.answer === CardAnswer.BLUE) {
      this.score.addBlue();
    }
    if (this.answer === CardAnswer.RED) {
      this.score.addRed();
    }
  }
}
