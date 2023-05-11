import axios from 'axios';

const axiosAdmin = axios.create({
  baseURL: process.env.REACT_APP_DEVELOP_URL
});

axiosAdmin.interceptors.request.use(
  async function (config) {
    config.headers.token = JSON.parse(localStorage.getItem('admin')).token;
    config.headers = {
      ...config.headers,
      Accept: 'application/json'
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosAdmin.interceptors.response.use(
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

export default axiosAdmin;
