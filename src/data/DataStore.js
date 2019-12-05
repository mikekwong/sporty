import { createStore, applyMiddleware } from "redux";
import { ShopReducer } from "./ShopReducer";
import { CartReducer } from "./CartReducer";
import { CommonReducer } from "./CommonReducer";
import { asyncActions } from "./AsyncMiddleware";

// Call CommonReducer to combine the reducers into single function
// The applyMiddleware is used to wrap the middleware so that it receives the actions, and the result is passed as an argument to the createStore function that creates the data store. The effect is that the async Actions function will be able to inspect all of the actions sent to the data store and seamlessly deal with those with a Promise payload.
export const SportyDataStore = createStore(
  CommonReducer(ShopReducer, CartReducer),
  applyMiddleware(asyncActions)
);
