export interface GameData {
    teamRed: string[];
    teamBlue: string[];
    bombCount: number;
    clickedTiles: number[];
    seed: number;
    state: 'PLAYING' | 'FINISHED';
}


export const isGameData = (data: any): data is GameData => {
    return (
        typeof data === 'object' &&
        data !== null &&
        Array.isArray(data.teamRed) &&
        data.teamRed.every((item: any) => typeof item === 'string') &&
        Array.isArray(data.teamBlue) &&
        data.teamBlue.every((item: any) => typeof item === 'string') &&
        typeof data.bombCount === 'number' &&
        Array.isArray(data.clickedTiles) &&
        data.clickedTiles.every((item: any) => typeof item === 'number') &&
        typeof data.seed === 'number' &&
        typeof data.state === 'string'
    );
}