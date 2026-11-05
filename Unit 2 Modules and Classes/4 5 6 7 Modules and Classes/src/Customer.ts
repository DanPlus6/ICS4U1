export class Customer {
    private _firstName : string = ``;
    private _lastName : string = ``;
    private _customerId : string = ``;

    public constructor(firstName : string, lastName : string) {
        this._lastName = lastName;
        this._firstName = firstName;

        for ( let i = 0; i < 20; i++) {
            this._customerId += Math.floor(Math.random() * 10);
        }
    }

    public changeName(firstName : string, lastName : string){
        this._firstName = firstName;
        this._lastName = lastName;
    }

    public printInfo() : string {
        return `${this._firstName} ${this._lastName}`;
    }

    public get customerId() : string {
        return this._customerId;
    }
};
