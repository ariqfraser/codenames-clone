import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeterministicRandomService } from 'src/app/services/deterministic-random.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
})
export class AnswersComponent implements OnInit {
  constructor(
    private dr: DeterministicRandomService,
    private route: ActivatedRoute
  ) {}

  currSeed?: number;
  newSeed?: number;
  ngOnInit() {
    this.route.params.subscribe(({ seed, bombs }) => {
      const gameData = this.dr.getAnswers(seed, bombs);
      console.log(gameData);
    });
  }
}
