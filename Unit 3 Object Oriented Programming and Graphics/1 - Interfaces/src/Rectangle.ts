import { type IShape2D } from "./IShape2D.ts";

class Rectangle implements IShape2D {
    private length: number;
    private width: number;

    public constructor(length: number, width: number) {
        this.length = length;
        this.width = width;
    }

    calculateArea(): number {
        return this.length * this.width;
    }

    calculatePerimeter(): number {
        return (this.length + this.width) * 2;
    }
}
