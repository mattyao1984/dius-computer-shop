### Dius Computer Shop 
Welcome to our new computer shop!

This module is to fullfill the general requirements of a computer store for Dius only. It is built with javascript (ES6) and [lerna](https://github.com/lerna/lerna) in a monorepo pattern.

### Installation

1. Install lerna CLI 
```bash
$ npm i -g lerna
```
2. Link the dependencies. Go to the root directory and run
```bash
$ lerna bootstrap
```

#### Run the code

```bash
$ lerna run start
```

Alternatively, you can manually go to /packages/shopping-app and run test in the traditional way:
```bash
$ npm start
```

#### Test

```bash
$ lerna run test
```

if you want to target a single module to test, simply run 
```bash
$ lerna run test --scope=product-rules
```

Alternatively, you can manually go to each module and run test in the traditional way:
```bash
$ npm run test
```

#### Features

- You can define your checkout rules.
- You can add new rules, edit the existing rules or remove any rules you don't want. It will take affect immediately!
- display() wil show your cart items and your total checkout price to pay in the console
- clear() will easily clear up items and price for you to restart shopping

### Adding new pricing rules

Please check the table to follow the format of the single unit price rule, if you want to add new ones:

| attrNam | defaultValue | isRequired | description |
|----------|----------|--------------|----------------|
| id | null | true | The id of the product |
| name | null | true | The name of the product |
| retailPrice | 0.00 | true | The original price of the product |
| deduction | null | false | The deduction of the product. It has two fields: minItems - the minimum requirements of the number of products you need to buy to receive the price deduction. accoutableItems - how many items will be charged when minItems value is achieved. For example, buy 3 for 2 will be formatted in this way deduction: { minItems: 3, accoutableItems: 2} |
| discount | null | false | The discounted price of the product. It has two fields: minItems - the minimum requirements of the number of products you need to buy to receive the discounted price. For example, buy 4 you get discounted price $99, will be formatted in this way discount: { minItems: 4, price: 99.00} |
| bundleSku | null | false | When this field is set to a valid sku, and the product with the sku is in your cart, this product is free |

#### Allowed Pricing Rules

In this module, it supports three addtional modes for your customers to enjoy the discounted price:
- If you purchase more than X items, you will get a discounted price
- If you purchase more than X items, you only need to pay Y items (less than X)
- If you meet the bundle requirements, you get the free item

### More thoughts

There are more complicated scenarios to be considered that is not supported in v1.0.0 yet:
- Multiple options of bundle, for example item A can either bundle with B or C. For now, it is only allowing one option.
- Multiple deduction options, for example item A can have "3 for 2" and "2 for 1" at the same time.
- Multiple discount options, for example item A can have "More than 5, you got X price" and "More than 10, you got Y price" at the same time.

