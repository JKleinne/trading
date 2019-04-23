import React, { Component } from 'react';
import _ from 'lodash';
import Navigation from '../Navigation';
import '../../stylesheets/navigation.css';
import axios from "axios";
import {Redirect} from "react-router-dom";

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    async componentWillMount() {
        const has2FA = await axios.get(
            `http://localhost:8000/users/has2FA/${sessionStorage.getItem('userId')}`
        );

        if(has2FA.data === true) {
            this.setState({ has2FA: true })
        }
        else {

            const response = await axios.get(
                `http://localhost:8000/users/2fa/${sessionStorage.getItem('userId')}`
            );

            await this.setState({
                secret: _.split(response.data, '***')[0],
                url: _.split(response.data, '***')[1]
            });
        }
    }

    render() {
        if(this.state.redirectTo)
            return <Redirect to={{ pathname: this.state.redirectTo }} />;

        else
            return (
                <div className="content">
                    <Navigation />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="twoFAContainer">

                                    {this.state.has2FA ?

                                        <div className="box">
                                            <div className="input">
                                                <div className="text-muted">
                                                    <h6>You already have Two-Factor Authentication set up</h6>
                                                </div>
                                            </div>
                                        </div>

                                    :
                                        <div className="box">
                                            Scan this and enter the code below

                                            <div className="input">
                                                <img src={this.state.url} />
                                            </div>

                                            <div className="input">
                                            </div>

                                            <div className="input">
                                                <input type="number"
                                                       placeholder="Code"
                                                       name="code" id="code" onChange={evt => {
                                                    this.setState({
                                                        code: evt.target.value
                                                    });
                                                }}/>
                                            </div>

                                            <a className="bttn" onClick={async () => {
                                                const response = await axios.post(
                                                    `http://localhost:8000/users/2fa`,
                                                    {...this.state, userId: sessionStorage.getItem('userId')}
                                                );

                                                if(response.data === 'Success')
                                                    this.setState({ redirectTo: 'two-fa-setup-success' })
                                            }}>Set up 2FA</a>
                                        </div>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
    }
}

export default Settings;