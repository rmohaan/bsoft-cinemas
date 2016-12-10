'use strict';

import * as actionEvents from '../actions/events';

export function productsList (state, action) {
  let actionType = action.type,
      newState = Object.assign({}, state);

  if (actionType === actionEvents.SET_DATA) {
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