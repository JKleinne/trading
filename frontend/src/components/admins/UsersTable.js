import React, { Component } from 'react';
import Navigation from "../Navigation";
import _ from 'lodash';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import '../../stylesheets/table.css';
import {
    getUserList
} from '../../actions/index';

const mapStateToProps = state => {
    return {
        users: state.users.userList,
        role: state.users.role
    }
};

class UsersTable extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        this.props.getUserList();
    }

    render() {
        if (this.state.redirectTo)
            return <Redirect to={{pathname: this.state.redirectTo, state: {userId: this.state.userId}}}/>;

        else {
            return (
                this.props.role === 'admin' ?
                    <div className="content">
                        <Navigation />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card userTable">
                                        <div className="header">
                                            <h4 className="title">Users</h4>
                                        </div>
                                        <div className="content table-responsive table-full-width">
                                            <table className="table table-hover table-striped">
                                                <thead>
                                                <tr>
                                                    <th>Email</th>
                                                    <th>Two-Factor Authentication</th>
                                                    <th>Role</th>
                                                    <th>Status</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.props.users ?
                                                    _.map(this.props.users, user => {
                                                        return (
                                                            <tr onClick={() => {
                                                                this.setState({
                                                                    redirectTo: `/admin/profile`,
                                                                    userId: user.user_id
                                                                })
                                                            }}>
                                                                <td>{user.email}</td>
                                                                <td>{user.two_fa === '0' ? 'disabled' : 'enabled'}</td>
                                                                <td>{user.role}</td>
                                                                <td>{user.status}</td>
                                                            </tr>
                                                        )
                                                    })
                                                    : ''}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <Navigation />
                    </div>
            )
        }
    }
}

const mapDispatchToProps = {
  getUserList
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);