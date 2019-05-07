import React, {Component} from 'react';
import AppNavigator from './navigator/AppNavigator';
import { Provider } from 'react-redux';

import store from './redux/store';

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <AppNavigator/>
        </Provider>
    );
  }
}
