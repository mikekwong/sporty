import React, { Component } from "react";
import { DataTypes } from "./Types";

export default class DataGetter extends Component {
  componentDidUpdate() {
    this.getData();
  }

  componentDidMount() {
    this.getData();
  }

  // getData gets the parameters from the URL and compares them with those in the data store that were added after the last request. If there has been a change, a new action is dispatched that will load the data the user requires.
  getData() {
    // dsData = data store data
    const dsData = this.props.products_params || {};
    // query strings: page, limit, sort, and category name (if no name then omit category altogether)
    // sort and limit paramters orders the results and sets the data size
    // values for setting and sorting the page size will be obtained from data store
    // rtData = data for the query string
    const rtData = {
      _limit: this.props.pageSize || 5,
      _sort: this.props.sortKey || "name",
      _page: this.props.match.params.page || 1,
      category_like:
        (this.props.match.params.category || "") === "all"
          ? ""
          : this.props.match.params.category,
    };
    // Check to see if the data store key values don't match with the query string key values, if so dispatch loadData action that will reload with the new data after passing in the object of the recent query as an argument
    if (Object.keys(rtData).find(key => dsData[key] !== rtData[key])) {
      this.props.loadData(DataTypes.PRODUCTS, rtData);
    }
  }

  render() {
    return <>{this.props.children}</>;
  }
}
