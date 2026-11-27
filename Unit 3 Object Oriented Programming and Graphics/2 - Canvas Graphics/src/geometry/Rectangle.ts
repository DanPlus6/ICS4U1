import { type Shape2D } from "../types/inc_RenderInfo2D.ts";

class Rectangle implements Shape2D {
    private length: number;
    private width: number;

    public constructor(length: number, width: number) {
        this.length = length;
        this.width = width;
    }

    get area(): number {
        return this.length * this.width;
    }

    get perimeter(): number {
        return (this.length + this.width) * 2;
    }
}
