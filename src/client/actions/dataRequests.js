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

export function fetchInfo () {
  return axios({
    method: 'get',
    url: '/api/getData'
  });
}

export function submitData(items) {
  return axios({
    method: 'put',
    url: '/api/submitData',
    data: items
  });
}

export function fetchLayoutData () {
  return axios.all([
    fetchInfo()
  ])
  .then(axios.spread(function (responseData) {
    // ... but this callback will be executed only when both requests are complete.
    return {
      data: responseData.data
    };
  }));
}
