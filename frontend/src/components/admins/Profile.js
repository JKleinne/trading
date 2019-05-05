import React, { Component } from 'react';
import Navigation from "../Navigation";
import '../../stylesheets/navigation.css';
import '../../stylesheets/profile-buttons.css';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import _ from "lodash";
import { format } from "../../utilities/CurrencyFormat";
import { connect } from'react-redux';
import Switch from 'react-ios-switch';

import {
    getUserTransactions
} from '../../actions';

const mapStateToProps = state => {
    return {
        prices: state.coins.coinCurrent,
        trades: state.users.transactions
    }
};

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    async componentWillMount() {
        this.props.getUserTransactions(this.props.location.state.userId);

        const wallets = await axios.get(`http://localhost:8000/transactions/getUserWallets/${this.props.location.state.userId}`);
        const status = await axios.get(`http://localhost:8000/users/getStatus/${this.props.location.state.userId}`);

        this.setState( {
            wallets: wallets.data,
            checked: status.data === 'active'
        });
    };

    render() {
        const getScrapedValue = () => {
            return _.reduce(this.props.trades, (sum, trade) => sum + parseFloat(trade.fee), 0);
        };

        const getPortfolioValue = () => {
            return _.reduce(this.state.wallets, (sum, wallet) => {
                if(this.props.prices) {
                    if(wallet.ticker !== 'CAD') {
                        if (wallet.ticker === 'Ƀ')
                            wallet.ticker = 'BTC';
                        if (wallet.ticker === 'Ł')
                            wallet.ticker = 'LTC';

                        let value = parseFloat(
                            _.replace(_.replace((wallet.ticker !== 'CAD' ? this.props.prices[`${wallet.ticker}`].CAD.PRICE : wallet.balance), 'CAD', ''), ',', '')
                        );

                        value *= wallet.balance;

                        return sum + value;
                    }
                    else
                        return sum;
                }
            }, 0);
        };

        const getWalletValue = (ticker, balance) => {
            if(this.props.prices) {
                if (ticker !== 'CAD') {
                    if (ticker === 'Ƀ')
                        ticker = 'BTC';
                    if (ticker === 'Ł')
                        ticker = 'LTC';

                    let value = parseFloat(
                        _.replace(_.replace((ticker !== 'CAD' ? this.props.prices[`${ticker}`].CAD.PRICE : balance), 'CAD', ''), ',', '')
                    );

                    return value * balance;
                }
            }
        };

        if (this.state.redirectTo)
            return <Redirect push to={{pathname: this.state.redirectTo}}/>;

        else {
            return (
                <div className="content">
                    <Navigation />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="adminProfileContainer">
                                    <div className="box">
                                        <Switch
                                            checked={this.state.checked}
                                            onChange={async checked => {
                                                this.setState({ checked })
                                                await axios.post(`http://localhost:8000/users/setStatus`, {
                                                    userId: this.props.location.state.userId,
                                                    status: checked ? 'active' : 'frozen'
                                                });
                                            }}
                                            offColor="red"
                                            onColor="green"
                                        />
                                        <div className="input" >
                                            {
                                                this.state.checked ?
                                                    <h6 className="text-success">
                                                        Active
                                                    </h6>
                                                    :
                                                    <h6 className="text-danger">
                                                        Frozen
                                                    </h6>
                                            }

                                        </div>
                                        <div className="input" >
                                            <h6 className="text-muted">
                                                Total Portfolio Value
                                            </h6>

                                            <p className="text-muted">
                                                CAD {format('CAD', getPortfolioValue())}
                                            </p>
                                        </div>
                                        <div className="input" >
                                            <h6 className="text-muted">
                                                Total Scraped through fees
                                            </h6>

                                            <p className="text-muted">
                                                CAD {format('CAD', getScrapedValue())}
                                            </p>
                                        </div>
                                        <div className="input" >
                                            <h6 className="text-muted">
                                                Balance
                                            </h6>

                                            <p className="text-muted">
                                                {format('CAD', this.state.wallets ?
                                                    _.find(this.state.wallets, wallet => wallet.ticker === 'CAD').balance
                                                    : '')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card coinTable">
                                    <div className="header">
                                        <h4 className="title">Wallets</h4>
                                    </div>
                                    <div className="content table-responsive table-full-width">
                                        <table className="table table-hover table-striped">
                                            <thead>
                                            <tr>
                                                <th>Ticker</th>
                                                <th>Balance</th>
                                                <th>Value (CAD)</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {_.map(this.state.wallets, wallet => {
                                                if(wallet.ticker !== 'CAD') {
                                                    return <tr key={wallet.ticker}>
                                                        <td>{wallet.ticker}</td>
                                                        <td>{wallet.balance} {wallet.ticker}</td>
                                                        <td>{format('CAD', getWalletValue(wallet.ticker, wallet.balance))}</td>
                                                    </tr>
                                                }
                                            })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);