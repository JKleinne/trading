import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import axios from 'axios';
import { PrivateRoute } from './utilities/PrivateRoute';

import rootReducer from './reducers/index';

import './assets/styles/base.scss';
import './stylesheets/navigation.css';

import LoginRegister from './components/authentication/LoginRegister';
import Dashboard from './components/dashboard/index';
import SignupSuccess from './components/authentication/SignupSuccess';
import ForgorPassword from './components/authentication/ForgotPassword';
import BuyAndSell from './components/BuyAndSell';
import Profile from './components/users/Profile';
import WithdrawDeposit from './components/WithdrawDeposit';
import Settings from './components/users/Settings';
import TwoFASuccess from './components/users/TwoFASuccess';

// Proxy all HTTP requests to baseURL
//axios.defaults.baseURL = 'http://localhost:8080';

const store = createStore(rootReducer, applyMiddleware(thunk));

const routing = (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={LoginRegister} />
                <Route path="/forgotPassword" component={ForgorPassword} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/signupSuccess" component={SignupSuccess} />
                <PrivateRoute path="/buy-and-sell" component={BuyAndSell} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/withdraw-deposit" component={WithdrawDeposit} />
                <PrivateRoute path="/settings" component={Settings} />
                <PrivateRoute path="/two-fa-setup-success" component={TwoFASuccess} />
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
