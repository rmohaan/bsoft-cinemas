'use strict';

import * as actionEvents from '../actions/events';

export function data (state, action) {
  let actionType = action.type,
      newState = Object.assign({}, state);

  if (actionType === actionEvents.SET_LAYOUT_DATA) {
    newState = action.payload;
  }

  return newState;
}

export function info (state, action) {
  let actionType = action.type,
      newState = Object.assign({}, state);

  if (actionType === actionEvents.SET_INFO) {
    newState = action.payload;
  }

  return newState;
}
