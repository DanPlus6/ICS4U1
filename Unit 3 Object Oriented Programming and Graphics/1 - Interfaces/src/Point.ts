import { type IPoint } from './IPoint.ts';

export class Point implements IPoint {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getDistTo(p2: IPoint): number {
        const distX: number = p2.x -this.x;
        const distY: number = p2.y-this.y;

        return Math.sqrt(distX*distX + distY*distY);
    }

    move(): void {}

}
