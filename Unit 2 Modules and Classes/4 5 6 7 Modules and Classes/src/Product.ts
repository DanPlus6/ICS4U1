class Product {

    /** Track how many Product objects have been created. */
    private static productCount : number = 0;

    /** The product's description.
     * Since this property is *public*, this property can be
     * changed and be seen by any other program/programmer
     */
    private _description : string;

    /** The brand name for the product.
     * Since this property is *private*, it can only be seen and
     * used within this class and its functions/methods.
     */
    private _brand : string;

    /** The product's price */
    private _price : number;

    /** The product's original/base price before discounts */
    private _basePrice : number;

    /** Where the product came from/was made. */
    private _origin : string;

    /** The Stock Keeping Unit - the product's id */
    private _sku : string;

    /** The number of this product the store has available/in stock */
    private _quantity : number;

    /**
     * Create a new Product object.
     * @param sku The product's stock keeping unit.
     * @param basePrice The product's price.
     * @param description A product description.
     */
    constructor(sku : string, basePrice : number, description : string) {

        // increase the static product count
        Product.productCount++;
        console.log(`Current Unique Products: ${Product.productCount}`);

        this._quantity = 0;
        this._sku = sku;
        
        // this product cannot have a negative price.
        if (basePrice < 0){
            basePrice = 0;
        }

        this._price = basePrice;
        this._basePrice = basePrice;

        // put a cap on the length of the description
        // max length is 255 characters
        // the substring(0, 255) gets the first 255 characters of
        // the description
        if (description.length > 255){
            description = description.substring(0, 255);
        }
        this._description = description;
    }

    /** The product's base price. */
    public get basePrice() : number {
        return this._basePrice;
    }

    /** The product's brand. */
    public get brand() : string {
        return this._brand;
    }
    
    /** The product's description. */
    public get description() : string {
        return this._description;
    }

    public set description(newDescription : string) {

        // keep the original description's length
        const originalLength = newDescription.length;

        // replaces all bad words with empty strings so that 
        // people can't see the bad words
        newDescription = newDescription.replace(`darn`, ``);
        newDescription = newDescription.replace(`shoot`, ``);

        // if the description's length has changed, that means
        // some bad words must have been removed
        if (originalLength != newDescription.length) {
            console.log('Vulgar language censored.');
        }

        this._description = newDescription;
    }

    /** The product's place of origin. E.g., Canada, Ontario, etc. */
    public get origin() : string {
        return this._origin;
    }

    /** The product's current sell price. */
    public get price() : number {
        return this._price;
    }

    /** The quantity of this product remaining. */
    public get quantity() : number {
        return this._quantity;
    }

    /** This product's Stock Keeping Unit (SKU) */
    public get sku() : string {
        return this._sku;
    }

    /**
     * Change the product's current price for a sale/clearance 
     * @param discountAmount The dollar amount of the discount.
     */
    public changePriceByAmount(discountAmount : number) : void {
        this._price = this._basePrice - discountAmount;
    }

    /**
     * Change the product's price by a percentage amount.
     * @param discountRate A percentage (e.g., 20 for 20%) to reduce
     *  the base price by.
     */
    public changePriceByPercentage(discountRate : number) : void {
        this._price = this._basePrice * (1 - discountRate / 100);
    }

    /** Show product info in the JavaScript Console */
    public print() : void {
        console.log(`${this._sku} Quantity ${this._quantity} @ $${this._price}`);
    }

    /**
     * Increases this product's quantity.
     * @param toAdd A positive number to increase quantity.
     */
    public restock(toAdd : number) : void {

        // prevent unwanted `adds`
        if (toAdd <= 0){
            return;
        }

        this._quantity += toAdd;
    }

    public shrinkInventory(toShrink : number) : void {
        // prevent errors
        if (toShrink <= 0 || toShrink > this._quantity) {
            return;
        }

        this._quantity -= toShrink;

        console.log(`${this._sku} Quantity was shrunk by ${toShrink}`);
    }

};

export {Product};
