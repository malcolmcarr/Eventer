import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

import 'semantic-ui-css/semantic.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

import './index.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './store/configureStore';
import { loadEvents } from './actions/eventActions';
import ScrollToTop from './components/ScrollToTop';

const store = configureStore();
store.dispatch(loadEvents());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <ReduxToastr
          position='bottom-right'
          transitionIn='fadeIn'
          transitionOut='fadeOut'
        />
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
