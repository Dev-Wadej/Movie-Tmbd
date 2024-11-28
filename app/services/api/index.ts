import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://api.themoviedb.org/3"; // use env here

export { BASE_URL };

const Axios: AxiosInstance = axios.create({
  baseURL: BASE_URL
});

export default Axios;
