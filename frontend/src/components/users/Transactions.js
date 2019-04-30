import React, { Component } from 'react';
import Navigation from "../Navigation";
import axios from 'axios';
import _ from 'lodash';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import '../../stylesheets/table.css';
import moment from 'moment';
import {
    getUserTransactions
} from '../../actions/index';

const mapStateToProps = state => {
    return {
        trades: state.users.transactions
    }
};

class Transactions extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        this.props.getUserTransactions(sessionStorage.getItem('userId'));
    }

    render() {
        if (this.state.redirectTo)
            return <Redirect to={{pathname: this.state.redirectTo, state: {userId: this.state.userId}}}/>;

        else {
            return (
                <div className="content">
                    <Navigation />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card userTable">
                                    <div className="header">
                                        <h4 className="title">Users</h4>
                                    </div>
                                    <div className="content table-responsive table-full-width">
                                        <table className="table table-hover table-striped">
                                            <thead>
                                            <tr>
                                                <th>Transaction Id</th>
                                                <th>From</th>
                                                <th>To</th>
                                                <th>Paid</th>
                                                <th>Received</th>
                                                <th>CryptoTrade.gg Fee</th>
                                                <th>Total amount paid</th>
                                                <th>Date</th>
                                                <th>Type</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.props.trades ?
                                                _.map(this.props.trades, trade => {
                                                    return (
                                                        <tr>
                                                            <td>{trade.transaction_id}</td>
                                                            <td>{trade["1"]}</td>
                                                            <td>{trade["2"]}</td>
                                                            <td>{trade.pay_amount}</td>
                                                            <td>{trade.buy_amount}</td>
                                                            <td>{trade.fee}</td>
                                                            <td>{trade.total}</td>
                                                            <td>{moment(trade.date).format('dd, MMM Do YY h:mm:ss a')}</td>
                                                            <td>{trade.type}</td>
                                                        </tr>
                                                    )
                                                })
                                                : ''}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapDispatchToProps = {
    getUserTransactions
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);