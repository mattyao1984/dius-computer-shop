const ProductRules = require('product-rules');
const Checkout = require('shopping-checkout');

// Test the functions and results
const checkoutRules = new ProductRules();
const myRules = checkoutRules.getRules();
const myCheckout = new Checkout(myRules);

// Scenario 1: 
myCheckout.scan('atv');
myCheckout.scan('atv');
myCheckout.scan('atv');
myCheckout.scan('vga');
myCheckout.total();
myCheckout.clear();
console.log('------------- Thanks for your shopping and have a great day! ---------------');
console.log('');

// Scenario 2: 
myCheckout.scan('atv');
myCheckout.scan('ipd');
myCheckout.scan('ipd');
myCheckout.scan('atv');
myCheckout.scan('ipd');
myCheckout.scan('ipd');
myCheckout.scan('ipd');
myCheckout.total();
myCheckout.clear();
console.log('------------- Thanks for your shopping and have a great day! ---------------');
console.log('');

// Scenario 3: 
myCheckout.scan('mbp');
myCheckout.scan('vga');
myCheckout.scan('ipd');
myCheckout.total();
myCheckout.clear();
console.log('------------- Thanks for your shopping and have a great day! ---------------');
console.log('');

// Two more test scenrios
myCheckout.scan('mbp');
myCheckout.scan('vga');
myCheckout.scan('vga');
myCheckout.scan('ipd');
myCheckout.scan('ipd');
myCheckout.scan('ipd');
myCheckout.scan('ipd');
myCheckout.scan('ipd');
myCheckout.scan('atv');
myCheckout.scan('atv');
myCheckout.scan('atv');
myCheckout.total();
myCheckout.clear();
console.log('------------- Thanks for your shopping and have a great day! ---------------');
console.log('');

// delete some rules and retest the scenario 1
checkoutRules.deleteRule('atv');
myCheckout.scan('atv');
myCheckout.scan('atv');
myCheckout.scan('atv');
myCheckout.scan('vga');
myCheckout.total();
myCheckout.clear();
console.log('------------- Thanks for your shopping and have a great day! ---------------');
console.log('');

// add some rules and retest the scenario 1
checkoutRules.addRule('iph', {
  id: 5,
  name: 'iPhone X',
  retailPrice: 1200,
  deduction: {
    minItems: 5,
    accoutableItems: 4,
  },
  discount: null,
  bundleSku: null,
});
myCheckout.scan('iph');
myCheckout.scan('iph');
myCheckout.scan('iph');
myCheckout.scan('iph');
myCheckout.scan('iph');
myCheckout.total();
myCheckout.clear();
console.log('------------- Thanks for your shopping and have a great day! ---------------');
console.log('');
