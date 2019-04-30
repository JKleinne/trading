import React, { Component } from 'react';
import axios from 'axios';

import Navigation from '../Navigation';
import {Redirect} from "react-router-dom";
import Style from "radium/es/components/style";

class Frozen extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ redirect: true });
    }

    render() {
        if(this.state.redirect)
            return <Redirect to="/"/>;

        else {
            return (
                <div className="materialContainer">
                    <div className="box">
                        <div className="title">
                            Your account had been frozen. Contact support for more info.
                        </div>

                        <a className="bttn" onClick={this.handleClick}>Go back</a>
                    </div>
                </div>
            );
        }
    }
}

export default Frozen;
