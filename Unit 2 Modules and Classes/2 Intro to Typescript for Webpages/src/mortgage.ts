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
 * @param y amortization period in months
 */
function calcEffMthPays(r: number, p: number, y: number): number {
    // pre-processing: convert into proper values for amortizaton formula
    /**
     * number of payment in the amortization period, for Canadian
     * mortgages with semi-compounding interest this is just # of months
     */
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

