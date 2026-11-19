import { type IPoint } from './IPoint.ts';

export class Point implements IPoint {
    x: number;
    y: number;

    distanceTo(p2: IPoint): number {
        const distX: number = p2.x-this.x;
        const distY: number = p2.y-this.y;

        return Math.sqrt(distX*distX + distY*distY);
    }

    move(nx: number, ny: number): void {
        this.x = nx;
        this.y = ny;
    }

}
