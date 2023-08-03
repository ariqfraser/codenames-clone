import { ScoreManagerService } from './../../services/score-manager.service';
import { CardAnswer } from './../../services/game-manager.service';
import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/types/game.types';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    constructor(private score: ScoreManagerService) {}

    @Input() answer: Answer = 'BOMB';
    @Input() word: string = '';

    showAns: boolean = false;
    @Input() isAnswer = false;
    guessed = false;

    ngOnInit() {
        this.showAns = this.isAnswer;
    }

    revealAns() {
        if (this.isAnswer) {
            this.markGuessed();
            return;
        }
        this.updateScore();
        this.showAns = true;
    }

    markGuessed() {
        this.guessed = true;
    }

    private updateScore() {
        console.log('clic');
        if (this.answer === 'BOMB') {
            return;
        }

        if (this.showAns) {
            return;
        }
        if (this.answer === 'BLUE') {
            this.score.addBlue();
        }
        if (this.answer === 'RED') {
            this.score.addRed();
        }
    }
}
