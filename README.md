### Dius Computer Shop 
Welcome to our new computer shop!

This module is to fullfill the general requirements of a computer store for Dius only. It is built with javascript (ES6) and [lerna](https://github.com/lerna/lerna) in a monorepo pattern.

### Installation

#### Run the code

```bash
$ lerna run start
```

#### Test

```bash
$ lerna run test
```

#### Features

- You can define your checkout rules.
- You can add new rules, edit the existing rules or remove any rules you don't want. It will take affect immediately!
- display() wil show your cart items and your total checkout price to pay in the console
- clear() will easily clear up items and price for you to restart shopping

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

