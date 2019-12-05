import { RestUrls } from "./Urls";
import Axios from "axios";

// GetData method uses Axios to send an HTTP request to the web service to get all of the available objects for a specified data type. The result from the GetData method is a Promise that is resolved when the response is received from the web service.

export class RestDataSource {
  GetData = dataType => this.SendRequest("get", RestUrls[dataType]);
  // Axios get request (can be done without .request)
  // https://github.com/axios/axios
  SendRequest = (method, url) => Axios.request({ method, url });
}
