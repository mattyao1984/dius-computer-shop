class ShoppingCheckout {
  constructor (priceRules) {
    this.priceRules = priceRules;
    this.myCart = new Map([]);
    this.totalPrice = 0;
    this.consoleError = null;
  }

  scan(item) {
    if (this.priceRules[item]) {
      if (!this.myCart.has(item)) {
        this.myCart.set(item, 1);
      } else {
        const count = this.myCart.get(item);
        this.myCart.set(item, count + 1);
      }
    } else {
      this.consoleError = 'Sorry, this product: ' + item + ' information is not in our system.';
      console.log(this.consoleError);
    }
  }

  clear() {
    this.myCart = new Map([]);
    this.totalPrice = 0;
    this.consoleError = null;
  }

  displayResult() {
    console.log('My Cart: ', this.myCart);
    console.log('Total Price: ', this.totalPrice);
  }

  total() {
    for (const [productSku, count] of this.myCart) {
      // 1. Free bundle will override any discount or price deduction
      // 2. Item with discount price will override its original retail price
      // 3. Item with deductions when certain number of items are meet
      // 4. None of the above is applied to the item, use the original retail price
      if (this.priceRules[productSku].bundleSku && this.priceRules[productSku].bundleSku !== null) {
        const targeSkuItems= this.myCart.get(this.priceRules[productSku].bundleSku) || 0;
        const validBundles = Math.min(targeSkuItems, count);
        this.totalPrice += (count - validBundles) * this.priceRules[productSku].retailPrice;
      } else if (this.priceRules[productSku].discount && this.priceRules[productSku].discount !== null && count >= this.priceRules[productSku].discount.minItems) {
        this.totalPrice += count * this.priceRules[productSku].discount.price;
      } else if (this.priceRules[productSku].deduction && this.priceRules[productSku].deduction !== null && count >= this.priceRules[productSku].deduction.minItems) {
        const validDectionSets = count / this.priceRules[productSku].deduction.minItems; 
        const deductionSetsPrice = validDectionSets * this.priceRules[productSku].deduction.accoutableItems * this.priceRules[productSku].retailPrice;
        const normalSetsPrice = (count - validDectionSets * this.priceRules[productSku].deduction.minItems) * this.priceRules[productSku].retailPrice;

        this.totalPrice += deductionSetsPrice + normalSetsPrice;
      } else {
        this.totalPrice += this.priceRules[productSku].retailPrice * count;
      }
    }

    this.totalPrice = this.totalPrice.toFixed(2);

    // Display the result
    this.displayResult();

    return this.totalPrice;
  }
}

module.exports = ShoppingCheckout;
