import { Input } from './Input';
import { ToNum } from './ToNum'

/**
 * Determines if an integer b is a factor of integer a
 * pre-condition: b != 0, also a and b must be integers
 * @param a the quotient
 * @param b the divisor that may be a factor
 * @returns wehther b is a factor of a
 * post-condition: result is a boolean
 */
export function IsFactor(a: number, b: number): boolean {
    console.assert(b != 0, "B cannot be zero!");
    console.assert(
        Number.isInteger(a) && Number.isInteger(b),
        "Input numbers must be integers!"
    );

    const res: boolean = (a%b == 0);
    console.assert(typeof res == "boolean", "Somehow the return result was not a boolean!");

    return res;
}

console.log("Integer factor checker - Will check if integer B is a factor of integer A");
const a = ToNum(await Input("Input integer A: "));
const b = ToNum(await Input("Input integer B: "));
console.log(`The second integer ${IsFactor(a,b) ? `IS` : `is NOT`} a factor of the first.`);
