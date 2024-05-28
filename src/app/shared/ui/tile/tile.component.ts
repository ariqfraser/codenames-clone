
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tile, TileType } from '../../types/tile.types';

@Component({
    selector: 'app-tile',
    standalone: true,
    imports: [],
    templateUrl: './tile.component.html',
    styleUrl: './tile.component.scss',
})
export class TileComponent {
    @Input() text = '';
    @Input() clicked = false;
    @Input() type: TileType = TileType.BOMB;
}
