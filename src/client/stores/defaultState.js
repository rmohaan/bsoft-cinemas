'use strict';

let state = {
  productsList: [],
  selectedItems: [],
  moqList: [],
  orderInfo: {},
  customerOrders: [],
  customersList: [],
  updatedStockItems:[],
  authenticationDetails: {
    authenticationMessage: '',
    isAuthenticationSuccess: true,
    userRole: ''
  }
};

export default state;