import type { Shape2D } from "./Shape2D";

class RightTriangle implements Shape2D {
    private _height: number;
    private _width: number;

    constructor(h: number, w: number) {
        this._height = h;
        this._width = w;
    }

    get height(): number {
        return this._height;
    }

    get width(): number {
        return this._width;
    }
    
    calculateArea(): number {
        return this._height * this._width * 0.5;
    }
    calculatePerimeter(): number {
        return this._height + this._width + Math.sqrt(this._height*this._height + this._width+this._width);
    }
    
}
