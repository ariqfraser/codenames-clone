import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { SplashPageComponent } from './pages/splash-page/splash-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { CardComponent } from './comps/card/card.component';
import { GameHeaderComponent } from './comps/game-header/game-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { ScoreTickerComponent } from './comps/score-ticker/score-ticker.component';
import { ButtonComponent } from './comps/button/button.component';
import {  MatIconModule } from '@angular/material/icon';
import { PlayerCardComponent } from './comps/player-card/player-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    SplashPageComponent,
    GamePageComponent,
    CardComponent,
    GameHeaderComponent,
    ScoreTickerComponent,
    ButtonComponent,
    PlayerCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatSliderModule,
    FormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
