import type { IShape2D } from "./IShape2D.ts";

class Square implements IShape2D {
    private side: number;
    
    /**
     * Create a square
     * @param s length of side
     */
    constructor(s: number) {
        this.side = s;
    }

    calculateArea(): number {
        return this.side*this.side;
    }
    calculatePerimeter(): number {
        return this.side*4;
    }
}
