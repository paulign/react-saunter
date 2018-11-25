import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from "redux-thunk";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import rootReducer from './reducers';

const history = createBrowserHistory()

const store = createStore(
  rootReducer(history),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            Saunter
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
