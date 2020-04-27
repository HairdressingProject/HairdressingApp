import React from 'react';
import ReactDOM from 'react-dom';
import './scss/normalise.scss';
import 'foundation-sites/dist/css/foundation.min.css';
import './index.css';
import { App } from './components/App';
import * as serviceWorker from './serviceWorker';
import { configureAppStore, history } from './_helpers';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

const store = configureAppStore();

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/App', render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
