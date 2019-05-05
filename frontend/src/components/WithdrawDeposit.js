import React, { Component } from 'react';
import _ from 'lodash';
import Navigation from './Navigation';
import '../stylesheets/navigation.css';
import axios from "axios";
import Switch from 'react-ios-switch';
import { connect } from 'react-redux';

import {
    getUserWallets
} from "../actions";

const mapStateToProps = state => {
    return {
        wallet: state.users.wallets
    }
};

class BuyAndSell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false
        }
    }

    componentDidMount() {
        this.props.getUserWallets();
    }

    render() {
        return (
            <div className="content">
                <Navigation />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="buyContainer">
                                <div className="box">
                                    <label> Withdraw </label>
                                    <Switch
                                        checked={this.state.checked}
                                        onChange={checked => this.setState({ checked })}
                                        offColor="grey"
                                        onColor="grey"
                                    />
                                    <label> Deposit </label>
                                    <div className="input" >
                                        <input type="number"
                                               placeholder={this.state.checked ? `Amount to deposit($)` : "Amount to withdraw($)"}
                                               name="withdrawDeposit" id="withdrawDeposit" onChange={evt => {
                                                   this.setState({
                                                       amount: evt.target.value
                                                   })
                                        }}/>
                                    </div>

                                    <div>
                                        <a className="bttn" onClick={async () => {
                                            const balance = this.props.wallet ?
                                                _.find(this.props.wallet, wallet => wallet.ticker === 'CAD').balance : 0;

                                            if(!this.state.checked && balance < this.state.amount)
                                                alert('You are trying to withdraw more funds than you have.');
                                            else {
                                                await axios.post(
                                                    `http://localhost:8000/transactions/${this.state.checked ? 'deposit' : 'withdraw'}`,
                                                    {...this.state, userId: sessionStorage.getItem('userId')}
                                                );
                                            }
                                        }}>{this.state.checked ? 'Deposit' : 'Withdraw'}</a>
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

    getUserWallets
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyAndSell);