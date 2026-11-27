/**
 * Gets a random integer within a set range
 * @param min minimum value
 * @param max maximum value
 * @returns random number
 * 
 * Precondition: min and max values are both real numbers
 * Postcondition: random integer within bounds returned 
 */
export function randomInt(min: number = 0, max: number = 10) {
    return Math.floor(Math.random() * (max-min+1)) + min;
}
