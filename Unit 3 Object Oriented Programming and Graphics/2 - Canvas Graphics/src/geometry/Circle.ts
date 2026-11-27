import { type Shape2D } from "../types/inc_RenderInfo2D.ts";

class Circle implements Shape2D {
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

    get area(): number {
        return Math.PI*this._radius*this._radius;
    }

    get perimeter(): number {
        return 2*Math.PI*this._radius;
    }
    
}
