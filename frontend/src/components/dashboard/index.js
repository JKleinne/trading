import React from 'react';
import { connect } from 'react-redux';

import {
    getAllCoinPrices,
    getHistoricalDaily,
    getUserWallets
} from '../../actions/index';

import Navigation from '../Navigation';
import CoinTable from './CoinTable';
import HistoricCoinPrices from './HistoricCoinPrices';
import Portfolio from './Portfolio';

import '../../stylesheets/navigation.css';
import Switch from "../BuyAndSell";
import _ from "lodash";
import axios from "axios";

const mapStateToProps = state => {
  return {
      prices: state.coins.coinCurrent,
      wallets: state.users.wallets
  }
};

class Charts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }


  async componentWillMount() {
    this.props.getAllCoinPrices();
      this.props.getUserWallets();
  }

  render() {
      const getPortfolioValue = () => {
          return _.reduce(this.props.wallets, (sum, wallet) => {
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

    return (
      <div className="content">
          <Navigation />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7">
                <HistoricCoinPrices />
            </div>
              <div className="col-md-5">
                  <CoinTable />
              </div>
          </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="buyContainer">
                        <div className="box">
                            <div className="input" >
                                <h6 className="text-muted">
                                    Total Portfolio Value
                                </h6>

                                <p className="text-muted">
                                    CAD ${_.round(getPortfolioValue(), 2)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <Portfolio />
                </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
    getAllCoinPrices,
    getHistoricalDaily,
    getUserWallets,
};

export default connect(mapStateToProps, mapDispatchToProps)(Charts);