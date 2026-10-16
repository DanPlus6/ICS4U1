// HTML targets
const TXT_PRCP: HTMLInputElement = document.getElementById('txt-principal') as HTMLInputElement;
const TXT_MTG: HTMLInputElement = document.getElementById('txt-mortgage') as HTMLInputElement;
const TXT_AMT: HTMLInputElement = document.getElementById('txt-amortization') as HTMLInputElement;
const BTN_CALC: HTMLButtonElement = document.getElementById('btn-calculate') as HTMLButtonElement;
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

// Callbacks
/** Calculates final mortgage */
function btnCalc(e: Event): void {
    const principal: number = Number(TXT_PRCP.value.trim());
    const mortgageRate: number = Number(TXT_MTG.value.trim());
    const amortizationPeriod: number = Number(TXT_AMT.value.trim());
    const res: number = calcEffMthPay(mortgageRate,principal,amortizationPeriod);
    P_RES.innerHTML = `Monthly Mortgage Payment: $${res}`;
}
BTN_CALC.addEventListener('click', btnCalc);


