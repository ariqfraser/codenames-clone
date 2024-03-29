import { ScoreManagerService } from './../../services/score-manager.service';
import { TeamManagerService } from './../../services/team-manager.service';
import {
  GameManagerService,
  CardAnswer,
} from './../../services/game-manager.service';
import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private gs: GameManagerService,
    private tm: TeamManagerService,
    private score: ScoreManagerService
  ) {}

  @ViewChild('redTeamRef') redTeamRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('blueTeamRef') blueTeamRef!: ElementRef<HTMLTextAreaElement>;

  bombCount: number = this.gs.bombCount;

  ngAfterViewInit() {
    this.loadTeams();
  }
  loadTeams() {
    const blue = localStorage.getItem('CN_blue_team');
    const red = localStorage.getItem('CN_red_team');

    this.blueTeamRef.nativeElement.value = blue || '';
    this.redTeamRef.nativeElement.value = red || '';
  }

  shuffle() {
    this.tm._blueTeam = this.blueTeamRef.nativeElement.value.split('\n');
    this.tm._redTeam = this.redTeamRef.nativeElement.value.split('\n');
    this.tm.shuffleTeams();
    this.blueTeamRef.nativeElement.value = this.tm._blueTeam.join('\n');
    this.redTeamRef.nativeElement.value = this.tm._redTeam.join('\n');
  }

  start() {
    this.tm._blueTeam = this.blueTeamRef.nativeElement.value.split('\n');
    this.tm._redTeam = this.redTeamRef.nativeElement.value.split('\n');
    localStorage.setItem('CN_blue_team', this.blueTeamRef.nativeElement.value);
    localStorage.setItem('CN_red_team', this.redTeamRef.nativeElement.value);
    this.gs.startGame();
    this.score.clearScores();
    this.router.navigate(['/play']);
  }

  setBombCount(count: number) {
    this.gs.bombCount = count;
  }

  setStartingTeam($event: any) {
    switch ($event.value) {
      case 'Red':
        this.gs.startingTeam = CardAnswer.RED;
        break;
      case 'Blue':
        this.gs.startingTeam = CardAnswer.BLUE;
        break;
      case 'Random':
        this.gs.setRandomStartingTeam();
        break;
    }
  }
}
