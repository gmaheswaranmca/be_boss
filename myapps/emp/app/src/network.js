import axios from "axios";

let clientConfig = {
    baseURL: "http://localhost:8080",
    headers: {
      "Content-type": "application/json",
    },
  }
let network = axios.create(clientConfig);
export default network;