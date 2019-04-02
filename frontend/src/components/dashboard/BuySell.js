import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    getAllCoinPrices
} from '../../actions/index';

const mapStateToProps = state => {
    return {
        coins: state.coins.coinCurrent
    }
};

class BuySell extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="card">
                <div className="header">
                    <h4 className="title">Coins</h4>
                </div>
                <div className="content table-responsive table-full-width">
                    <table className="table table-hover table-striped">
                        <thead>
                        <tr>
                            <th>Coin</th>
                            <th>Current Price</th>
                            <th>Change over Last Day</th>
                            <th>Change over Last Day (%)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {_.map(this.props.coins, coin => (
                            <tr key={coin.CAD.FROMSYMBOL}>
                                <td>{coin.CAD.FROMSYMBOL}</td>
                                <td>{coin.CAD.PRICE}</td>
                                <td>{coin.CAD.CHANGEDAY}</td>
                                <td>{coin.CAD.CHANGEPCTDAY}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    getAllCoinPrices
};

export default connect(mapStateToProps, mapDispatchToProps)(BuySell);