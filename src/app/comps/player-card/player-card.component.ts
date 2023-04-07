import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent {
  @Input() name: string = 'test';
  
  @Input() blue: boolean = false;
  @Input() red: boolean = false;
}
