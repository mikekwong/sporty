import { ActionTypes, DataTypes } from "./Types";
import { RestDataSource } from "./RestDataSource";

const dataSource = new RestDataSource();

// When the action object created by the loadData function is received by the data store, the middleware defined will wait for the response to be received from the web service and then pass on the action for normal processing, with the result that the application displays data obtained remotely

// Action Creator
export const loadData = (dataType, params) => ({
  type: ActionTypes.DATA_LOAD,
  payload: dataSource.GetData(dataType, params).then(response => ({
    dataType,
    data: response.data,
    // When the Promise is resolved by the data store middleware, the action object that is sent to the reducer will contain payload.total and payload.params properties. The total property will contain the value of the X-Total-Count header, which will be used to create the pagination navigation controls. The params property will contain the parameters used to make the request, which I will use to determine when the user has made a change that requires an HTTP request for more data.
    total: Number(response.headers["x-total-count"]),
    params,
  })),
});

// Action creators to support change of size and sort action type
export const setPageSize = newSize => ({
  type: ActionTypes.DATA_SET_PAGESIZE,
  payload: newSize,
});

export const setSortProperty = newProp => ({
  type: ActionTypes.DATA_SET_SORT_PROPERTY,
  payload: newProp,
});

// Action creator that uses promise to receive data object and format it to send to the web service
export const placeOrder = order => ({
  type: ActionTypes.DATA_STORE,
  payload: dataSource.StoreData(DataTypes.ORDERS, order).then(response => ({
    dataType: DataTypes.ORDERS,
    data: response.data,
  })),
});
