import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export interface Score {
  red: number;
  blue: number;
}

@Injectable({
  providedIn: 'root',
})
export class ScoreManagerService {
  private readonly _redPoints$ = new BehaviorSubject<number>(0);
  private readonly _bluePoints$ = new BehaviorSubject<number>(0);

  public readonly points$: Observable<Score> = combineLatest([
    this._bluePoints$,
    this._redPoints$,
  ]).pipe(map(([blue, red]) => ({ blue, red })));

  addBlue(): void {
    this._bluePoints$.next(this._bluePoints$.value + 1);
  }

  addRed(): void {
    this._redPoints$.next(this._redPoints$.value + 1);
  }

  minusBlue(): void {
    const newValue = this._bluePoints$.value - 1;
    this._bluePoints$.next(Math.max(0, newValue));
  }

  minusRed(): void {
    const newValue = this._redPoints$.value - 1;
    this._redPoints$.next(Math.max(0, newValue));
  }
}
