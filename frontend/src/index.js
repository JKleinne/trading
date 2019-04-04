import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import axios from 'axios';

import rootReducer from './reducers/index';

import './assets/styles/base.scss';
import './stylesheets/navigation.css';

import LoginRegister from './components/authentication/LoginRegister';
import Dashboard from './components/dashboard/index';
import SignupSuccess from './components/authentication/SignupSuccess';
import ForgorPassword from './components/authentication/ForgotPassword';

// Proxy all HTTP requests to baseURL
//axios.defaults.baseURL = 'http://localhost:8080';

const store = createStore(rootReducer, applyMiddleware(thunk));
window.store = store;

const routing = (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={LoginRegister} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/signupSuccess" component={SignupSuccess} />
                <Route path="/forgotPassword" component={ForgorPassword} />
            </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));

/*
Homer Simpson approves of this code
▓▓▓▓
▒▒▒▓▓
▒▒▒▒▒▓
▒▒▒▒▒▒▓
▒▒▒▒▒▒▓
▒▒▒▒▒▒▒▓
▒▒▒▒▒▒▒▓▓▓
▒▓▓▓▓▓▓░░░▓
▒▓░░░░▓░░░░▓
▓░░░░░░▓░▓░▓
▓░░░░░░▓░░░▓
▓░░▓░░░▓▓▓▓
▒▓░░░░▓▒▒▒▒▓
▒▒▓▓▓▓▒▒▒▒▒▓
▒▒▒▒▒▒▒▒▓▓▓▓
▒▒▒▒▒▓▓▓▒▒▒▒▓
▒▒▒▒▓▒▒▒▒▒▒▒▒▓
▒▒▒▓▒▒▒▒▒▒▒▒▒▓
▒▒▓▒▒▒▒▒▒▒▒▒▒▒▓
▒▓▒▓▒▒▒▒▒▒▒▒▒▓
▒▓▒▓▓▓▓▓▓▓▓▓▓
▒▓▒▒▒▒▒▒▒▓
▒▒▓▒▒▒▒▒▓
 */
