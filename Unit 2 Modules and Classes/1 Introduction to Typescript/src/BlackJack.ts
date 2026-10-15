import { Input } from './Input';
import { ToNum } from './ToNum';

/**
 * Gets sum of two cards' values using blackjack rules
 * Pre-condition: card values must be positive integers
 * @param a first card or total value
 * @param b second card
 * @returns 
 * Post-condition: result should be positive integer less than or equal to 20
 */
export function BlackJack(a: number, b: number): number {
    console.assert(
        a > 0 && Number.isInteger(a) && b > 0 && Number.isInteger(b),
        "Numbers have to be positive integers!"
    );
    
    let res: number = a+b;
    if (res > 21) {
        if (a == 11) res = b+1;
        else if (b == 1) res = a+1;
        else res = 0;
    }

    console.assert(res >= 0 && Number.isInteger(res), "Somehow, the sum was not a positive integer!");
    console.assert(res <= 21, "Somehow, the sum was greater than 21!");
    return res;
}

const a: number = ToNum(await Input("Input value of first card or accumulated sum: "));
const b: number = ToNum(await Input("Input value of second card: "));
console.log(`Resulting sum: ${BlackJack(a,b)}`);
