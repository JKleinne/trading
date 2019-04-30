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
import ForgotPassword from './components/authentication/ForgotPassword';
import BuyAndSell from './components/BuyAndSell';
import Profile from './components/users/Profile';
import WithdrawDeposit from './components/WithdrawDeposit';
import Settings from './components/users/Settings';
import TwoFASuccess from './components/users/TwoFASuccess';
import UsersTable from './components/admins/UsersTable';
import AdminProfile from './components/admins/Profile';
import Transactions from './components/users/Transactions';
import Frozen from './components/authentication/Frozen';

// Proxy all HTTP requests to baseURL
//axios.defaults.baseURL = 'http://localhost:8080';

const store = createStore(rootReducer, applyMiddleware(thunk));

const routing = (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={LoginRegister} />
                <Route path="/forgotPassword" component={ForgotPassword} />
                <Route path="/frozen" component={Frozen} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/signupSuccess" component={SignupSuccess} />
                <PrivateRoute path="/buy-and-sell" component={BuyAndSell} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/withdraw-deposit" component={WithdrawDeposit} />
                <PrivateRoute path="/settings" component={Settings} />
                <PrivateRoute path="/two-fa-setup-success" component={TwoFASuccess} />
                <PrivateRoute path="/users-list" component={UsersTable} />
                <PrivateRoute path="/admin/profile" component={AdminProfile} />
                <PrivateRoute path="/trades-list" component={Transactions} />
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
