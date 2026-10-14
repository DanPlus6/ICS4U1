/** 
 * attempt to parse and convert a string to a number, returns null on failure
 * pre and post condition: string must be parseable into a number
 * @param val the string representation of a number
 * @returns the parsed number
 */
export function ToNum(val: string): number {
    try {
        const parsed: number = Number(val);
        
        console.assert(!Number.isNaN(parsed), "Conversion string must represent a number!");
        return parsed;
    } catch {
        throw new Error("An unexpected error occured!");
    }
}
