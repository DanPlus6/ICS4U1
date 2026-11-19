/**
 * Interface to defines a 2D shape's functionality.
 */
export interface IShape2D {
    /** Calculates and returns the shape's area */
    calculateArea(): number;
    /** Calculates and returns the shape's perimeter */
    calculatePerimeter(): number;
}
