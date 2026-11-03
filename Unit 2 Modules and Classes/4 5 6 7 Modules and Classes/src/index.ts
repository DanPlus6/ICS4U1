import {Product} from './Product.js';

let apple : Product = new Product(`123456789`, 100, `A really big apple.`);
let orange : Product = new Product(`987654321`, 50, `A medium sized orange.`);

// Same as apple.quantity = apple.quantity + 10
// apple.quantity += 10; can't do because private
apple.restock(10); // increases quantity by 10
apple.restock(-100); // error code prevents this from working

apple.changePriceByPercentage(25);
apple.print();

orange.description = `An Ontario orange.`;
orange.changePriceByAmount(10);
console.log(`Orange's price is ${orange.price}`);
console.log(`Orange's description is ${orange.description}`);
orange.description = 'shoot this is a darn sweet orange yo!';
console.log(`Orange's description is ${orange.description}`);
orange.print();
