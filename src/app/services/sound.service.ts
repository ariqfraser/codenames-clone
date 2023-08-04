import { Injectable } from '@angular/core';
import { interval, take } from 'rxjs';

const getRand = (max: number): number => {
    return Math.floor(Math.random() * max);
};

@Injectable({
    providedIn: 'root',
})
export class SoundService {
    constructor() {
        this.explosions.push(new Audio('../../assets/audio/kaboom.mp3'));
        this.explosions.push(new Audio('../../assets/audio/ohmy.mp3'));
        this.rumbles.push(new Audio('../../assets/audio/rumble.flac'));
        this.rumbles.push(new Audio('../../assets/audio/nukk_incoming.mp3'));
    }

    private pen = new Audio('../../assets/audio/click.mp3');
    private rumbles: HTMLMediaElement[] = [];
    private explosions: HTMLMediaElement[] = [];

    playPen() {
        this.pen.volume = 0.2;
        this.pen.load();
        this.pen.play();
    }

    playExplosion() {
        const i = getRand(this.rumbles.length);
        const ii = getRand(this.explosions.length);
        console.log(i, ii);
        const source = interval(2000).pipe(take(1));
        this.rumbles[i].volume = 0.2;
        this.rumbles[i].play();
        source.subscribe(() => {
            this.rumbles[i].load();
            this.explosions[ii].volume = 0.2;
            this.explosions[ii].play();
        });
    }
}
