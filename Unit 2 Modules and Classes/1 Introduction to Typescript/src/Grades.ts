import { Input } from './Input';
import { ToNum } from './ToNum';

/**
 * Gets letter grade based on numeric 0 to 100 score
 * pre-condition: grade is 0 to 100
 * @param g the grade
 * @returns letter grade based on numeric score
 * post-condition: result must be string
 */
export function Grades(g: number): string {
    console.assert(g >= 0 && g <= 100, "Grade must be within a valid");
    g %= 101;

    let res: string = "";
    if (g == 100) res = "A+";
    else if (g <= 59) res = "F";
    else if (g <= 69) res = "D";
    else if (g <= 79) res = "C";
    else if (g <= 89) res = "B";
    else if (g <= 99) res = "A";

    if (res in ["A","B","C","D"]) {
        const suffix: number = g%10;
        if (suffix >= 0 && suffix <= 2) res += '-';
        else if (suffix >= 7 && suffix <= 9) res += '+';
    }

    console.assert(typeof res == 'string', "Somehow the return value is not a string!");
    return res;
}

const grade: number = ToNum(await Input("Student's grade: "));
console.log(`The student got a ${Grades(grade)}!`);
