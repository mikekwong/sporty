// import gql function from library to process query
import gql from "graphql-tag";
// Define client side query, so data can be retrieved from server
export const ordersSummaryQuery = gql`
query($onlyShipped: Boolean, $page: Int, $pageSize:Int, $sort:String) {
	orders(onlyUnshipped: $onlyShipped) {
		totalSize,
		orders(page: $page, pageSize, $pageSize, sort: $sort) {
			id, name, email, shipped
			products {quantity, product {price}}
		}
	}
}`;
