'use strict';

// HTML targets
const IPT_NUM_QUES = document.getElementById('txt-num-questions');
const P_QUESTIONS = document.getElementById('p-math-questions');
const P_ANS = document.getElementById('p-math-answers');

/** 
 * returns a random integer in the given range (inclusive)
 * @param {number} min the lower bound
 * @param {number} max the upper bound
 * @returns {number} the random integer
 */
function randint(min=1,max=100) {
    // swap bounds of max < min
    if (max < min) { [min,max] = [max,min]; }

    return Math.floor(Math.random() * (max-min+1)) + min;
}

/** main callback to generate addition questions and answers based on user input and print them inside P_QUESTIONS and P_ANS respectively */
function makeAdditionQuestions() {
    P_QUESTIONS.innerHTML = '';
    P_ANS.innerHTML = '';

    // generate random addition questions and their answers and print them in the paragraph elements
    for (let i = 1; i <= Number(IPT_NUM_QUES.value); i++) {
        let r1 = randint(), r2 = randint();
        let ans = r1+r2;

        P_QUESTIONS.innerHTML += `Q${i}: ${r1} + ${r2} = \n`;
        P_ANS.innerHTML += `Q${i}: ${r1} + ${r2} = ${ans}\n`;
    }
}

