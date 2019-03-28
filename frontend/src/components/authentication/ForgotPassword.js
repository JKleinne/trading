import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';
import _ from 'lodash';

import '../../stylesheets/profile-buttons.css';


class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ''
        }

        this.handleClick = () => this.setState({ redirectTo: '/'})
    }


    render() {
        if(this.state.redirectTo)
            return <Redirect to={{ pathname: this.state.redirectTo }}/>;

        else {
            return (
                <div className="materialContainer">
                    <div className="box">
                        <div className="title">FORGOT PASSWORD</div>

                        <div className="input">
                            <input type="text" placeholder="Email" name="email" id="email" onChange={evt => {
                                this.setState({
                                    email: evt.target.value
                                });
                            }}/>
                        </div>

                        <div className="bttn" onClick={this.handleClick}>Reset my password</div>
                    </div>
                </div>
            )
        }
    }
}

export default ForgotPassword;