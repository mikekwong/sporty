import { graphql } from "react-apollo";
import { ordersSummaryQuery } from "./clientQueries";
import OrdersTable from "./OrdersTable";

const vars = {
  onlyShipped: false,
  page: 1,
  pageSize: 10,
  sort: "id",
};

// graphql function is counterpart to connect and withRouter; connecting a component to the graphQL features by creating a HOC. It is a function that provides features to a component.
// The graphql function accepts arguments for the query and a configuration object and returns a function that is used to wrap a component and provide it access to the query features. There are many properties supported by the configuration object, but I require only two. The first is the options property, which is used to create the set of variables that will be applied to the GraphQL query, using a function that receives the props applied by the parent component.
// The second is the props property, which is used to create the props that will be passed to the display component and is provided with a data object that combines details of the query progress, the response from the server, and the functions used to refresh the query.

export const OrdersConnector = graphql(ordersSummaryQuery, {
  options: props => ({ variables: vars }),
  // Props that will be passed to the display component
  // data object combines details of the query progress, the response from server, and functions to refresh the query.
  props: ({ data: { loading, orders, refetch } }) => ({
    totalSize: loading ? 0 : orders.totalSize,
    orders: loading ? [] : orders.orders,
    currentPage: vars.page,
    pageCount: loading ? 0 : Math.ceil(orders.totalSize / vars.pageSize),
    // refetch is selected from data object that resends the query and used to respond to pagination changes
    navigateToPage: page => {
      vars.page = Number(page);
      refetch(vars);
    },
    pageSize: vars.pageSize,
    setPageSize: size => {
      vars.pageSize = Number(size);
      refetch(vars);
    },
    sortKey: vars.sort,
    setSortProperty: key => {
      vars.sort = key;
      refetch(vars);
    },
  }),
})(OrdersTable);
