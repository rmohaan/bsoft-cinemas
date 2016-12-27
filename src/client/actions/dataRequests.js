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

export function authenticateUser (userData) {
  return axios({
    method: 'post',
    url: '/api/login',
    data: userData
  });
}

export function logoutUser () {
  return axios({
    method: 'get',
    url: '/api/logout'
  });
}


export function fetchProductsList () {
  return axios({
    method: 'get',
    url: '/api/getProductsList'
  });
}

export function fetchMoqList () {
  return axios({
    method: 'get',
    url: '/api/getMoqList'
  });
}

export function fetchCustomersList () {
  return axios({
    method: 'get',
    url: '/api/getCustomersList'
  });
}

export function submitOrder (items) {
  return axios({
    method: 'put',
    url: '/api/submitOrder',
    data: items
  });
}

export function submitCustomerInfo (items) {
  return axios({
    method: 'put',
    url: '/api/submitCustomerInfo',
    data: items
  });
}

export function fetchOrders (customerId) {
  return axios({
    method: 'get',
    url: '/api/getCustomerOrders',
    params: {
      customerId: customerId
    }
  });
}

export function submitUpdatedStockItems (items) {
  return axios({
    method: 'put',
    url: '/api/updateStock',
    data: items
  });
}
export function fetchDashboardData () {
  return axios.all([
    fetchMoqList(),
    fetchCustomersList()
  ])
  .then(axios.spread(function (moqListResponse, customersListResponse) {
    // ... but this callback will be executed only when both requests are complete.
    return {
      moqList: moqListResponse.data,
      customersList: customersListResponse.data
    };
  }));
}