import React from 'react';
import PerformanceChart from './PerformanceChart';
import Nasdaq from './Nasdaq';
import PublicPreference from './PublicPreference';
import UserBehavior from './UserBehavior';
import { connect } from 'react-redux';

import {
    getAllCoinPrices,
    getHistoricalDaily
} from '../../actions/index';

import Navigation from '../Navigation';
import CoinTable from './CoinTable';
import HistoricCoinPrices from './HistoricCoinPrices';

import '../../stylesheets/navigation.css';

const mapStateToProps = state => {
  return {
      coins: state.coins.coinCurrent,
      coinsHistorical: state.coins.coinHistorical
  }
};

class Charts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }


  async componentWillMount() {
    this.props.getAllCoinPrices();
    this.props.getHistoricalDaily('BTC', 30);
  }

  render() {
    return (
      <div className="content">
          <Navigation />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
                <HistoricCoinPrices />
            </div>
              <div className="col-md-4">
                  <CoinTable/>
              </div>
          </div>
            <div className="row">
                <div className="col-md-6">
                    <HistoricCoinPrices />
                </div>
                <div className="col-md-6">
                    <CoinTable/>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
    getAllCoinPrices,
    getHistoricalDaily
};

export default connect(mapStateToProps, mapDispatchToProps)(Charts);