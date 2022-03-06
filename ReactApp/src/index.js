import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import router from './router';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <App>{ router() }</App>
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
