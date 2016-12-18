'use strict';

let state = {
  productsList: [],
  selectedItems: [],
  moqList: [],
  orderInfo: {},
  customerOrders: [],
  customersList: [],
  authenticationDetails: {
    authenticationMessage: '',
    isAuthenticationSuccess: true,
    userRole: ''
  }
};

export default state;