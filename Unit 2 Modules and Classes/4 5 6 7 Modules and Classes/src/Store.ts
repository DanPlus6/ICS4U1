import { Product } from './Product';
import { Customer } from './Customer';

export class Store {
    private _fullInventory : Record<string, Product> = {};
    private _customers: Record<string,Customer> = {};

    /**
     * Add a new Product object to store inventory
     * @param sku product's stock keeping unit
     * @param basePrice product's price
     * @param description product description
     * 
     * Precondition: SKU mustn't be empty, base price must be positive, and description mustn't be empty
     */
    public addNewProduct(sku: string, basePrice: number, description: string): void {
        console.assert(sku.length > 0, "SKU should not be empty!");
        console.assert(basePrice > 0, "Base price should be a positive real number!");
        console.assert(description.length > 0, "Description should not be empty!");
        
        const newProduct = new Product(sku, basePrice, description);
        this._fullInventory[newProduct.sku] = newProduct;

        console.log(`New inventory: ${this._fullInventory}`);
    }

    /**
     * Increase a specific product's quantity
     * @param sku product's stock keeping unit
     * @param quantity quantity to restock
     * 
     * Precondition: quantity should be positive integer, SKU mustn't be empty and product
     *  with SKU must exist in inventory
     */
    public restockProduct(sku: string, quantity: number): void {
        console.assert(sku.length > 0, "SKU should not be empty!");
        console.assert(quantity > 0, "Quantity to restock should be postivie!");
        console.assert(sku in this._fullInventory, "Product of specified SKU is not present in inventory!");

        this._fullInventory[sku]?.restock(quantity);
        
        console.log(`New inventory for ${sku}: ${this._fullInventory}`);
    }

    /**
     * Adds a customer to store registry
     * @param firstName first name of customer
     * @param lastName last name of customer
     * 
     * Precondition: first and last name strings mustn't be empty
     */
    public addCustomer(firstName : string, lastName : string): void {
        console.assert(firstName.length > 0, "First name shouldn't be empty!");
        console.assert(lastName.length > 0, "Last name shouldn't be empty!");

        const newCustomer = new Customer(firstName, lastName);
        this._customers[newCustomer.customerId] = newCustomer;

        console.log(`Added new customer: ${newCustomer.printInfo()}`);
    }

    /**
     * Finds a customer by customer ID
     * @param customerId customer's ID
     * @returns the customer object if found, or null if not
     * 
     * Precondition: customer ID cannot be empty
     */
    public getCustomerById(customerId : string) : Customer | null {
        console.assert(customerId.length > 0, "Customer ID musn't be empty!");

        return this._customers[customerId] ?? null;
    }

    /**
     * Finds matching customers by their name
     * @param firstName first name of customer
     * @param lastName last name of customer
     * 
     * @returns an array of customer objects with matching names; empty if no matches
     * 
     * Precondition: first name or last name cannot be empty
     */
    public getCustomer(firstName: string, lastName: string) : Customer[] {
        let matches: Customer[] = [];
        const fName: string = firstName.trim().toLocaleLowerCase();
        const lName: string = lastName.trim().toLocaleLowerCase();

        for (const c of Object.values(this._customers)) {
            const name: string = c.printInfo().toLocaleLowerCase();
            if (name.includes(fName) || lName.includes(lName)) matches.push(c);
        }

        return matches;
    }
};

