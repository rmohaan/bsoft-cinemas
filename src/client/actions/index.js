'use strict';

import * as actionEvents from './events';
import * as dataRequests from './dataRequests';
import { push } from 'react-router-redux';


export function setInfo (data) {
  return {
    type: actionEvents.SET_INFO,
    payload: data
  };
}

export function setLayoutData (data) {
  return {
    type: actionEvents.SET_LAYOUT_DATA,
    payload: data
  };
}

export function fetchLayout () {
  return function (dispatch) {
    return dataRequests.fetchLayout()
       .then(function (response) {
         if (response.status === 200) {
           console.log("from datarequests", response);
           dispatch(setLayoutData(response.data.layout));
         }
       })
       .catch((err) => {
          dispatch(push('/'))
       });
  };
}
