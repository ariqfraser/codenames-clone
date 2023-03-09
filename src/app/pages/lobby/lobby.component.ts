import { TeamManagerService } from './../../services/team-manager.service';
import { GameManagerService } from './../../services/game-manager.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  constructor(
    private router: Router,
    private gs: GameManagerService,
    private tm: TeamManagerService
  ) {}

  @ViewChild('redTeamRef') redTeamRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('blueTeamRef') blueTeamRef!: ElementRef<HTMLTextAreaElement>;

  ngOnInit() {}

  shuffle() {
    this.tm._blueTeam = this.blueTeamRef.nativeElement.value.split('\n');
    this.tm._redTeam = this.redTeamRef.nativeElement.value.split('\n');
    this.tm.shuffleTeams();
    this.blueTeamRef.nativeElement.value = this.tm._blueTeam.join('\n');
    this.redTeamRef.nativeElement.value = this.tm._redTeam.join('\n');
  }

  start() {
    this.gs.startGame();
    this.router.navigate(['/play']);
  }
}
