import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import reducers from './redux/reducers';
import mySaga from './redux/sagas';
import './assets/sass/index.scss';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
    (nodeEnv !== 'production' &&
        typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(mySaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
