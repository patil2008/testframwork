import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase';
import 'firebase/firestore'; // add this to use Firestore

import {LoginForm} from 'g6reactlogin';
import './index.css';

import store from './store';
import App from './components/App';

ReactDOM.render(
  	<Provider store={store}>
    	<App />
  	</Provider>,
  	document.getElementById('root')
);
registerServiceWorker();

// import { createStore, applyMiddleware } from 'redux';

// import reducers from './reducers';
// const createStoreWithMiddleware = applyMiddleware()(createStore);
// const store = createStoreWithMiddleware(reducers);
// console.log('store', store)
// ReactDOM.render(
// 	<Provider store={store}>
// 		<App />
// 	</Provider>,
// 	document.getElementById('root')
// );

