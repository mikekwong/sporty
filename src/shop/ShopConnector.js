import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loadData } from "../data/ActionCreators";
import { DataTypes } from "../data/Types";
import Shop from "./Shop";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../data/CartActionCreators";
import CartDetails from "./CartDetails";

const filterProducts = (products = [], category) =>
  !category || category === "All"
    ? products
    : products.filter(p => p.category.toLowerCase() === category.toLowerCase());

class ShopConnector extends Component {
  componentDidMount() {
    this.props.loadData(DataTypes.CATEGORIES);
    this.props.loadData(DataTypes.PRODUCTS);
  }

  render() {
    // https://tylermcginnis.com/react-router-pass-props-to-components/
    return (
      <Switch>
        <Route
          path="/shop/products/:category?"
          // routeProps = array of objects from api for each category [{match, location, history}]
          render={routeProps => (
            <Shop
              {...this.props}
              // {...routeProps}
              products={filterProducts(
                this.props.products,
                routeProps.match.params.category
              )}
            />
          )}
        />
        <Route
          path="/shop/cart"
          // CartDetails component receives props from the data store and the routing system
          render={routeProps => <CartDetails {...this.props} {...routeProps} />}
        />
        <Redirect to="/shop/products" />
      </Switch>
    );
  }
}

const mapStateToProps = dataStore => ({ ...dataStore });

const mapDispatchToProps = {
  loadData,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopConnector);
