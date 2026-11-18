import type { Shape2D } from "./Shape2D";

class Square implements Shape2D {
    private side: number;
    
    /**
     * Create a square
     * @param s length of side
     */
    constructor(s: number) {

    }

    calculateArea(): number {
        return this.side*this.side;
    }
    calculatePerimeter(): number {
        return side*4;
    }
}
