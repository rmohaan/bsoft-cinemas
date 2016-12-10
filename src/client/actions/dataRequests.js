/*global location*/

'use strict';

import axios from 'axios';

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response !== undefined && error.response.status === 401) {
    location.reload();
  }
  return Promise.reject(error);
});

export function fetchProductsList () {
  return axios({
    method: 'get',
    url: '/api/getProductsList'
  });
}

export function submitOrder (items) {
  console.log("submitOrder from dataRequests", items);
  return axios({
    method: 'put',
    url: '/api/submitOrder',
    data: items
  });
}

export function submitCustomerInfo (items) {
  console.log("submitCustomerInfo from dataRequests", items);
  return axios({
    method: 'put',
    url: '/api/submitCustomerInfo',
    data: items
  });
}
