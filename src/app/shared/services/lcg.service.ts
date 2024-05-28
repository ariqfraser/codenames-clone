import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LcgService {
    private modulus: number = Math.pow(2, 31);
    private multiplier: number = 1103515245;
    private increment: number = 12345;
    private seed: number;

    constructor() {
        this.seed = Math.floor(Math.random() * this.modulus); // Set initial seed
    }

    getSeed() {
        return this.seed;
    }

    /**
     * Generates and sets a new seed
     * @return seed The generated seed
     */
    newSeed(): number {
        this.seed = Math.floor(Math.random() * this.modulus);
        return this.seed;
    }

    /**
     * Sets a new seed for the generator
     * @param seed The new seed value
     * @returns seed
     */
    setSeed(seed: number): number {
        if (seed < 0 || seed >= this.modulus) {
            throw new Error(
                'Seed value must be between 0 and ' + (this.modulus - 1)
            );
        }
        this.seed = seed;
        return seed;
    }

    /**
     * Generates a random number between 0 (inclusive) and 1 (exclusive)
     */
    next(): number {
        this.seed =
            (this.multiplier * this.seed + this.increment) % this.modulus;
        return this.seed / this.modulus;
    }

    /**
     * Generates a random number between min (inclusive) and max (exclusive)
     * @param min The lower bound of the range (inclusive)
     * @param max The upper bound of the range (exclusive)
     */
    nextInRange(min: number, max: number): number {
        if (min >= max) {
            throw new Error('Min value must be less than max value');
        }
        const rangeSize = max - min;
        const randomNormalized = this.next(); // Get random between 0 and 1
        const scaledValue = randomNormalized * rangeSize; // Scale to range size
        return Math.floor(scaledValue) + min; // Floor and add min for inclusive range
    }
}
