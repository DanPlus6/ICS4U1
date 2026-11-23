export class Canvas {
    static #inst: Canvas;
    readonly canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D;

    private constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
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
