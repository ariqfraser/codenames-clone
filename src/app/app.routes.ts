import { Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { GamePageComponent } from './game-page/game-page.component';
import { inject } from '@angular/core';
import { TileService } from './shared/services/tile.service';
import { AnswersPageComponent } from './answers-page/answers-page.component';

const words = () => inject(TileService).loadWords();

export const routes: Routes = [
    {
        path: '',
        component: MainMenuComponent,
        resolve: {
            words,
        },
    },
    {
        path: 'play',
        component: GamePageComponent,
        resolve: {
            words,
        },
    },
    {
        path: 'a/:seed/:bombs',
        resolve: {
            words,
        },
        component: AnswersPageComponent,
    },
    { path: '**', redirectTo: '' },
];
