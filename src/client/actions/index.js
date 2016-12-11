'use strict';

import * as actionEvents from './events';
import * as dataRequests from './dataRequests';
import { push } from 'react-router-redux';

export function setData (data) {
  return {
    type: actionEvents.SET_DATA,
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

export function fetchProductsList () {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.fetchProductsList()
       .then(function (response) {
         dispatch(setData(response.data));
       });
  };
}

export function submitOrder (items) {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.submitOrder(items)
       .then(function (response) {
         console.log("submitOrder in actions", response);
         if (response.status === 200) {
           dispatch(setOrderInfo({orderId: response.data.insertedIds[0], totalAmount: items.totalAmount}));
           dispatch(push('/customer'));
         }
       });
  };
}

export function submitCustomerInfo (items) {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.submitCustomerInfo(items)
       .then(function (response) {
         console.log("submitCustomerInfo in actions", response);
         if (response.status === 200) {
           // dispatch(setCustomerInfo());
           dispatch(push('/'));
         }
       });
  };
}

export function fetchMoqList () {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.fetchMoqList()
       .then(function (response) {
         dispatch(setMoqData(response.data));
       });
  };
}