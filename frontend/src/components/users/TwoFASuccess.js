import React, { Component } from 'react';
import axios from 'axios';

import Navigation from '../Navigation';
import {Redirect} from "react-router-dom";
import Style from "radium/es/components/style";

let _this;
class TwoFASuccess extends Component {
    constructor(props) {
        super(props);

        _this = this;

        this.state = {};

        this.handleClick.bind(this);
    }

    handleClick() {
        _this.setState({ redirect: true });
    }

    render() {
        if(this.state.redirect)
            return <Redirect to="/dashboard"/>;

        else {
            return (
                <div className="materialContainer">
                    <div className="box">
                        <div className="title">
                            Two-Factor Authentication setup was a success!
                        </div>

                        <a className="bttn" onClick={this.handleClick}>Go back to dashboard</a>
                    </div>
                </div>
            );
        }
    }
}

export default TwoFASuccess;
