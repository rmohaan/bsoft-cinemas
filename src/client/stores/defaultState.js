'use strict';

let state = {
  productsList: [],
  selectedItems: [],
  moqList: [],
  orderInfo: {},
  authenticationDetails: {
    authenticationMessage: '',
    isAuthenticationSuccess: true,
    userRole: ''
  }
};

export default state;