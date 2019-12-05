import { RestUrls } from "./Urls";
import Axios from "axios";

// GetData method uses Axios to send an HTTP request to the web service to get all of the available objects for a specified data type. The result from the GetData method is a Promise that is resolved when the response is received from the web service.

export class RestDataSource {
  // Request parameters will be used to request pages and specify a category.
  // With 'params' as a parameter for axios, we can specify the query string for other filtering options
  // such as limit, sort, page, and category (see DataGetter component & ActionCreator component)
  GetData = async (dataType, params) =>
    await this.SendRequest("get", RestUrls[dataType], params);
  // Axios get request (can be done without .request)
  // https://github.com/axios/axios
  SendRequest = (method, url, params) => Axios.request({ method, url, params });
}
