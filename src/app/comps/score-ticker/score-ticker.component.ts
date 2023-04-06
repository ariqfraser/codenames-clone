import { CardAnswer } from './../../services/game-manager.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-ticker',
  templateUrl: './score-ticker.component.html',
  styleUrls: ['./score-ticker.component.scss']
})
export class ScoreTickerComponent implements OnInit{
  
  @Input() team: CardAnswer = CardAnswer.BLUE;
  @Input() maxPoints: number = 10;

  cards: any[] = [];

  ngOnInit() {
    this.cards = Array(this.maxPoints);
  } 
  
}
