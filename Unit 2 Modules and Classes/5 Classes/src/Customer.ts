export class Customer {
    private firstName: string = '';
    private lastName: string = '';
    private readonly customerId: string = '';

    /**
     * Create shop customer object using their name
     * @param firstName first name
     * @param lastName second name
     */
    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.customerId = '';
        for (let i=20; i--;) {
            this.customerId += String(Math.floor(Math.random() * 10));
        }
    }

    /**
     * Change name of the customer
     * @param firstName new first name
     * @param lastName new last name
     */
    public changeName(firstName: string, lastName: string): void {
        console.assert(this.chkString(firstName), "New customer first name is an invalid string!");
        console.assert(this.chkString(lastName), "New customer last name is an invalid string!");
        
        this.firstName = firstName;
        this.lastName = lastName;

        console.assert(this.chkString(this.firstName), "Customer first name was changed to an invalid string!");
        console.assert(this.chkString(this.lastName), "Customer last name was changed to an invalid string!");
    }

    /**
     * Gets the customer's name
     * @returns first name and last name separated by a space
     */
    public printInfo(): string {
        console.assert(this.chkString(this.firstName), "Customer first name is an invalid string!");
        console.assert(this.chkString(this.lastName), "Customer last name is an invalid string!");

        return `${this.firstName} ${this.lastName}`;
    }

    /**
     * Checks if a string is valid and non-empty
     * @param s string to check
     * @returns whether string is valid
     */
    private chkString(s: string): boolean {
        return typeof s === "string" && s.length > 0;
    }
}
