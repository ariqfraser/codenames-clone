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
    this.showAns = !this.showAns;
    this.updateScore();
  }

  private updateScore() {
    if (this.answer === CardAnswer.BOMB) {
      return;
    }
    if (this.answer === CardAnswer.BLUE && this.showAns) {
      this.score.addBlue();
    }
    if (this.answer === CardAnswer.RED && this.showAns) {
      this.score.addRed();
    }
    if (this.answer === CardAnswer.BLUE && !this.showAns) {
      this.score.minusBlue();
    }
    if (this.answer === CardAnswer.RED && !this.showAns) {
      this.score.minusRed();
    }
  }
}
