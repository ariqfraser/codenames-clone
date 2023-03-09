import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-page',
  templateUrl: './splash-page.component.html',
  styleUrls: ['./splash-page.component.scss'],
})
export class SplashPageComponent {
  constructor(private router: Router) {}

  start() {
    this.router.navigate(['/lobby']);
  }
}
