import type { Shape2D } from "./Shape2D";

class Square implements Shape2D {
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
