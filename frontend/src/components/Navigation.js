import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../stylesheets/navigation.css';
class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.logoutClicked = () =>  {
            sessionStorage.removeItem('userId');
            this.setState({ redirectTo: '/' });
        };
        this.dashboardClicked = () => this.setState({ redirectTo: '/dashboard' });
        this.profileClicked = () => this.setState({ redirectTo: '/profile' });
        this.settingsClicked = () => this.setState({ redirectTo: '/settings'});
        this.buyClicked = () => this.setState({ redirectTo: '/buy-and-sell' });
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

                        <ul>
                            <li>
                                <a>
                                    <i className="fa fa-btc fa-2x"></i>
                                    <span className="nav-text" onClick={this.buyClicked}>
                            Buy and Sell Coins
                        </span>
                                </a>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <a>
                                    <i className="fa fa-user fa-2x"></i>
                                    <span className="nav-text" onClick={this.profileClicked}>
                            Profile
                        </span>
                                </a>
                            </li>
                        <ul>
                            <li>
                                <a>
                                    <i className="fa fa-cog fa-2x"></i>
                                    <span className="nav-text" onClick={this.settingsClicked}>
                            Settings
                        </span>
                                </a>
                            </li>
                        </ul>

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