import { type IShape2D } from "./IShape2D.ts";

class Circle implements IShape2D {
    private _radius: number;

    /**
     * Creates a circle
     * @param r _radius of the circle
     */
    constructor(r: number) {
        this._radius = r;
    }

    /** 
     * Gets the radius of the circle
     * @returns radius
     */
    get r(): number { return this._radius; }

    calculateArea(): number {
        return Math.PI*this._radius*this._radius;
    }

    calculatePerimeter(): number {
        return 2*Math.PI*this._radius;
    }
    
}
