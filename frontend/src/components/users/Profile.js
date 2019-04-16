import React, { Component } from 'react';
import Navigation from "../Navigation";
import '../../stylesheets/navigation.css';
import '../../stylesheets/profile-buttons.css';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import {getCountries, getFiatCurrencies} from "../../actions";

const mapStateToProps = state => {
    return {
        countries: state.countries.countries,
        userId: state.users.userId
    }
};

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            changes: {}
        };

    }

    async componentWillMount() {
        const user = await axios.get(`http://localhost:8000/users/getUser/${this.props.userId}`);
        this.setState( {
            user: {...user.data}
        });

        this.props.getCountries();
    };

    render() {
        if (this.state.redirectTo)
            return <Redirect push to={{pathname: this.state.redirectTo}}/>;

        else {
            return (
                <div>
                    <Navigation/>

                    <div className="materialContainer">
                        <div className="box">

                            <div className="input">
                                <label className="label">First Name</label>
                                <input type="text"
                                       name="firstName" id="firstName"
                                       placeholder={this.state.user ? this.state.user.fname : ''}
                                       onChange={evt => {
                                           this.setState({
                                               user: {
                                                   ...this.state.user,
                                                   fname: evt.target.value
                                               }
                                           })
                                       }}/>
                            </div>

                            <div className="input">
                                <label className="label">Last Name</label>
                                <input type="text"
                                       name="lastName" id="lastName"
                                       placeholder={this.state.user ? this.state.user.lname : ''}
                                       onChange={evt => {
                                           this.setState({
                                               user: {
                                                   ...this.state.user,
                                                   lname: evt.target.value
                                               }
                                           })
                                       }}/>
                            </div>

                            <div className="input">
                                <label className="label">Country: </label>
                                <select className="profile"
                                        name="country" id="country"
                                        onChange={evt => {
                                            this.setState({
                                                ...this.state,
                                                user: {
                                                    ...this.state.user,
                                                    country_id: evt.target.value
                                                }
                                            });
                                        }}>

                                    {this.props.countries && this.state.user ? _.map(this.props.countries, country => {
                                        return <option
                                                    value = { country.country_id }
                                                    selected={this.state.user.country_id === country.country_id ? "selected" : ""}>
                                                         { country.country_name }
                                              </option>
                                    }) : ''}
                                </select>
                            </div>

                            <div>
                                <a className="bttn" onClick={async () => {
                                    await axios.post(`http://localhost:8000/users/updateProfile/${this.props.userId}`, {...this.state.user});
                                }}>Save Changes</a>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapDispatchToProps = {
    getCountries
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);