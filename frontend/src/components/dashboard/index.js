import React from 'react';
import PerformanceChart from './PerformanceChart';
import Nasdaq from './Nasdaq';
import PublicPreference from './PublicPreference';
import UserBehavior from './UserBehavior';
import { connect } from 'react-redux';
import axios from 'axios';

import {
    getPosts
} from '../../actions/index';

import Navigation from '../Navigation';
import '../../stylesheets/navigation.css';

const mapStateToProps = state => {
  return {
      posts: state.users.posts
  }
};

class Charts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }


  async componentWillMount() {
    this.props.getPosts();
    let posts = await axios.get('http://localhost:8080/posts');

    this.setState({
      posts
    });
  }

  render() {
    return (
      <div className="content">
          <Navigation />
        {
          console.log(JSON.stringify(this.state.posts, null, 2))
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
    getPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Charts);