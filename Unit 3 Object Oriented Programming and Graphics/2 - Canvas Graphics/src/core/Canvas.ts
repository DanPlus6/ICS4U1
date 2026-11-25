export class Canvas {
    static #inst: Canvas;
    readonly cv: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;
    readonly h: number;
    readonly w: number;

    private constructor(canvasId: string) {
        this.cv = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.cv.getContext('2d') as CanvasRenderingContext2D;

        this.h = this.cv.clientHeight;
        this.w = this.cv.clientWidth;
    }

    /**
     * static method controlling access to the singleton canvas
     */
    public static inst(canvasId?: string): Canvas {
        if (!Canvas.#inst && canvasId && canvasId.trim()) {
            Canvas.#inst = new Canvas(canvasId);
        }

        return Canvas.#inst;
    }
}
