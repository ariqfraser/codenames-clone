import { TileService } from './shared/services/tile.service';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    title = 'codenames';
    private tileService = inject(TileService);

    ngOnInit(): void {
        this.tileService.loadWords();
    }
}
