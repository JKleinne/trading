import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import config from '../../config/config';
import JSONPrint from '../../utilities/CircularJSONPrint';
import {
  getAllCoinPrices,
  getHistoricalDaily,
  setCoinToFetch,
  getHistoricalHourly,
    getCryptoCurrencies
} from '../../actions/index';
import Select from 'react-select';
import { Modal, Button } from 'react-bootstrap';
const mapStateToProps = state => {
  return {
    coins: state.coins.coinCurrent,
    mode: state.coins.ohclvMode,
    crypto: state.coins.crypto
  }
};

class CoinTable extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleClick = this.handleClick.bind(this);
    this.setClassName = this.setClassName.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    this.props.getAllCoinPrices();
    this.props.getCryptoCurrencies();
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

  handleConfirm(evt) {

  }

  handleClose() {
    this.setState({ transaction: {}, show: false });
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
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {_.map(this.props.coins, coin => (
                <tr key={coin.CAD.FROMSYMBOL} onClick={this.handleClick}>
                  <td>{coin.CAD.FROMSYMBOL}</td>
                  <td>{coin.CAD.PRICE}</td>
                  <td >{coin.CAD.CHANGEDAY}</td>
                  <td className={this.setClassName(coin.CAD.CHANGEPCTDAY)}>{coin.CAD.CHANGEPCTDAY}</td>
                  <td className="btn btn-info btn-fill btn-sm" data-toggle="modal" data-target="#buySellModal" onClick={() => this.setState({show: true})}>
                   Buy
      </td>
                  <td className="btn btn-info btn-fill btn-sm" data-toggle="modal" data-target="#buySellModal">
                    Sell
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Buy Coin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="input">
                <label className="label">Coin</label>
                <select className="modal" name="coins" id="coins"
                        onChange={evt => {
                          this.setState({
                            ...this.state,
                            signup: {
                              ...this.state.signup,
                              country: evt.target.value
                            }
                          });
                        }}>
                  {this.props.crypto ? _.map(this.props.crypto, coin => {
                    return <option value = { coin.currency_code }>{ coin.currency_name }</option>
                  }) : ''}
                </select>
              </div>

              <div className="input">
                <label className="label">Paying</label>
                <input type="number"
                       step="0.1"
                       name="pay_amount" id="pay_amount"
                       placeholder={this.state.user ? this.state.user.fname : ''}
                       onChange={evt => {
                         this.setState({
                           transaction: {
                             ...this.state.transaction,
                             fname: evt.target.value
                           }
                         })
                       }}/>
              </div>

              <div className="input">
                <label className="label">Buying</label>
                <input type="number"
                       step="0.1"
                       name="buy_amount" id="buy_amount"
                       placeholder={this.state.user ? this.state.user.fname : ''}
                       readOnly
                       onChange={evt => {
                         this.setState({
                           transaction: {
                             ...this.state.transaction,
                             fname: evt.target.value
                           }
                         })
                       }}/>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-info" onClick={() => this.setState({...this.state, show: false})}>
                Confirm
              </Button>
              <Button variant="primary" onClick={this.handleClose}>
                Cancel
              </Button>

            </Modal.Footer>
          </Modal>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getAllCoinPrices,
  getHistoricalDaily,
  setCoinToFetch,
  getHistoricalHourly,
  getCryptoCurrencies
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinTable);