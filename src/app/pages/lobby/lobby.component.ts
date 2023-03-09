import { GameManagerService } from './../../services/game-manager.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent {
  constructor(private router: Router, private gs: GameManagerService) {}

  @ViewChild('redTeamRef') redTeamRef!: ElementRef<HTMLTextAreaElement>;
  shuffle() {
    console.log(this.redTeamRef.nativeElement.value.split('\n'));
  }

  start() {
    this.gs.startGame();
    this.router.navigate(['/play']);
  }
}
