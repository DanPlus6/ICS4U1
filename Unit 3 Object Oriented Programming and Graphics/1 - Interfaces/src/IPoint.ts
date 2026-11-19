export interface IPoint {
    x: number;
    y: number;

    /** Calculates distance from this point to another point */
    distanceTo(p2: IPoint): number;

    /** Changes position of this point */
    move(nx: number, ny: number): void;
}
