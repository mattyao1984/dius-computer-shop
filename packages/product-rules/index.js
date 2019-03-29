class ProductRules {
  constructor() {
    this.rules = {
      ipd: {
        id: 1,
        name: 'Super iPad',
        retailPrice: 549.99,
        deduction: null,
        discount: {
          minItems: 4,
          price: 499.99,
        },
        bundleSku: null,
      },
      mbp: {
        id: 2,
        name: 'MacBook Pro',
        retailPrice: 1399.99,
        deduction: null,
        discount: null,
        bundleSku: null,
      },
      atv: {
        id: 3,
        name: 'Apple TV',
        retailPrice: 109.50,
        deduction: {
          minItems: 3,
          accoutableItems: 2,
        },
        discount: null,
        bundleSku: null,
      },
      vga: {
        id: 4,
        name: 'VGA adapter',
        retailPrice: 30,
        deduction: null,
        discount: null,
        bundleSku: 'mbp',
      },
    };
  }

  addRule(sku, newRule) {
    // if the sku exists, update the existing rule of the sku, 
    // if not exists, add it to the rules
    this.rules[sku] = newRule;
  }

  deleteRule(sku) {
    delete this.rules[sku];
  }
  
  getRules() {
    return this.rules;
  }
}

module.exports = ProductRules;
