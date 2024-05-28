import {
    CdkDragDrop,
    DragDropModule,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';

import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    inject,
    signal,
} from '@angular/core';
import { GameService } from '../shared/services/game.service';
import { GameData } from '../shared/types/saved-game.types';

@Component({
    selector: 'app-main-menu',
    standalone: true,
    imports: [DragDropModule, MatIconModule],
    templateUrl: './main-menu.component.html',
    styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent implements OnInit {
    private game = inject(GameService);

    menuState = signal<'CREATE' | 'HOW_TO'>('CREATE');
    playersBlue: string[] = [];
    playersRed: string[] = [];
    @ViewChild('nameRef') nameInput?: ElementRef<HTMLInputElement>;

    ngOnInit(): void {
        this.loadLastPlayers();
    }

    loadLastPlayers() {
        const savedDataStr = window.localStorage.getItem('SAVED_GAME');
        if (!savedDataStr) return;

        const { teamBlue, teamRed } = JSON.parse(savedDataStr) as GameData;
        this.playersBlue = teamBlue;
        this.playersRed = teamRed;
    }

    dropPlayer(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }

    addPlayer(key: string, name: string) {
        if (key !== 'Enter') return;
        name = name.trim();
        if (!name) return;

        if (this.playersBlue.length <= this.playersRed.length) {
            this.playersBlue.push(name);
        } else {
            this.playersRed.push(name);
        }

        this.nameInput!.nativeElement.value = '';
    }

    removePlayer(name: string) {
        const red = this.playersRed.indexOf(name);
        const blue = this.playersBlue.indexOf(name);

        if (red > blue) {
            this.playersRed.splice(red, 1);
            return;
        }

        this.playersBlue.splice(blue, 1);
    }

    removeAllPlayers() {
        this.playersBlue = [];
        this.playersRed = [];
    }

    start() {
        this.game.newGame(this.playersBlue, this.playersRed, 4);
    }
}
