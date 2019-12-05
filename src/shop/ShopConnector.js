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
import DataGetter from "../data/DataGetter";

// const filterProducts = (products = [], category) =>
//   !category || category === "All"
//     ? products
//     : products.filter(p => p.category.toLowerCase() === category.toLowerCase());

class ShopConnector extends Component {
  componentDidMount() {
    this.props.loadData(DataTypes.CATEGORIES);
    // this.props.loadData(DataTypes.PRODUCTS);
  }

  render() {
    // https://tylermcginnis.com/react-router-pass-props-to-components/
    return (
      <Switch>
        <Redirect
          // This redirection ensures that there is always category and page values to work with.
          from="/shop/products/:category"
          to="/shop/products/:category/1"
          exact={true}
        />

        <Route
          path={"/shop/products/:category/:page"}
          // routeProps = array of objects from api for each category [{match, location, history}]
          render={routeProps => (
            <DataGetter {...this.props} {...routeProps}>
              <Shop {...this.props} {...routeProps} />
            </DataGetter>
          )}
        />
        <Route
          path="/shop/cart"
          // CartDetails component receives props from the data store and the routing system
          render={routeProps => <CartDetails {...this.props} {...routeProps} />}
        />
        {/* Redirect matches any other URLs and redirects them to the URL for the first page of the products, unfiltered by category. */}
        <Redirect to="/shop/products/all/1" />
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
