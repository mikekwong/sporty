import { DataTypes } from "./Types";

// These are the URLs for the deploy production build

const protocol = "https";
const hostname = "sportys.herokuapp.com";
// const port = 3500;

export const RestUrls = {
  [DataTypes.PRODUCTS]: `${protocol}://${hostname}/api/products`,
  [DataTypes.CATEGORIES]: `${protocol}://${hostname}/api/categories`,
  // Url to place orders
  [DataTypes.ORDERS]: `${protocol}://${hostname}/api/orders`
};

// URL that will be used to communicate with the GraphQL server,
export const GraphQlUrl = `${protocol}://${hostname}/graphql`;

// Uncomment below for development build

// const protocol = "http";
// const hostname = "localhost";
// const port = 3500;

// export const RestUrls = {
//   [DataTypes.PRODUCTS]: `${protocol}://${hostname}:${port}/api/products`,
//   [DataTypes.CATEGORIES]: `${protocol}://${hostname}:${port}/api/categories`,
//   // Url to place orders
//   [DataTypes.ORDERS]: `${protocol}://${hostname}:${port}/api/orders`
// };

// // URL that will be used to communicate with the GraphQL server,
// export const GraphQlUrl = `${protocol}://${hostname}:${port}/graphql`;
