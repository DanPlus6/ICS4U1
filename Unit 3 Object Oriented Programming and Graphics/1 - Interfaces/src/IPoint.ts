export interface IPoint {
    x: number;
    y: number;

    /** Calculates distance from this point to another point */
    getDistTo(p2: IPoint): number;

    /** Changes position of this point */
    move(): void;
}
