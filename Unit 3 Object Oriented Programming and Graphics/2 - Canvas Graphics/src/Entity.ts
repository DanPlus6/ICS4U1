import { Point } from "./Point";

export class Entity {
    private _pos: Point;
    private _vx: number;
    private _vy: number;

    constructor(x: number, y: number) {
        this._pos = new Point(x,y);
    }

    render(ctx: CanvasRenderingContext2D): void {
        // TODO: implement rendering
    }
}
