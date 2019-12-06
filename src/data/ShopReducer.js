import { ActionTypes, DataTypes } from "./Types";

export const ShopReducer = (storeData = {}, action) => {
  switch (action.type) {
    case ActionTypes.DATA_LOAD:
      return {
        ...storeData,
        [action.payload.dataType]: action.payload.data,
        // total contains value of X-Total-Count response header to use for pagination nav controls
        [`${action.payload.dataType}_total`]: action.payload.total,
        // params will contain paramaters used to make the req.
        // Which will determine when the user has mad a change that requires an HTTP req for more data
        [`${action.payload.dataType}_params`]: action.payload.params,
      };

    case ActionTypes.DATA_SET_PAGESIZE:
      return { ...storeData, pageSize: action.payload };

    case ActionTypes.DATA_SET_SORT_PROPERTY:
      return { ...storeData, sortKey: action.payload };
    // case for adding order to data store

    case ActionTypes.DATA_STORE:
      if (action.payload.dataType === DataTypes.ORDERS) {
        return { ...storeData, order: action.payload.data };
      }
      break;

    default:
      return storeData;
  }
};
