import { randomInt } from '../utils/randomInt.ts';
import { type Point2D } from '../types/Point2D.ts';

export class RandomPoint implements Point2D {
    x: number;
    y: number;

    constructor() {
        this.x = randomInt(0,500);
        this.y = randomInt(0,500);
    }

    getDistTo(p2: Point2D): number {
        const distX: number = p2.x - this.x;
        const distY: number = p2.y - this.y;

        return Math.sqrt(distX*distX + distY*distY);
    }

    move(): void {
        this.x = randomInt(0,500);
        this.y = randomInt(0,500);
    }
}
