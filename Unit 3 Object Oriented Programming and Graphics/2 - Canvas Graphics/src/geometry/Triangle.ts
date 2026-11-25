import type { Shape2D } from "../types/Shape2D.ts";

class Triangle implements Shape2D {
    private side1: number;
    private side2: number;
    private side3: number;

    constructor(...sides: number[]) {
        if (sides.length != 3) return;
        const sorted: number[] = sides.toSorted((a, b) => a - b);

        this.side1 = sorted[0]!;
        this.side2 = sorted[1]!;
        this.side3 = sorted[2]!;
    }

    get area(): number {
        // right triangle
        if (this.side1 ** 2 + this.side2 ** 2 == this.side3 ** 2) {
            return 0.5 * this.side1 * this.side2;    
        } 
        // isoceles
        else if (this.side1 == this.side2 || this.side2 == this.side3) {
            return (this.side2/4) * (4 * this.side1**2 - this.side2**2) ** 0.5;
        }
        // equilateral
        else if () {

        }
        // any
        else {
            const sp = (this.side1 + this.side2 + this.side3) / 2;
            return (sp * (sp - this.side1) * (sp - this.side2) * (sp - this.side3)) ** 0.5
        }
    }

    get perimeter(): number {
        return;
    }
}
