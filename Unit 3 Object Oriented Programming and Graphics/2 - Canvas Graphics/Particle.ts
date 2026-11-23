import { randomInt } from './src/randomInt.ts';
import { Point } from './src/Point';
import { RandomPoint } from './src/RandomPoint';
import { IPoint } from './src/IPoint';

export class Particle {
    private origin: Point;
    private children: Point[] = [];
    private radius: number;
    private potency: number;

    constructor(x: number, y: number, r: number = 20, pot: number = 10) {
        this.origin = new Point(x,y);
        this.radius = r;
        this.potency = pot;

        for (let cx,cy,i=0; i<pot; ++i) {
            this.children.push(
                randomInt()
            )
        }
    }

    getDistTo(p2: IPoint): number {
        const distX: number = p2.x - this.x;
        const distY: number = p2.y - this.y;

        return Math.sqrt(distX*distX + distY*distY);
    }

    move(): void {
        this.x = randomInt(this.radius);
        this.y = randomInt(this.radius);
    }
    
    printPoint(): void {
        console.log(`${this.x} {this.y}`);
    }
}
