import { RestUrls } from "./Urls";
import Axios from "axios";

// GetData method uses Axios to send an HTTP request to the web service to get all of the available objects for a specified data type. The result from the GetData method is a Promise that is resolved when the response is received from the web service.

// Config module for axios request options
// https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
// http://www.programmersought.com/article/2666649937/
export class RestDataSource {
  // Request parameters will be used to request pages and specify a category.
  // With 'params' as a parameter for axios, we can specify the query string for other filtering options
  // such as limit, sort, page, and category (see DataGetter component & ActionCreator component)
  GetData = (dataType, params) =>
    this.SendRequest("get", RestUrls[dataType], params);

  //new method for rest to receive the order object and sends it to the web service.
  StoreData = (dataType, data) =>
    this.SendRequest("post", RestUrls[dataType], {}, data);
  // Axios get request (can be done without .request)
  // https://github.com/axios/axios
  SendRequest = (method, url, params, data) =>
    Axios.request({ method, url, params, data });
}
