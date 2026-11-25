import { type Point2D } from '../types/Point2D.ts';

export class Point implements Point2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getDistTo(p2: Point2D): number {
        const distX: number = p2.x -this.x;
        const distY: number = p2.y-this.y;

        return Math.sqrt(distX*distX + distY*distY);
    }

    move(): void {}
}
