'use strict';

import * as actionEvents from './events';
import * as dataRequests from './dataRequests';
import { push } from 'react-router-redux';

export function setProductsList (data) {
  return {
    type: actionEvents.SET_PRODUCTS_LIST,
    payload: data
  };
}

export function setMoqData (data) {
  return {
    type: actionEvents.SET_MOQ_DATA,
    payload: data
  };
}

export function setSelectedItems (data) {
  return {
    type: actionEvents.SET_SELECTED_ITEMS,
    payload: data
  };
}

export function setOrderInfo (data) {
  return {
    type: actionEvents.SET_ORDER_INFO,
    payload: data
  };
}

export function setCustomerInfo (data) {
  return {
    type: actionEvents.SET_CUSTOMER_INFO,
    payload: data
  };
}

export function setAuthenticationDetails (data) {
  return {
    type: actionEvents.SET_AUTHENTICATION_DETAILS,
    payload: data
  };
}

export function fetchProductsList () {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.fetchProductsList()
       .then(function (response) {
         if (response.status === 200) {
           dispatch(setProductsList(response.data));
         }
       })
       .catch((err) => {
          dispatch(push('/'))
       });
  };
}

export function submitOrder (items) {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.submitOrder(items)
       .then(function (response) {
         if (response.status === 200) {
           dispatch(setOrderInfo({orderId: response.data.insertedIds[0], totalAmount: items.totalAmount, customerId: items.customerId}));
           dispatch(push('/customer'));
         }
       })
       .catch((err) => {
          console.log(err);
       });
  };
}

export function submitCustomerInfo (items) {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.submitCustomerInfo(items)
       .then(function (response) {
         if (response.status === 200) {
           // dispatch(setCustomerInfo());
           dispatch(push('/purchase'));
         }
       })
       .catch((err) => {
         console.log(err);
       }) ;
  };
}

export function fetchMoqList () {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.fetchMoqList()
       .then(function (response) {
         dispatch(setMoqData(response.data));
       })
       .catch((err) => {
          dispatch(push('/'))
       });
  };
}

export function authenticateUser (userData) {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.authenticateUser(userData)
       .then(function (response) {
         // dispatch(setAuthenticationDetails(response.data));
          if(response.data.isAuthenticationSuccess && response.data.userRole === 'executive') {
            dispatch(push('/purchase'));
          } else if (response.data.isAuthenticationSuccess && response.data.userRole === 'admin') {
            dispatch(push('/moq'));
          }
       });
  };
}
