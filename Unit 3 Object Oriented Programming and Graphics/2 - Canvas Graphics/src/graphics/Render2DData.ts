/**
 * Interface to defines a 2D shape's functionality.
 */
export interface Shape2D {
    /** Calculates and returns the shape's area */
    get area(): number;
    /** Calculates and returns the shape's perimeter */
    get perimeter(): number;
}
