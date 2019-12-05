import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setPageSize, setSortProperty } from "../data/ActionCreators";

// HOC to use for PaginationControls

const mapStateToProps = dataStore => dataStore;

const mapDispatchToProps = { setPageSize, setSortProperty };

const mergeProps = (dataStore, actionCreators, router) => ({
  ...dataStore,
  ...router,
  ...actionCreators,
  currentPage: Number(router.match.params.page),
  pageCount: Math.ceil(
    (dataStore.products_total | dataStore.pageSize || 5) /
      (dataStore.pageSize || 5)
  ),
  //  The component that uses this HOC has access to this.props.history so it can redirect the user with this.props.history.push or router.history.push.
  navigateToPage: page =>
    router.history.push(
      `/shop/products/${router.match.params.category}/${page}`
    ),
});

// You can get access to the history object's properties and the closest <Route>'s match via the withRouter higher-order component. withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
export const ProductPageConnector = PageComponent =>
  withRouter(
    connect(mapStateToProps, mapDispatchToProps, mergeProps)(PageComponent)
  );
