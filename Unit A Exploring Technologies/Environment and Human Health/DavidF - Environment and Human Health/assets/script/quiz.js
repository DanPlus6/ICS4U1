'use strict';

// Declare const html targets
const NAV_BAR = document.querySelector('.nav-bar');
const INFO_CONT = document.querySelector('.info-container');
const QUIZ_CONT = document.getElementById('quiz-container');
const QUIZ_FAB = document.getElementById('quiz-fab');
const QUIZ_SUBMIT = document.getElementById('quiz-submit');
const QUIZ_SCORE = document.getElementById('quiz-score');
const QUIZ_CLOSE = document.getElementById('quiz-close');
const SCORE_TEXT = document.getElementById('score-text');

// Declare gambling variables 🤑
let chips = 0;
let gamblingActive = true;


/** Quiz time baby! Opens the quiz: greys menu, disables quiz fab, hides info, shows quiz */
function openQuiz() {
    // Greys menu, disables quiz fab, hides info
    NAV_BAR.classList.add('greyed');
    QUIZ_FAB.classList.add('disabled');
    INFO_CONT.style.display = 'none';

    // Reset quiz state
    resetQuiz();

    // Shows quiz
    QUIZ_CONT.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Closes the quiz and restores the normal view */
function closeQuiz() {
    QUIZ_CONT.classList.remove('active');
    NAV_BAR.classList.remove('greyed');
    QUIZ_FAB.classList.remove('disabled');
    INFO_CONT.style.display = '';
}

/** Resets all question selections and hides score */
function resetQuiz() {
    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
    });

    /** Re-attach option clicking listeners */
    document.querySelectorAll('.quiz-question-block').forEach(block => {
        const options = block.querySelectorAll('.quiz-option');
        options.forEach((btn, idx) => {
            btn.onclick = () => selectOption(block, idx);
        });
        delete block.dataset.selected;
    });

    // close and hide the quiz
    QUIZ_SCORE.classList.remove('active');
    QUIZ_CLOSE.style.display = 'none';
    QUIZ_SUBMIT.style.display = '';
    SCORE_TEXT.textContent = '';

    // Hide and reset gambling section
    document.getElementById('gamble-section').classList.remove('active');
    chips = 0;
    gamblingActive = true;
}

/** Handles selecting an answer for a question block */
function selectOption(block, selectedIdx) {
    /** const refs for each option of current block */
    const options = block.querySelectorAll('.quiz-option');

    /** Clear previous selection styling for this question */
    options.forEach(btn => btn.classList.remove('correct', 'wrong'));

    // Mark selection
    options[selectedIdx].style.outline = '';
    block.dataset.selected = selectedIdx;

    // Indicate selected answers
    options.forEach((btn, i) => {
        btn.style.backgroundColor = '';
        btn.style.color = '';
    });
    options[selectedIdx].style.backgroundColor = 'rgba(94, 95, 100, 1)';
    options[selectedIdx].style.color = 'white';
}

/** Submit the quiz, grade answers and show score */
function submitQuiz() {
    const blocks = document.querySelectorAll('.quiz-question-block');
    let score = 0;

    blocks.forEach(block => {
        const correct = Number(block.dataset.answer);
        const selected = block.dataset.selected !== undefined ? Number(block.dataset.selected) : null;
        const options = block.querySelectorAll('.quiz-option');

        // Reset inline styles set during selection
        options.forEach(btn => {
            btn.style.backgroundColor = '';
            btn.style.color = '';
            btn.disabled = true;
        });

        // grade answer
        if (selected === null) {
            // edge case: no answer selected --> just reveal correct
            options[correct].classList.add('correct');
        } else if (selected === correct) {
            options[correct].classList.add('correct');
            score++;
        } else {
            options[selected].classList.add('wrong');
            options[correct].classList.add('correct');
        }
    });

    // Show final score and close quiz button
    const total = blocks.length;
    SCORE_TEXT.textContent = `You scored ${score} / ${total}`;
    QUIZ_SUBMIT.style.display = 'none';
    QUIZ_SCORE.classList.add('active');
    QUIZ_CLOSE.style.display = 'block';

    // Init gambling with quiz score as starting chips
    initGamble(score);
}


/** 
 * Initialize gambling section
 * @param {number} startingChips starting number of chips
*/
function initGamble(startingChips) {
    chips = startingChips;
    gamblingActive = true;

    /** const target to user bet input */
    const betInput = document.getElementById('bet-input');

    document.getElementById('gamble-section').classList.add('active');
    betInput.max = chips;
    betInput.value = 1;

    updateGambleUI(null, null, null);
}

/**
 * Executes a round of gambling
 * @param {string} choice - 'high' (roll 4-6) or 'low' (roll 1-3)
 */
function gamble(choice) {
    if (!gamblingActive) return;

    const betInput = document.getElementById('bet-input');
    const bet = Number(betInput.value);

    // validate bet; catch edge case
    if (bet <= 0 || bet > chips || isNaN(bet)) {
        document.getElementById('gamble-result').textContent = 'Invalid bet. Enter a value between 1 and your chip count.';
        return;
    }

    /** Roll dice in range [1,6] */
    const roll = Math.floor(Math.random() * 6) + 1;

    /** Win condition
    * High wins if choice === 'high' AND roll >= 4
    * Low  wins if choice === 'low'  AND roll <= 3
    */
    const won = (choice === 'high' && roll >= 4) || (choice === 'low' && roll <= 3);

    // add or subtract chips
    if (won) {
        chips = chips + bet;
    } else {
        chips = chips - bet;
    }

    // Bust condition--not won and no chips left
    const bust = !won && chips === 0;

    updateGambleUI(roll, won, bust);

    // Lock gambling upon bust
    if (bust) gamblingActive = false;

    // Clamp bet input to new chip count using comparison
    const newBetInput = document.getElementById('bet-input');
    newBetInput.max = chips;
    if (Number(newBetInput.value) > chips) newBetInput.value = chips;
}

/**
 * Updates all gambling UI elements
 * @param {number|null} roll  - Dice result (null on init)
 * @param {boolean|null} won  - Whether player won (null on init)
 * @param {boolean|null} bust - Whether player went bust (null on init)
 */
function updateGambleUI(roll, won, bust) {
    const chipDisplay = document.getElementById('chip-count');
    const resultText  = document.getElementById('gamble-result');
    const highBtn     = document.getElementById('btn-high');
    const lowBtn      = document.getElementById('btn-low');
    const cashoutBtn  = document.getElementById('btn-cashout');
    const betInput    = document.getElementById('bet-input');

    chipDisplay.textContent = `Chips: ${chips}`;

    // initial state, no results yet
    if (roll === null) {
        resultText.textContent = 'Place your bet and pick High (4-6) or Low (1-3)!';
        return;
    }

    if (bust) {
        // chips === 0: bust
        resultText.textContent = `Rolled ${roll}. You lost everything 💀`;
        resultText.style.color = 'rgba(192, 57, 43, 1)';
        highBtn.disabled    = true;
        lowBtn.disabled     = true;
        betInput.disabled   = true;
        cashoutBtn.disabled = false;
        return;
    }

    // Display win or loss result
    if (won) {
        resultText.textContent = `Rolled ${roll}. You won!`;
        resultText.style.color = 'rgba(39, 174, 96, 1)';
    } else {
        resultText.textContent = `Rolled ${roll}. You lost.`;
        resultText.style.color = 'rgba(192, 57, 43, 1)';
    }

    // Re-enable buttons if chips > 0 (comparison operator)
    const canPlay = chips > 0;
    highBtn.disabled  = !canPlay;
    lowBtn.disabled   = !canPlay;
    betInput.disabled = !canPlay;
}

/** Cash out: ends gambling and shows final chip tally */
function cashOut() {
    gamblingActive = false;

    const resultText = document.getElementById('gamble-result');
    const highBtn    = document.getElementById('btn-high');
    const lowBtn     = document.getElementById('btn-low');
    const betInput   = document.getElementById('bet-input');
    const cashoutBtn = document.getElementById('btn-cashout');

    // Arithmetic: percentage of chips vs starting amount, using parentheses for order of operations
    const maxChips = document.querySelectorAll('.quiz-question-block').length;
    const percentage = Math.round((chips / maxChips) * 100);

    // Boolean AND: chips > 0 AND percentage >= 100 means they profited
    if (chips > 0 && percentage >= 100) {
        resultText.textContent = `Cashed out with ${chips} chips (${percentage}% of starting). You came out ahead! 🏆`;
    } else if (chips > 0 && percentage < 100) {
        // Comparison: percentage < 100 means a net loss but not bust
        resultText.textContent = `Cashed out with ${chips} chips (${percentage}% of starting). Could've been worse. 😅`;
    } else {
        // chips === 0
        resultText.textContent = `Bust. You leave with nothing. 💀`;
    }

    resultText.style.color = 'rgba(35, 35, 43, 1)';

    // Disable all gambling controls
    highBtn.disabled    = true;
    lowBtn.disabled     = true;
    betInput.disabled   = true;
    cashoutBtn.disabled = true;
}
