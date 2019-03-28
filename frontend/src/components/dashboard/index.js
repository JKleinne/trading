import React from 'react';
import PerformanceChart from './PerformanceChart';
import Nasdaq from './Nasdaq';
import PublicPreference from './PublicPreference';
import UserBehavior from './UserBehavior';
import { connect } from 'react-redux';

import {
    getAllCoinPrices
} from '../../actions/index';

import Navigation from '../Navigation';
import JSONTable from '../JSONtable';

import '../../stylesheets/navigation.css';

const mapStateToProps = state => {
  return {
      posts: state.users.posts,
      coins: state.coins.coins
  }
};

class Charts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }


  async componentWillMount() {
    this.props.getAllCoinPrices();
  }

  render() {
    return (
      <div className="content">
          <Navigation />
        {
          console.log(JSON.stringify(this.props.coins, null, 2))
        }
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <PerformanceChart />
            </div>
            <div className="col-md-6">
              <Nasdaq />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <PublicPreference />
            </div>
            <div className="col-md-6">
              <UserBehavior />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
    getAllCoinPrices
};

export default connect(mapStateToProps, mapDispatchToProps)(Charts);