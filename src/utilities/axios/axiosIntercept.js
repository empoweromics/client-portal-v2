import axios from 'axios';
import { getToken } from '../firebase/firebase.service';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_DEVELOP_URL
});

axiosClient.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const idToken = await getToken();
    if (idToken) {
      config.headers = {
        ...config.headers,
        Accept: 'application/json'
      };
    }
     config.headers.user = JSON.parse(localStorage.getItem('user')).id;
 
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
