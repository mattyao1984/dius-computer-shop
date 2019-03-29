const ProductRules = require('product-rules');

describe('Test spec - ProductRules class', () => {
  test('Initial product rules should exist', () => {
    const checkoutRules = new ProductRules();
    const myRules = checkoutRules.getRules();
    expect(myRules.ipd).toBeDefined();
    expect(myRules.vga).toBeDefined();
    expect(myRules.mbp).toBeDefined();
    expect(myRules.atv).toBeDefined();
  });

  test('addRule() should add new rule to the existing ones', () => {
    const checkoutRules = new ProductRules();
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
    const myRules = checkoutRules.getRules();
    expect(myRules.iph).toBeDefined();
  });

  test('addRule() can also update the existing rule', () => {
    const checkoutRules = new ProductRules();
    checkoutRules.addRule('ipd', {
      id: 1,
      name: 'Super iPad',
      retailPrice: 999.99,
      deduction: null,
      discount: null,
      bundleSku: null,
    });
    const myRules = checkoutRules.getRules();
    expect(myRules.ipd.retailPrice).toBe(999.99);
    expect(myRules.ipd.discount).toBe(null);
  });

  test('deleteRule() should delete the exisiting rule', () => {
    const checkoutRules = new ProductRules();
    checkoutRules.deleteRule('vga');
    const myRules = checkoutRules.getRules();
    expect(myRules.vga).not.toBeDefined();
  });
});

