import React, { Component } from 'react';
import _ from 'lodash';
import Navigation from './Navigation';
import '../stylesheets/navigation.css';
import axios from "axios";
import Switch from 'react-ios-switch';
import { format } from '../utilities/CurrencyFormat';
import { connect } from 'react-redux';
import {
    getCryptoCurrencies,
    getAllCoinPrices,
    getUserWallets
} from "../actions";

const mapStateToProps = state => {
    return {
        crypto: state.coins.crypto,
        prices: state.coins.coinCurrent,
        wallet: state.users.wallets
    }
};

class BuyAndSell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transaction: {
                ticker: 'ADA',
                pay_amount: "0.00000"
            },
            checked: false
        }
    }

    componentDidMount() {
        this.props.getCryptoCurrencies();
        this.props.getAllCoinPrices();
        this.props.getUserWallets();
    }

    render() {
        return (
            <div className="content">
                <Navigation />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="buyContainer">
                            <div className="box">
                                <label> Buy </label>
                                <Switch
                                    checked={this.state.checked}
                                    onChange={checked => this.setState({ checked })}
                                    offColor="grey"
                                    onColor="grey"
                                />
                                    <label>Sell</label>
                                <div className="input" >

                                    <label>{this.state.checked ? 'Sell: ' : 'Buy: '}</label>

                                    <select className="modal" name="buy" id="buy"
                                            onChange={ async evt => {
                                                this.state.checked ?
                                                    await this.setState({
                                                        ...this.state,
                                                        transaction: {
                                                            ...this.state.transaction,
                                                            ticker: evt.target.value,
                                                            buy_amount:
                                                                this.state.checked ?
                                                                    _.round(parseFloat(this.state.transaction.pay_amount) * parseFloat(_.replace(_.replace(this.props.prices[evt.target.value].CAD.PRICE, 'CAD', ''), ',', '')), 6)
                                                                    :
                                                                    _.round(parseFloat(evt.target.value) / parseFloat(_.replace(_.split(this.props.prices[evt.target.value], 'CAD'), ',', '')), 6)
                                                        }
                                                    })
                                                    :
                                                await this.setState({
                                                    ...this.state,
                                                    transaction: {
                                                        ...this.state.transaction,
                                                        ticker: evt.target.value,
                                                        buy_amount: this.state.transaction.pay_amount ? _.round(parseFloat(this.state.transaction.pay_amount) / parseFloat(_.replace(_.split(this.props.prices[evt.target.value].CAD.PRICE, 'CAD')[1], ',', '')), 6) : 0,
                                                    }
                                                });
                                            }}>

                                        {this.props.crypto ? _.map(this.props.crypto, coin => {
                                            return <option value = { coin.ticker }>{ coin.currency_name }</option>
                                        }) : ''}
                                    </select>

                            </div>
                                <div className="input" >
                                    <input type="number"
                                           placeholder={this.state.checked ? `Amount to sell(${this.state.transaction.ticker})` : "Amount to invest($)"}
                                           name="amountInvest" id="amountInvest" onChange={evt => {
                                        this.setState({
                                            ...this.state,
                                            transaction: {
                                                ...this.state.transaction,
                                                pay_amount: evt.target.value,
                                                buy_amount:
                                                this.state.checked ?
                                                    _.round(parseFloat(evt.target.value) * parseFloat(_.replace(_.split(this.props.prices[this.state.transaction.ticker].CAD.PRICE, 'CAD')[1], ',', '')), 6)
                                                    :
                                                    _.round(parseFloat(evt.target.value) / parseFloat(_.replace(_.split(this.props.prices[this.state.transaction.ticker].CAD.PRICE, 'CAD')[1], ',', '')), 6)
                                            }
                                        });
                                    }}/>
                                </div>

                                <div>
                                    <a className="bttn" onClick={async () => {
                                        const balance = this.props.wallet ?
                                            _.find(this.props.wallet, wallet => wallet.ticker === 'CAD').balance : 0;

                                        const total = !this.state.checked ?
                                            parseFloat(this.state.transaction.pay_amount) + _.round(this.state.transaction.pay_amount * 0.05, 2)
                                            : 0;

                                        if(balance < total)
                                            alert('You do not have enough balance');
                                        else {
                                            await this.setState({
                                                ...this.state,
                                                transaction: {
                                                    ...this.state.transaction,
                                                    fee: this.state.checked ? _.round(this.state.transaction.buy_amount * 0.05, 2) : _.round(this.state.transaction.pay_amount * 0.05, 2),
                                                    total: this.state.checked ?
                                                        parseFloat(this.state.transaction.buy_amount) - _.round(this.state.transaction.buy_amount * 0.05, 2)
                                                        : parseFloat(this.state.transaction.pay_amount) + _.round(this.state.transaction.pay_amount * 0.05, 2)

                                                }
                                            });
                                            await axios.post(
                                                `http://localhost:8000/transactions/${this.state.checked ? 'sell' : 'buy'}`,
                                                {...this.state.transaction, userId: sessionStorage.getItem('userId')}
                                            );
                                            this.props.getUserWallets();
                                        }
                                    }}>{this.state.checked ? 'Sell' : 'Buy'} {this.state.transaction.ticker}</a>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="summaryContainer">
                                <div className="box">
                                    <div className="input" >
                                        <p className="text-muted">
                                            You are {this.state.checked ? 'selling' : 'buying'}
                                        </p>
                                        <div className="typo-line">
                                            <h6>{this.state.checked ? this.state.transaction.pay_amount : this.state.transaction.buy_amount} {this.state.transaction.ticker}</h6>
                                        </div>

                                        <div className="text-muted">
                                            {
                                                this.props.prices ?
                                                    <div className="text-muted">
                                                        <h4>@ {this.props.prices[this.state.transaction.ticker].CAD.PRICE} / {this.state.transaction.ticker}</h4>
                                                    </div>
                                                    : ''
                                            }
                                        </div>

                                        <div className="text-info">
                                           <h6>You have {this.props.wallet ? _.find(this.props.wallet, wallet => wallet.ticker === this.state.transaction.ticker).balance : ''} {this.state.transaction.ticker}
                                              <br /> Balance: {format('CAD', this.props.wallet ?
                                                _.find(this.props.wallet, wallet => wallet.ticker === 'CAD').balance
                                                : '')}</h6>
                                        </div>

                                    </div>

                                    <div className="input" >
                                    </div>

                                    {
                                        this.state.checked ?
                                            <p className="text-muted">
                                                {this.state.transaction.pay_amount || "0.00000"} {this.state.transaction.ticker}............................... CAD {format('CAD', this.state.checked ? this.state.transaction.buy_amount : this.state.transaction.pay_amount)}
                                            </p>
                                            :
                                            <p className="text-muted">
                                                {this.state.transaction.buy_amount || "0.00000"} {this.state.transaction.ticker}............................... CAD {format('CAD', this.state.checked ? this.state.transaction.buy_amount : this.state.transaction.pay_amount)}
                                            </p>
                                    }
                                    <p className="text-muted">
                                        Trading Fee........................................... CAD {format('CAD', this.state.checked ? this.state.transaction.buy_amount * 0.05 : this.state.transaction.pay_amount * 0.05)}
                                    </p>
                                    <p className="text-muted">
                                        Total.................................................... CAD {
                                        format('CAD',
                                            this.state.checked ?
                                         parseFloat(this.state.transaction.buy_amount) - _.round(this.state.transaction.buy_amount * 0.05, 2)
                                            : parseFloat(this.state.transaction.pay_amount) + _.round(this.state.transaction.pay_amount * 0.05, 2))
                                    }
                                    </p>


                                    <div className="input" >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    getCryptoCurrencies,
    getAllCoinPrices,
    getUserWallets
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyAndSell);