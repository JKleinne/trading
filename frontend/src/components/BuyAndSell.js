import React, { Component } from 'react';
import _ from 'lodash';
import Navigation from './Navigation';
import { Field, reduxForm } from 'redux-form';
import '../stylesheets/navigation.css';
import axios from "axios";
import Switch from 'react-switch';
import HistoricCoinPrices from "./dashboard/HistoricCoinPrices";
import CoinTable from "./dashboard/CoinTable";
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
                amount: "0.00000"
            }
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
                                <div className="input" >
                                    <label>Buy: </label>
                                    <select className="modal" name="buy" id="buy"
                                            onChange={evt => {
                                                this.setState({
                                                    ...this.state,
                                                    transaction: {
                                                        ...this.state.transaction,
                                                        ticker: evt.target.value
                                                    }
                                                });
                                            }}>

                                        {this.props.crypto ? _.map(this.props.crypto, coin => {
                                            return <option value = { coin.currency_code }>{ coin.currency_name }</option>
                                        }) : ''}
                                    </select>
                            </div>
                                <div className="input" >
                                    <input type="number"
                                           placeholder="Amount to invest($)" name="amountInvest" id="amountInvest" onChange={evt => {
                                        this.setState({
                                            ...this.state,
                                            transaction: {
                                                ...this.state.transaction,
                                                amount: evt.target.value,
                                                cryptoValue: parseFloat(evt.target.value) / parseFloat(_.replace(_.split(this.props.prices[this.state.transaction.ticker].CAD.PRICE, 'CAD')[1], ',', ''))
                                            }
                                        });
                                    }}/>
                                </div>

                                <div>
                                    <a className="bttn" onClick={async () => {
                                        await axios.post(`http://localhost:8000/users/updateProfile/${sessionStorage.getItem('userId')}`, {...this.state.user});
                                    }}>Buy {this.state.transaction.ticker}</a>
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
                                            <h6>{this.state.transaction.cryptoValue} {this.state.transaction.ticker}</h6>
                                        </div>

                                        {
                                            this.props.prices ?
                                                <div className="typo-line">
                                                    <small>@ {this.props.prices[this.state.transaction.ticker].CAD.PRICE} / {this.state.transaction.ticker}</small>
                                                </div>
                                                : ''
                                        }
                                    </div>

                                    {console.log(_.split(this.props.prices[this.state.transaction.ticker].CAD.PRICE, 'CAD')[1])}

                                    <div className="input" >
                                        <input type="number" disabled
                                               placeholder="Amount to invest" name="amountInvest" id="amountInvest" onChange={evt => {
                                            this.setState({
                                                ...this.state,
                                                transaction: {
                                                    ...this.state.transaction,
                                                    amount: evt.target.value
                                                }
                                            });
                                        }}/>
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