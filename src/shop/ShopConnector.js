import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as ShopActions from "../data/ActionCreators";
import { DataTypes } from "../data/Types";
import Shop from "./Shop";
import * as CartActions from "../data/CartActionCreators";
import CartDetails from "./CartDetails";
import DataGetter from "../data/DataGetter";
import Checkout from "./Checkout";
import Thanks from "./Thanks";

// const filterProducts = (products = [], category) =>
//   !category || category === "All"
//     ? products
//     : products.filter(p => p.category.toLowerCase() === category.toLowerCase());

class ShopConnector extends Component {
  componentDidMount() {
    this.props.loadData(DataTypes.CATEGORIES);
    // this.props.loadData(DataTypes.PRODUCTS);
  }

  selectComponent = routeProps => {
    const wrap = (Component, Content) => (
      <Component {...this.props} {...routeProps}>
        {Content && wrap(Content)}
      </Component>
    );
    switch (routeProps.match.params.section) {
      case "products":
        return wrap(DataGetter, Shop);
        break;
      case "cart":
        return wrap(CartDetails);
        break;
      case "checkout":
        return wrap(Checkout);
        break;
      case "thanks":
        return wrap(Thanks);
      default:
        /* Redirect matches any other URLs and redirects them to the URL for the first page of the products, unfiltered by category. */
        return <Redirect to="/shop/products/all/1" />;
    }
  };

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
        {/* Refactored of the below to select the component that should be displayed to the user and provides it with props from the data store and URL router. */}
        <Route
          path={"/shop/:section?/:category?/:page?"}
          render={routeProps => this.selectComponent(routeProps)}
        />
        {/* <Route
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
        <Route
          path="/shop/checkout"
          render={routeProps => <Checkout {...this.props} {...routeProps} />}
        />
        <Route
          path="/shop/thanks"
          render={routeProps => <Thanks {...this.props} {...routeProps} />}
        />
        <Redirect to="/shop/products/all/1" /> */}
      </Switch>
    );
  }
}

const mapStateToProps = dataStore => ({ ...dataStore });

const mapDispatchToProps = {
  ...ShopActions,
  ...CartActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopConnector);
