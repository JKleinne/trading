import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { format } from '../../utilities/CurrencyFormat';
import {
    getUserWallets
} from '../../actions/index';

const mapStateToProps = state => {
    return {
        wallets: state.users.wallets,
        prices: state.coins.coinCurrent
    }
};

class Portfolio extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
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

        return (
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
                        {_.map(this.props.wallets, wallet => {
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
        )
    }
}

const mapDispatchToProps = {
    getUserWallets
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);