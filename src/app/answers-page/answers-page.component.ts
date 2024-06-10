import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { TileComponent } from '../shared/ui/tile/tile.component';
import { GameService } from '../shared/services/game.service';

@Component({
    selector: 'app-answers-page',
    standalone: true,
    imports: [TileComponent],
    templateUrl: './answers-page.component.html',
    styleUrl: './answers-page.component.scss',
})
export class AnswersPageComponent implements OnInit {
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private game = inject(GameService);

    private params = toSignal(this.route.paramMap);
    private seed = computed(() => {
        const seed = this.params()?.get('seed');
        if ((seed || 'X').match(/^\d+$/)) {
            return Number.parseInt(seed!);
        }
        return null;
    });

    private bombs = computed(() => {
        const seed = this.params()?.get('bombs');
        if ((seed || 'X').match(/^\d+$/)) {
            return Number.parseInt(seed!);
        }
        return null;
    });

    gameDate = this.game.gameData;
    tiles = this.game.tiles;
    ngOnInit(): void {
        if (!this.seed() || !this.bombs()) {
            this.router.navigate(['/']);
            return;
        }

        this.game.generateAnswers(this.seed()!, this.bombs()!);
        console.log();
    }

    clickTile(text: string) {
        const tiles = this.game.tiles();
        tiles.find((t) => t.text === text)!.clicked = false;

        this.game.tiles.set(tiles);
    }
}
