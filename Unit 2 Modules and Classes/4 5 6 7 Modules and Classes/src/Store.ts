import {Product} from './Product.js';

export class Store {
    private fullInventory = new Map<string, Product>();

    /**
     * Add a new Product object to store inventory
     * @param sku product's stock keeping unit
     * @param basePrice product's price
     * @param description product description
     * 
     * Precondition: SKU is not empty, base price is positive, description isn't empty
     */
    public addNewProduct(sku: string, basePrice: number, description: string): void {
        console.assert(sku.length > 0, "SKU should not be empty!");
        console.assert(basePrice > 0, "Base price should be a positive real number!");
        console.assert(description.length > 0, "Description should not be empty!");
        const newProduct = new Product(sku, basePrice, description);

        this.fullInventory.set(newProduct.sku, newProduct);
        console.log(`New inventory: ${this.fullInventory}`);
    }

    /**
     * Restocks a specified quantity of a product by SKU
     * @param sku product's stock keeping unit
     * @param quantity quantity to restock
     * 
     * Precondition: quantity should be positive integer
     */
    public restockProduct(sku: string, quantity: number): void {
        console.assert(sku.length > 0, "SKU should not be empty!");
        console.assert(quantity > 0, "Quantity to restock should be postivie!");

        this.fullInventory[sku] += quantity;
        console.log(`New inventory: ${this.fullInventory}`);
    }
};

