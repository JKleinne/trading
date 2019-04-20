import React, { Component } from 'react';
import _ from 'lodash';
import Navigation from './Navigation';
import { Field, reduxForm } from 'redux-form';
import '../stylesheets/navigation.css';
import axios from "axios";
import Switch from 'react-ios-switch';
import { connect } from 'react-redux';
import {
    getCryptoCurrencies,
    getAllCoinPrices
} from "../actions";

const mapStateToProps = state => {
    return {
        crypto: state.coins.crypto,
        prices: state.coins.coinCurrent
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
                                            onChange={evt => {
                                                this.setState({
                                                    ...this.state,
                                                    transaction: {
                                                        ...this.state.transaction,
                                                        ticker: evt.target.value,
                                                        buy_amount: this.state.transaction.pay_amount ? _.round(parseFloat(this.state.transaction.pay_amount) / parseFloat(_.replace(_.split(this.props.prices[evt.target.value].CAD.PRICE, 'CAD')[1], ',', '')), 6) : 0
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
                                           placeholder={this.state.checked ? 'Amount to receive($)' : "Amount to invest($)"}
                                           name="amountInvest" id="amountInvest" onChange={evt => {
                                        this.setState({
                                            ...this.state,
                                            transaction: {
                                                ...this.state.transaction,
                                                pay_amount: evt.target.value,
                                                buy_amount: _.round(parseFloat(evt.target.value) / parseFloat(_.replace(_.split(this.props.prices[this.state.transaction.ticker].CAD.PRICE, 'CAD')[1], ',', '')), 6)
                                            }
                                        });
                                    }}/>
                                </div>

                                <div>
                                    <a className="bttn" onClick={async () => {
                                        await this.setState({
                                            ...this.state,
                                            transaction: {
                                                ...this.state.transaction,
                                                fee: _.round(this.state.transaction.pay_amount * 0.05, 2),
                                                total: parseFloat(this.state.transaction.pay_amount) + _.round(this.state.transaction.pay_amount * 0.05, 2)
                                            }
                                        });
                                        const response = await axios.post(`http://localhost:8000/transactions/buy`, {...this.state.transaction, userId: sessionStorage.getItem('userId')});
                                        console.log(`Repsonse: ${JSON.stringify(response, null, 2)}`);
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
                                            You are buying
                                        </p>
                                        <div className="typo-line">
                                            <h6>{this.state.transaction.buy_amount} {this.state.transaction.ticker}</h6>
                                        </div>

                                        {
                                            this.props.prices ?
                                                <div className="text-muted">
                                                    <h4>@ {this.props.prices[this.state.transaction.ticker].CAD.PRICE} / {this.state.transaction.ticker}</h4>
                                                </div>
                                                : ''
                                        }
                                    </div>

                                    <div className="input" >
                                    </div>

                                    <p className="text-muted">
                                        {this.state.transaction.buy_amount || "0.00000"} {this.state.transaction.ticker}............................... CAD ${_.round(this.state.transaction.pay_amount, 2)}
                                    </p>
                                    <p className="text-muted">
                                        Trading Fee........................................... CAD ${_.round(this.state.transaction.pay_amount * 0.05, 2)}
                                    </p>
                                    <p className="text-muted">
                                        Total.................................................... CAD ${parseFloat(this.state.transaction.pay_amount) + _.round(this.state.transaction.pay_amount * 0.05, 2)}
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
    getAllCoinPrices
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyAndSell);