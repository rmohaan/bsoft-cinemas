import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import * as reducers from '../reducers/index';
import defaultState from './defaultState';

const reducer = combineReducers({
  productsList: reducers.productsList,
  selectedItems: reducers.selectedItems,
  updatedStockItems: reducers.updateStockItems,
  orderInfo: reducers.orderInfo,
  moqList: reducers.moqList,
  customerOrders: reducers.customerOrders,
  customersList: reducers.customersList,
  authenticationDetails: reducers.authenticationDetails,
  routing: routerReducer
});

const routingMiddleware = routerMiddleware(browserHistory);

const store = createStore(reducer, defaultState, compose(
  applyMiddleware(thunk, routingMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// window.store = store;
export default store;