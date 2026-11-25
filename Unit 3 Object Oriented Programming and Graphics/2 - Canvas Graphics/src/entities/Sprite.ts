export class Sprite {
    private readonly _img: HTMLImageElement;
    private _w: number;
    private _h: number;

    constructor(w: number, h: number, src: string) {
        this._w = w;
        this._h = h;
    
        this._img = new Image(w,h);
        this._img.src = src;
    }

    get h(): number { return this._h; }
    get w(): number { return this._w; }
}
