import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import _ from 'lodash';
import moment from 'moment';
import { format } from '../../utilities/CurrencyFormat';
import config from '../../config/config';
import {
    getHistoricalDaily,
    getHistoricalHourly,
    setOHCLVMode
} from '../../actions/index';

const mapStateToProps = state => {
    return {
        coins: state.coins.coinHistorical,
        currentCoin: state.coins.coinToFetch,
        mode: state.coins.ohclvMode
    }
};

let chartRef;

class HistoricCoinPrices extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleDailyClick = this.handleDailyClick.bind(this);
        this.handleWeeklyClick = this.handleWeeklyClick.bind(this);
        this.handleMonthlyClick = this.handleMonthlyClick.bind(this);
    }

    componentWillMount() {
        this.props.getHistoricalDaily('BTC', 365);
    }

    handleDailyClick = () => {
        this.setState({ dailyWeeklyClicked: true });
        this.props.getHistoricalHourly(this.props.currentCoin, 24);
        this.props.setOHCLVMode(config.OHCLV_modes.daily);
    };

    handleWeeklyClick = () => {
        this.setState({ dailyWeeklyClicked: true });
        this.props.getHistoricalDaily(this.props.currentCoin, 7);
        this.props.setOHCLVMode(config.OHCLV_modes.weekly);
    };

    handleMonthlyClick = () => {
      this.setState({ dailyWeeklyClicked: false })  ;
      this.props.getHistoricalDaily(this.props.currentCoin, 365);
      this.props.setOHCLVMode(config.OHCLV_modes.monthly);
    };

    render() {
        /*
         * I apologize to whoever has to read this (probably my future self) had to
         * speed-run this :( (April 1 2019)
         */
        const summarize = () => {
            const desiredNumberOfDataPoints = 12;
            let counter = 0;
            const dataPoints = (this.props.coins ? this.props.coins.length: 0);

            const jump = _.ceil(dataPoints / desiredNumberOfDataPoints);

            const arr =  _.filter(
                _.map(this.props.coins, coin => {
                    if(counter === jump) {
                        counter = 0;
                        return coin;
                    }
                    counter++;
                }), coin => !_.isUndefined(coin));

            return [this.props.coins ? this.props.coins[0] : 0, ...arr];
        };

        const data = {
                labels: this.state.dailyWeeklyClicked ? _.map(this.props.coins, coin =>
                        moment.unix(coin.time).format(`${this.props.mode === config.OHCLV_modes.daily ? 'LT' 
                        : (this.props.mode === config.OHCLV_modes.weekly ? 'dddd' : '')}`))

                    : ( this.props.mode === config.OHCLV_modes.monthly ?
                        _.map(summarize(), coin => moment.unix(coin.time).format('MMM YYYY'))
                    : ''),
                datasets: [
                    {
                        label: this.props.currentCoin || 'BTC',
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointHitRadius: 10,
                        data: this.state.dailyWeeklyClicked ? _.map(this.props.coins, coin => coin.high)
                            : _.map(summarize(), coin => coin.high)
                    }
                ]
        };

        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        callback: (value) => {
                            return format('CAD', value);
                        }
                    }
                }]
            },
        };

        return (
            <div className="card">
                <div className="header">
                    <h4 className="title">Coins</h4>
                    <div className="content buttons-with-margin">
                        <button onClick={this.handleDailyClick} className="btn btn-info btn-xs btn-fill">Daily</button>
                        <button onClick={this.handleWeeklyClick} className="btn btn-info btn-xs btn-fill">Weekly</button>
                        <button onClick={this.handleMonthlyClick} className="btn btn-info btn-xs btn-fill">Monthly</button>
                    </div>
                </div>
                <Line ref={ref => chartRef = ref} data={data} options={options} redraw />
            </div>
        )
    }
}

const mapDispatchToProps = {
    getHistoricalDaily,
    getHistoricalHourly,
    setOHCLVMode
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoricCoinPrices);