const faker = require("faker");
faker.seed(100);
let categories = ["Watersports", "Soccer", "Chess"];
let products = [];
for (let i = 1; i <= 503; i++) {
  let category = faker.helpers.randomize(categories);
  products.push({
    id: i,
    name: faker.commerce.productName(),
    category: category,
    description: `${category}: ${faker.lorem.sentence(3)}`,
    price: Number(faker.commerce.price()),
  });
}

// generate a number of fake orders so there is data to work with
let orders = [];
for (let i = 1; i <= 103; i++) {
  let fname = faker.name.firstName();
  let sname = faker.name.lastName();
  let order = {
    id: i,
    name: `${fname} ${sname}`,
    email: faker.internet.email(fname, sname),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    zip: faker.address.zipCode(),
    country: faker.address.country(),
    shipped: faker.random.boolean(),
    products: [],
  };
  let productCount = faker.random.number({ min: 1, max: 5 });
  let product_ids = [];
  while (product_ids.length < productCount) {
    let candidateId = faker.random.number({ min: 1, max: products.length });
    if (product_ids.indexOf(candidateId) === -1) {
      product_ids.push(candidateId);
    }
  }
  for (let j = 0; j < productCount; j++) {
    order.products.push({
      quantity: faker.random.number({ min: 1, max: 10 }),
      product_id: product_ids[j],
    });
  }
  orders.push(order);
}

module.exports = () => ({ categories, products, orders });

// module.exports = () => {
//   return {
//     categories: categories,
//     products: data,
//     orders: [],
//   };
// };

// module.exports = function () {
//   return {
//     categories: ['Watersports', 'Soccer', 'Chess'],
//     products: [
//       {
//         id: 1,
//         name: 'Kayak',
//         category: 'Watersports',
//         description: 'A boat for one person',
//         price: 275
//       },
//       {
//         id: 2,
//         name: 'Lifejacket',
//         category: 'Watersports',
//         description: 'Protective and fashionable',
//         price: 48.95
//       },
//       {
//         id: 3,
//         name: 'Soccer Ball',
//         category: 'Soccer',
//         description: 'FIFA-approved size and weight',
//         price: 19.5
//       },
//       {
//         id: 4,
//         name: 'Corner Flags',
//         category: 'Soccer',
//         description: 'Give your playing field a professional touch',
//         price: 34.95
//       },
//       {
//         id: 5,
//         name: 'Stadium',
//         category: 'Soccer',
//         description: 'Flat-packed 35,000-seat stadium',
//         price: 79500
//       },
//       {
//         id: 6,
//         name: 'Thinking Cap',
//         category: 'Chess',
//         description: 'Improve brain efficiency by 75%',
//         price: 16
//       },
//       {
//         id: 7,
//         name: 'Unsteady Chair',
//         category: 'Chess',
//         description: 'Secretly give your opponent a disadvantage',
//         price: 29.95
//       },
//       {
//         id: 8,
//         name: 'Human Chess Board',
//         category: 'Chess',
//         description: 'A fun game for the family',
//         price: 75
//       },
//       {
//         id: 9,
//         name: 'Bling Bling King',
//         category: 'Chess',
//         description: 'Gold-plated, diamond-studded King',
//         price: 1200
//       }
//     ],
//     orders: []
//   }
// }
