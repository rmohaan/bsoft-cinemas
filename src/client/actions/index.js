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

export function fetchInfo () {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.fetchInfo()
       .then(function (response) {
         if (response.status === 200) {
           dispatch(setInfo(response.data));
         }
       })
       .catch((err) => {
          dispatch(push('/'))
       });
  };
}

export function fetchLayoutData () {
  return function (dispatch) {
    // dispatch(fetchingData());
    return dataRequests.fetchLayoutData()
       .then(function (response) {
         dispatch(setLayoutData(response));
       })
       .catch((err) => {
         console.log(err);
          dispatch(push('/'))
       });
  };
}
