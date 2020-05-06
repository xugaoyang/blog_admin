import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/common.scss';
import App from './pages/Main';
import store from './store/index'
import { Provider } from 'react-redux';
import {persistor} from './store/index'
import {PersistGate} from 'redux-persist/lib/integration/react';


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
document.getElementById('root'));

