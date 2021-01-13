import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'
import reduxThunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import rootReducer from "./Redux/reducers/rootReducer";

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose; // Redux DevTools

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(reduxThunk))
)

ReactDOM.render(
    <React.StrictMode>

        <BrowserRouter><Provider store={store}><App/></Provider></BrowserRouter>

    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
