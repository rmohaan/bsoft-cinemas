'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

class TestStoreProvider extends React.Component {
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    );
  }
}

TestStoreProvider.displayName = 'TestStoreProvider';

TestStoreProvider.propTypes = {
  children: React.PropTypes.node
};

export default TestStoreProvider;
