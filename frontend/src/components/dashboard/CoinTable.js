import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import config from '../../config/config'
import {
  getAllCoinPrices,
  getHistoricalDaily,
  setCoinToFetch,
  getHistoricalHourly
} from '../../actions/index';

const mapStateToProps = state => {
  return {
    coins: state.coins.coinCurrent,
    mode: state.coins.ohclvMode
  }
};

class CoinTable extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleClick = this.handleClick.bind(this);
    this.setClassName = this.setClassName.bind(this);
  }

  componentWillMount() {
    this.props.getAllCoinPrices();
  }

  handleClick(evt) {
    if(this.props.mode === config.OHCLV_modes.daily)
      this.props.getHistoricalHourly(evt._targetInst.return.key, 24);
    else if(this.props.mode === config.OHCLV_modes.weekly)
      this.props.getHistoricalDaily(evt._targetInst.return.key, 7);
    else
      this.props.getHistoricalDaily(evt._targetInst.return.key, 365);
    this.props.setCoinToFetch(evt._targetInst.return.key);
  }

  setClassName(value) {
    value = _.trim(value, 'CAD');

    if(value > 0)
      return "btn btn-success btn-fill btn-sm";
    else if(value < 0)
      return "btn btn-danger btn-fill btn-sm";

    return "btn btn-default btn-fill btn-sm";
  }

  render() {
    return (
      <div className="card">
        <div className="header">
          <h4 className="title">Coins</h4>
        </div>
        <div className="content table-responsive table-full-width">
          <table className="table table-hover table-striped coinTable">
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
                <tr key={coin.CAD.FROMSYMBOL} onClick={this.handleClick}>
                  <td>{coin.CAD.FROMSYMBOL}</td>
                  <td>{coin.CAD.PRICE}</td>
                  <td >{coin.CAD.CHANGEDAY}</td>
                  <td className={this.setClassName(coin.CAD.CHANGEPCTDAY)}>{coin.CAD.CHANGEPCTDAY}</td>
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
  getAllCoinPrices,
  getHistoricalDaily,
  setCoinToFetch,
  getHistoricalHourly
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinTable);