// HTML targets
const TXT_PRCP: HTMLInputElement = document.getElementById('txt-principal') as HTMLInputElement;
const TXT_MTG: HTMLInputElement = document.getElementById('txt-mortgage') as HTMLInputElement;
const TXT_AMT: HTMLInputElement = document.getElementById('txt-amortization') as HTMLInputElement;
const BTN_CALC: HTMLButtonElement = document.getElementById('btn-calculate') as HTMLButtonElement;
const BTN_SCHD: HTMLButtonElement = document.getElementById('btn-schedule') as HTMLButtonElement;
const P_RES: HTMLParagraphElement = document.getElementById('p-results') as HTMLParagraphElement;

// Calculation functions
/**
 * Calculates number of months in mortgage amortization period
 * @param y number of years
 * @returns # of mortgage payments
 */
function calcNumPays(y: number): number {
    return 12*y;
}

/**
 * Calculates effective monthly interest rate for a semi-compounding mortgage
 * Pre-condition: annual mortgage rate is percentage
 * @param r annual mortgage rate as percentage
 * @returns effective monthly interest rate
 */
function calcEffMthRate(r: number) : number {
    console.assert(r >= 0 && r <= 100, "Rate should be a percentage!");
    return (1 + (r/100)/2)**12 - 1;
}

/**
 * Gets monthly payment amount for a Canadian mortgage (semi-compounding)
 * @param r annual mortgage rate
 * @param p principal
 * @param y amortization period in years
 * @returns monthly mortgage payment amount
 */
function calcEffMthPay(r: number, p: number, y: number): number {
    // pre-processing: convert into proper values for amortizaton formula
    /** number of payment in the amortization period (months) */
    let n: number = calcNumPays(y);
    /** effective monthly interest rate */
    let i: number = calcEffMthRate(n);
    
    // amortization formula
    // numerator
    let payment: number = p * i * (1 + i)**n;
    // divide by denominator
    payment /= ( (1+i)**n - 1 );

    return payment;
}

/**
 * Calculates daily interest rate for Canadian mortgage
 * @param r annual mortgage rate
 * @returns converted daily interest rate
 */
function calcDailyIntRate(r: number): number {
    return (1 + r/2)**(2/365) - 1;
}

/**
 * Calculates daily amount of interest for Canadian mortgage
 * @param r annual mortgage rate
 * @param p principal remaining
 * @returns daily interest amount
 */
function calcDailyIntAmt(r: number, p: number): number {
    return calcDailyIntRate(r)*p;
}

/**
 * Calculates monthly mortgage payments needed to fully pay of mortgage
 */
function makeAmtSchd(r: number, p: number, y: number): string {
    let amortizationSchedule : string = "";
    let totalInterest : number = 0;

    const fixedMonthlyPayment : number = calcEffMthPay(r, p, y);
    const totalPayments : number = calcNumPays(y);
    const monthlyRate: number = calcEffMthRate(r);

    for (let i : number = 1; i <= totalPayments; i++){
        let monthlyInterest : number = p * monthlyRate;
        let principalPayment : number = fixedMonthlyPayment - monthlyInterest;
        
        if (p < principalPayment || i == totalPayments) {
            principalPayment = p;
        }

        p -= principalPayment;
        totalInterest += monthlyInterest;
        
        amortizationSchedule += `Month ${i}:<br>` +
            `Principal Payment: $${principalPayment.toFixed(2)}<br>` +
            `Monthly Interest: $${monthlyInterest.toFixed(2)}<br>` +
            `Remaining Balance: $${Math.max(0, p).toFixed(2)}<br><br>`;
    }
    
    amortizationSchedule += `Total Interest Paid: $${totalInterest.toFixed(2)};\n`;

    return amortizationSchedule;
}


// Callbacks
/** Calculates final mortgage */
function btnCalc(): void {
    const principal: number = Number(TXT_PRCP.value.trim());
    const annualRate: number = Number(TXT_MTG.value.trim());
    const amortizationPeriod: number = Number(TXT_AMT.value.trim());
    const monthlyPayment: number = calcEffMthPay(annualRate,principal,amortizationPeriod);
    const dailyPayment: number = calcDailyIntAmt(annualRate, principal);
    P_RES.textContent = `<br>
    Monthly Mortgage Payment: $${monthlyPayment}\n
    Daily Mortgage Payment: $${dailyPayment}
    `;
}
BTN_CALC.addEventListener('click', btnCalc);

/** Calculates schedule of payments to pay off mortgage */
function btnAmtSchd(): void {
    const p : number = Number(TXT_PRCP.value);
    const r : number = Number(TXT_MTG.value);
    const a : number = Number(TXT_AMT.value);

    P_RES.innerHTML = makeAmtSchd(r, p, a);
}
BTN_SCHD.addEventListener('click', btnAmtSchd);
