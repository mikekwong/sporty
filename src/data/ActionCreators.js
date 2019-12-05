import { ActionTypes } from "./Types";
import { RestDataSource } from "./RestDataSource";

const dataSource = new RestDataSource();

// When the action object created by the loadData function is received by the data store, the middleware defined will wait for the response to be received from the web service and then pass on the action for normal processing, with the result that the application displays data obtained remotely

// Action Creator
export const loadData = dataType => ({
  type: ActionTypes.DATA_LOAD,
  payload: dataSource
    .GetData(dataType)
    .then(response => ({ dataType, data: response.data })),
});
