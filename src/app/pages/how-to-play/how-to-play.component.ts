import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-how-to-play',
    templateUrl: './how-to-play.component.html',
    styleUrls: ['./how-to-play.component.scss'],
})
export class HowToPlayComponent {
    constructor(private dom: DomSanitizer) {}
    instructions = [
        {
            title: 'Objective',
            text: "🎯 The goal of not-codenames is to be the first team to uncover all of your team's secret codenames (words) while avoiding the opposing team's words and bombs 💣.",
            img: '',
        },
        {
            title: 'Setup',
            text: '🛠️ Setup instructions are on the lobby page 🙈',
            img: '',
        },
        {
            title: 'Gameplay Mechanics',
            text: "👩‍💻 One person is required to share their screen of the board. This person's job is to click on the words during each turn.",
            img: '',
        },
        {
            title: 'O Captain! My Captain!',
            text: '🏴‍☠️ Each team will elect one captain. Captains take turns giving one-word clues and a number to their respective teams. The clue should relate to one or more of their team\'s words on the grid, and the number indicates how many words the clue is associated with. <br><br>Example clue: "Country 2"<br><br>Whoever is screensharing the board can click on the big "Copy Answers" button to copy a link and send it to the captains.',
            img: '',
        },
        {
            title: 'Making a Guess',
            text: "🤔 The rest of the team can now discuss the clue and try to guess which words their spymaster is referring to. They can make a guess equal to the number given by the spymaster. <br><br>Once the team has come to a unanimous decision on the words they wish to guess, whoever is screensharing can go ahead and click on them in order, one by one. <br><br>The screensharer will continue to click on the guessed words until the opposing team's color appears or a bomb has been hit 😱.",
            img: '',
        },
        {
            title: 'Revealing the Cards',
            text: "🎭 In the event that a team makes an incorrect guess (i.e., a word that is revealed to be the opposing team's word), the team's turn is over, and they forfeit the remainder of the guesses. <br><br>In the event that a team's guess has revealed a bomb, that team loses, and the game is over. <br><br>",
            img: '',
        },
        {
            title: 'Winning the Game',
            text: '🏆 The game will continue like this until a bomb has been hit or a team has guessed all their words.',
            img: '',
        },
        {
            title: 'Additional Rules',
            text: '🔄 Allow a "pass" option if the team members don\'t want to guess any of the words based on the given clue. <br><br>Feel free to make up any other house rules. Enjoy!',
            img: '',
        },
    ];

    currentStep = 0;

    sanitize(text: string) {
        return this.dom.bypassSecurityTrustHtml(text);
    }
}
