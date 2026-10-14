import { Input } from './Input';
import { ToNum } from './ToNum'

/**
 * Determines if an integer b is a factor of integer a
 * precondition: b cannot be 0, also a and b must be integers
 * @param a the quotient
 * @param b the divisor that may be a factor
 * @returns postcondition: return true if a%b == 0, otherwise false
 */
export function IsFactor(a: number, b: number): boolean {
    console.assert(
        typeof a == "number" && typeof b == "number", "Input arguments",
        "Input arguments must be valid numbers!"
    );
    console.assert(b > 0, "B cannot be zero!");
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
console.log(`The second integer is ${IsFactor(a,b) ? ` ` : `not `}a factor of the first.`);
