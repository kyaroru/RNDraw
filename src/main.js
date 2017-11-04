import React from 'react';
import { Provider } from 'react-redux';
import App from './app';
import configureStore from './store/configureStore';

class Main extends React.Component {
  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Main;
