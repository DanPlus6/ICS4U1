import { randomInt } from './randomInt.ts';
import { type IPoint } from './IPoint.ts';

export class RandomPoint implements IPoint {
    x: number;
    y: number;

    constructor() {
        this.x = randomInt(0,500);
        this.y = randomInt(0,500);
    }

    getDistTo(p2: IPoint): number {
        const distX: number = p2.x - this.x;
        const distY: number = p2.y - this.y;

        return Math.sqrt(distX*distX + distY*distY);
    }

    move(): void {
        this.x = randomInt(0,500);
        this.y = randomInt(0,500);
    }
}
