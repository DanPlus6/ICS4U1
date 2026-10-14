/** attempt to parse and convert a string to a number, returns null on failure */
export function ToNum(val: string): number|null {
    try {
        const parsed: number = Number(val);
        return Number.isNaN(parsed) ? null : parsed;
    } catch {
        return null;
    }
}
