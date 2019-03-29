const Checkout = require('shopping-checkout');
const ProductRules = require('../../product-rules');

describe('Test spec - ShoppingCheckout class', () => {
  test('Initial values should be set correctly', () => {
    const checkoutRules = new ProductRules();
    const myRules = checkoutRules.getRules();
    const myCheckout = new Checkout(myRules);

    expect(myCheckout.priceRules).toBe(myRules);
    expect(myCheckout.myCart.keys.length).toBe(0);
    expect(myCheckout.totalPrice).toBe(0);
    expect(myCheckout.consoleError).toBe(null);
  });

  test('scan() - should add a new item into the cart', () => {
    const checkoutRules = new ProductRules();
    const myRules = checkoutRules.getRules();
    const myCheckout = new Checkout(myRules);

    myCheckout.scan('vga');
    expect(myCheckout.myCart.get('vga')).toBe(1);
    myCheckout.scan('vga');
    expect(myCheckout.myCart.get('vga')).toBe(2);
    myCheckout.scan('mbp');
    expect(myCheckout.myCart.get('mbp')).toBe(1);
  });

  test('scan() - should output a message if the item is not in the current priceRule', () => {
    const checkoutRules = new ProductRules();
    const myRules = checkoutRules.getRules();
    const myCheckout = new Checkout(myRules);

    myCheckout.scan('abc');
    expect(myCheckout.consoleError).toBe('Sorry, this product: abc information is not in our system.');
  });

  test('clear() - should reset myCart, totalPrice and consoleError', () => {
    const checkoutRules = new ProductRules();
    const myRules = checkoutRules.getRules();
    const myCheckout = new Checkout(myRules);

    myCheckout.scan('vga');
    myCheckout.scan('vga');
    myCheckout.scan('vga');
    myCheckout.scan('abc');
    myCheckout.clear();

    expect(myCheckout.myCart.keys.length).toBe(0);
    expect(myCheckout.totalPrice).toBe(0);
    expect(myCheckout.consoleError).toBe(null);
  });

  describe('total() - calculate the total price of the cart', () => {
    let checkoutRules = null;
    let myRules = null;
    let myCheckout = null;

    beforeEach(() => {
      checkoutRules = new ProductRules();
      myRules = checkoutRules.getRules();
      myCheckout = new Checkout(myRules);
    });

    test('it should calculate the items with discounts', () => {
      myCheckout.scan('atv');
      myCheckout.scan('ipd');
      myCheckout.scan('ipd');
      myCheckout.scan('atv');
      myCheckout.scan('ipd');
      myCheckout.scan('ipd');
      myCheckout.scan('ipd');
      expect(myCheckout.total()).toBe('2718.95');
    });

    test('it should calculate the bulk buy items price with correct deductions', () => {
      myCheckout.scan('atv');
      myCheckout.scan('atv');
      myCheckout.scan('atv');
      myCheckout.scan('vga');
      expect(myCheckout.total()).toBe('249.00');
    });

    test('it should calculate the item price correctly when it is eligible for a free bundle', () => {
      myCheckout.scan('mbp');
      myCheckout.scan('vga');
      myCheckout.scan('ipd');
      expect(myCheckout.total()).toBe('1949.98');
    });

    test('when calling total(), displayResult() should also be called', () => {
      myCheckout.displayResult = jest.fn(() => {});
      myCheckout.total();
      expect(myCheckout.displayResult).toHaveBeenCalled();
    });

    test('when some eixsiting priceRules are deleted, the new totalPrice should be calculated correctly', () => {
      checkoutRules.deleteRule('atv');
      myCheckout.scan('atv');
      myCheckout.scan('atv');
      myCheckout.scan('atv');
      myCheckout.scan('vga');
      expect(myCheckout.total()).toBe('30.00');
    });

    test('when adding new price rule, the new totalPrice should be calculated correctly', () => {
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
      myCheckout.scan('vga');
      myCheckout.scan('vga');
      expect(myCheckout.total()).toBe('4860.00');
    });
  });
});
