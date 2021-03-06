/** Redux */
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { authUserSuccess } from 'actions/authentication-actions';
import rootReducer from './reducers'
import cookie from 'react-cookie'

//const devtools = __DEVTOOLS__ === "dev"? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(): {}
const devtools = true ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : {}

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer, devtools);

const token = cookie.load('token');

if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch(authUserSuccess(cookie.load('user')));
}

/** render to DOM */
// import 'react-hot-loader/patch';
// import { AppContainer } from 'react-hot-loader';
import React from 'react';
import  { render } from 'react-dom';
import Routes from './routes';
require('./stylesheets/compiled/style.css')

const renderRoutes = Routes => {
  render(
    <Provider store={store}>
      <Routes key={Math.random()}/>
    </Provider>,
    document.getElementById("root")
  )
}

// if (process.env.NODE_ENV === 'dev') {
//   if (module.hot) {
//     module.hot.accept('./routes', () => {
//       const nextRoutes = require('./routes').default;
//       renderRoutes(nextRoutes);
//     });
//     module.hot.accept('./reducers', () => {
//       const nextReducer = require('./reducers').default;
//       store.replaceReducer(nextReducer);
//     });
//   }
// }

renderRoutes(Routes)
