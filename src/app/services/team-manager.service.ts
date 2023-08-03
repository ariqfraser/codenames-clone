import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamManagerService {
  constructor() {}

  _redTeam: string[] = [];
  _blueTeam: string[] = [];

  private _redTeam$ = new BehaviorSubject(this._redTeam);
  private _blueTeam$ = new BehaviorSubject(this._blueTeam);

  get redTeam$() {
    return this._redTeam$.asObservable();
  }

  get blueTeam$() {
    return this._blueTeam$.asObservable();
  }

  shuffleTeams() {
    const shuffledArray = [...this._redTeam, ...this._blueTeam];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // generate a random index within the range of the unshuffled subarray
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]; // swap the elements at indices i and j
    }

    const midIndex: number = Math.ceil(shuffledArray.length / 2); // find the index of the midpoint of the array
    this._redTeam = shuffledArray.slice(0, midIndex); // extract the elements before the midpoint
    this._blueTeam = shuffledArray.slice(midIndex); // extract the elements from the midpoint to the end
    this._redTeam = this._redTeam.filter((value) => value.trim() !== '');
    this._blueTeam = this._blueTeam.filter((value) => value.trim() !== '');
    this.updateTeams();
  }

  private updateTeams() {
    this._blueTeam$.next(this._blueTeam);
    this._redTeam$.next(this._redTeam);
  }
}
