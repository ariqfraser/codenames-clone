import { transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { interval, take } from 'rxjs';
import { SoundService } from 'src/app/services/sound.service';

@Component({
    selector: 'app-exploding-card',
    templateUrl: './exploding-card.component.html',
    styleUrls: ['./exploding-card.component.scss'],
})
export class ExplodingCardComponent {
    @Input() text = 'Example';

    shake = false;
    explode = false;
    hasExploded = false;

    constructor(private sound: SoundService) {}

    startDetonation() {
        if (this.shake || this.explode) {
            return;
        }
        this.sound.playExplosion();
        this.hasExploded = true;
        this.shake = true;
        const tick = interval(2000);
        tick.pipe(take(3)).subscribe((i) => {
            this.shake = false;
            console.log(i);
            if (i === 0) {
                console.log('explode');
                this.explode = true;
            }

            if (i === 2) {
                this.explode = false;
            }
        });
    }
}
