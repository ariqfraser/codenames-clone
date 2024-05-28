export interface Tile {
    text: string;
    clicked: boolean;
    type: TileType
}

export enum TileType {
    BOMB = 'BOMB',
    RED = 'RED',
    BLUE = 'BLUE',
}
