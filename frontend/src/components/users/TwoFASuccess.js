import React, { Component } from 'react';

import {Redirect} from "react-router-dom";

class TwoFASuccess extends Component {
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
            return <Redirect to="/dashboard"/>;

        else {
            return (
                <div className="materialContainer">
                    <div className="box">
                        <div className="title">
                            { this.props.location.state.message }
                        </div>

                        <a className="bttn" onClick={this.handleClick}>Go back to dashboard</a>
                    </div>
                </div>
            );
        }
    }
}

export default TwoFASuccess;
