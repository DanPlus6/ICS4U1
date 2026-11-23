import type { IPoint } from "./IPoint";

export class FallingPoint implements IPoint {
    readonly x: number;
    y: number = 0;
    readonly grav: number = 9.8;
    
    constructor(x: number, grav: number = 9.8) {
        this.x = x;
        this.grav = grav;
    }

    getDistTo(p2: IPoint): number {
        const distX: number = p2.x -this.x;
        const distY: number = p2.y-this.y;

        return Math.sqrt(distX*distX + distY*distY);
    }

    /** Move a falling point that is affected by gravity based on how long time has elapsed */
    move(t: number = 1): void {
        this.y -= 0.5 * this.grav * t;
    }
}
