import { GamePageComponent } from './pages/game-page/game-page.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashPageComponent } from './pages/splash-page/splash-page.component';

const routes: Routes = [
  { path: '', component: SplashPageComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'play', component: GamePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
