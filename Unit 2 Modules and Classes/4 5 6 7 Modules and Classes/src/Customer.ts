class Customer {
    private firstName : string = ``;
    private lastName : string = ``;
    private customerId : string = ``;

    public constructor(firstName : string, lastName : string) {
        this.lastName = lastName;
        this.firstName = firstName;

        for ( let i = 0; i < 20; i++){
            this.customerId += Math.floor(Math.random() * 10);
        }
    }

    public changeName(firstName : string, lastName : string){
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public printInfo() : string {
        return `${this.firstName} ${this.lastName}`;
    }
}
