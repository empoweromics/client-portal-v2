import axios from 'axios';
import { auth } from '../firebase/firebaseConfig';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_DEVELOP_URL
});

axiosClient.interceptors.request.use(
  async function (config) {
    const idToken = await auth.currentUser.getIdToken(true);
    console.log(idToken);
    //  console.log(config.mhm);
    // Do something before request is sent
    config.headers = {
      ...config.headers,
      Accept: 'application/json',
      Authorization: `Bearer ${idToken}`
    };
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
