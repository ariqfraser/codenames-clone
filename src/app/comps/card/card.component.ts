import { CardAnswer } from './../../services/game-manager.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() answer: CardAnswer = CardAnswer.BOMB;
  @Input() word: string = '';

  showAns: boolean = false;

  revealAns() {
    this.showAns = !this.showAns;
  }
}
