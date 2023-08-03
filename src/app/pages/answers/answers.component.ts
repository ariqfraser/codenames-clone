import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeterministicRandomService } from 'src/app/services/deterministic-random.service';
import { map } from 'rxjs';

@Component({
    selector: 'app-answers',
    templateUrl: './answers.component.html',
    styleUrls: ['./answers.component.scss'],
})
export class AnswersComponent implements OnInit, AfterViewInit {
    constructor(private dr: DeterministicRandomService, private route: ActivatedRoute) {}

    currSeed?: number;
    newSeed?: number;
    gameData$ = this.route.params.pipe(
        map(({ seed, bombs }) => {
            return this.dr.getAnswers(seed, bombs);
        })
    );

    ngOnInit() {}

    ngAfterViewInit(): void {}
}
