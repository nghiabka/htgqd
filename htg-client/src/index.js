import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <MuiThemeProvider>
      <App />
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
