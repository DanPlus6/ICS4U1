'use strict';

// targets to HTML elements
const P_ANSWER = document.getElementById('p-answer');
const TXT_QUESTION = document.getElementById('txt-question');

/** bank of answers to choose from for the 8ball */
const ANSWERS = [
    "Yes", "No", "The future is uncertain", "Definitely maybe", "No way Jose",
    "Ask again later", "For certain", "Not a snowball’s chance", "?"
]

/** give the user an answer if they ask the magic 8-ball */
function askQuestion() {
    if (TXT_QUESTION.value != '') P_ANSWER.textContent = ANSWERS[Math.floor(Math.random()*ANSWERS.length)];
    else P_ANSWER.textContent = 'You must ask me a question first!';
}

TXT_QUESTION.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') askQuestion();
});

