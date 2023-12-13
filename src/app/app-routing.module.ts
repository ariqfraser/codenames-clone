import { GamePageComponent } from './pages/game-page/game-page.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashPageComponent } from './pages/splash-page/splash-page.component';
import { AnswersComponent } from './pages/answers/answers.component';
import { HowToPlayComponent } from './pages/how-to-play/how-to-play.component';

const routes: Routes = [
  { path: '', component: SplashPageComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'play', component: GamePageComponent },
  { path: 'answers/:seed/:bombs', component: AnswersComponent },
  { path: 'how-to-play', component: HowToPlayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
