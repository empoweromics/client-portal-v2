import axios from 'axios';

const axiosAdmin = axios.create({
  baseURL: process.env.REACT_APP_ADMIN_URL
});

axiosAdmin.interceptors.request.use(
  async function (config) {
    // Do  before request is sent
    config.headers = {
      ...config.headers,
      Accept: 'application/json'
    };
    config.headers.token = JSON.parse(localStorage.getItem('admin'))?.token;
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
    window.location.href = '/status/' + error.response.status;

    return Promise.reject(error);
  }
);

export default axiosAdmin;
