import React, { Component } from 'react';
import {Redirect} from "react-router-dom";

class SignupSuccess extends Component {
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
                            Email confirmation link sent!
                        </div>

                        <a className="bttn" onClick={this.handleClick}>Go back</a>
                    </div>
                </div>
            );
        }
    }
}

export default SignupSuccess;
