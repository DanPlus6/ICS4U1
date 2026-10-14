/** 
 * attempt to parse and convert a string to a number, returns null on failure
 * @param val the string representation of a number
 * @returns the parsed number
 */
export function ToNum(val: string): number {
    const emsg: string = "Conversion string must represent a number!";
    try {
        const parsed: number = Number(val);
        if (!Number.isNaN(parsed)) return parsed;
        else throw new Error(emsg);
    } catch {
        throw new Error(emsg)
    }
}
