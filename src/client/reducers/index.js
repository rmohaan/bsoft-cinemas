'use strict';

import * as actionEvents from '../actions/events';

export function productsList (state, action) {
  let actionType = action.type,
      newState = Object.assign({}, state);

  if (actionType === actionEvents.SET_PRODUCTS_LIST) {
    newState = action.payload;
  }

  return newState;
}

export function selectedItems (state, action) {
  let actionType = action.type,
      newState = Object.assign({}, state);

  if (actionType === actionEvents.SET_SELECTED_ITEMS) {
    newState = action.payload;
  }

  return newState;
}

export function orderInfo (state, action) {
  let actionType = action.type,
      newState = Object.assign({}, state);

  if (actionType === actionEvents.SET_ORDER_INFO) {
    newState = action.payload;
  }

  return newState;
}

export function moqList (state, action) {
  let actionType = action.type,
      newState = Object.assign({}, state);

  if (actionType === actionEvents.SET_MOQ_DATA) {
    newState = action.payload;
  }

  return newState;
}

export function customerOrders (state, action) {
  let actionType = action.type,
      newState = Object.assign({}, state);

  if (actionType === actionEvents.SET_CUSTOMER_ORDERS_LIST) {
      newState = action.payload;
  }

  return newState;
}

export function authenticationDetails (state, action) {
  let actionType = action.type,
      newState = Object.assign({}, state);

  if (actionType === actionEvents.SET_AUTHENTICATION_DETAILS) {
    newState = action.payload;
  }

  return newState;
}