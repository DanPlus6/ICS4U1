import { randomInt } from './randomInt.ts';
import { Point } from './Point.ts';
import { RandomPoint } from './RandomPoint.ts';
import { IPoint } from './IPoint.ts';

export class Particles {
    private origin: Point;
    private children: Point[] = [];
    private radius: number;
    private potency: number;

    private genParticle() {
        for (let px,py, i = 0; i < this.potency; ++i) {
            px = randomInt(-this.radius, this.radius) + this.origin.x;
            py = randomInt(-this.radius, this.radius) + this.origin.y, 

            this.children.push( new Point(px,py) );
        }
    }

    constructor(x: number, y: number, r: number = 20, pot: number = 10) {
        this.origin = new Point(x,y);
        this.radius = r;
        this.potency = pot;

        this.genParticle();
    }

    getDistTo(p2: IPoint): number {
        const distX: number = p2.x - this.origin.x;
        const distY: number = p2.y - this.origin.y;

        return Math.sqrt(distX*distX + distY*distY);
    }

    move(nx: number, ny: number): void {
        this.origin.x = nx;
        this.origin.y = ny;
    }
    
    printPoint(): void {
        console.log(`${this.origin.x} ${this.origin.y}`);
    }
}
