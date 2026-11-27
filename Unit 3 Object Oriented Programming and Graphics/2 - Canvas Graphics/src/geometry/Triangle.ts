import type { Shape2D } from "../types/inc_RenderInfo2D.ts";

class Triangle implements Shape2D {
    private s: number;
    private m: number;
    private l: number;

    constructor(...sides: number[]) {
        if (sides.length != 3) return;
        const sorted: number[] = sides.toSorted((a, b) => a-b);

        this.s = sorted[0]!;
        this.m = sorted[1]!;
        this.l = sorted[2]!;
    }

    get area(): number {
        // right triangle
        if (this.s**2 + this.m**2 == this.l**2) {
            return 0.5 * this.s * this.m;    
        } 
        // equilateral
        else if (this.s == this.m && this.m == this.l) {
            return (3**0.5)/4 * this.s**2;
        }
        // scalene
        else {
            const sp = (this.s + this.m + this.l) / 2;
            return (sp * (sp - this.s) * (sp - this.m) * (sp - this.l)) ** 0.5
        }
    }

    get perimeter(): number {
        return this.s+this.m+this.l;
    }
}
