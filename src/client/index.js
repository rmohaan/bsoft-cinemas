'use strict';

import React from 'react';
import {render} from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import {Provider} from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './stores/index';
import "./stylesheets/main.scss";

import SeatSelectionWrapper from './views/seatSelectionWrapper';

const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component {
  render () {

    return (
       <div>
        {this.props.children}
      </div>
    );
  }
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SeatSelectionWrapper}/>
      </Route>
    </Router>
  </Provider>, document.getElementById('app'));
