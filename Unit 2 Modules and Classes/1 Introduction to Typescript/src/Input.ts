import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

export async function Input(prompt : string) {
    const rl = readline.createInterface({ input: stdin, output: stdout });

    const res = await rl.question(prompt);
    rl.close();
    return res;
}
