import { Input } from './Input';
import { ToNum } from './ToNum'

export function FeetToCm(feet: number): number {
    return feet*30.48;
}

const feet: number|null = ToNum(await Input("Input number of feet: "));
if (typeof feet == "number") {
    console.log(`Feet converted to cm: ${FeetToCm(feet)}`);
} else {
    console.log("Input must be a valid number!")
}
