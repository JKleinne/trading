import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../stylesheets/navigation.css';
class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.logoutClicked = () => this.setState({ redirectTo: '/' });
        this.dashboardClicked = () => this.setState({ redirectTo: '/dashboard' });
    }

    render() {
        if (this.state.redirectTo)
            return <Redirect to={{pathname: this.state.redirectTo}}/>;

        else {
            return (
                <div>
                    <div className="area"></div>
                    <nav className="main-menu navigation">
                        <ul>
                            <li>
                                <a>
                                    <i className="fa fa-home fa-2x"></i>
                                    <span className="nav-text" onClick={this.dashboardClicked}>
                            Dashboard
                        </span>
                                </a>
                            </li>
                        </ul>



                        <ul className="logout">
                            <li>
                                <a>
                                    <i className="fa fa-power-off fa-2x"></i>
                                    <span className="nav-text" onClick={this.logoutClicked}>
                            Logout
                        </span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            );
        }
    }
}

export default Navigation;