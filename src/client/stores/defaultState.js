'use strict';

let state = {
  productsList: [],
  selectedItems: [],
  moqList: [],
  orderInfo: {},
  customerOrders: [],
  authenticationDetails: {
    authenticationMessage: '',
    isAuthenticationSuccess: true,
    userRole: ''
  }
};

export default state;