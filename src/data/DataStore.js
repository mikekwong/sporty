import { createStore } from "redux";
import { ShopReducer } from "./ShopReducer";
import { CartReducer } from "./CartReducer";
import { CommonReducer } from "./CommonReducer";

// Call CommonReducer to combine the reducers into single function
export const SportsStoreDataStore = createStore(
  CommonReducer(ShopReducer, CartReducer)
);
