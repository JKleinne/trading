import React, { Component } from 'react';
import Navigation from "../Navigation";
import '../../stylesheets/navigation.css';
import '../../stylesheets/profile-buttons.css';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import mapStateToProps from "react-redux/es/connect/mapStateToProps";
import mapDispatchToProps from "react-redux/es/connect/mapDispatchToProps";

const mapStateToProps = state => {
    return {
        countries: state.countries.countries
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
        //TODO fix this
        const user = await axios.get('http://localhost:8000/users/getUser/59');
        console.log(user.data);
        this.setState( {
            user: {...user.data}
        });
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
                                                   firstName: evt.target.value
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
                                                   lastName: evt.target.value
                                               }
                                           })
                                       }}/>
                            </div>

                            <div className="input">
                                <label className="label">Country</label>
                                <select className="profile" onLoad={evt => {
                                    this.setState({
                                        user: {
                                            ...this.state.user,
                                            country: `${this.state.user.country}`
                                        }
                                    });
                                }}
                                        onChange={evt => {
                                            this.setState({
                                                user: {
                                                    ...this.state.user,
                                                    country: evt.target.value
                                                }
                                            });
                                        }}>
                                    {/*<option value="0" selected={this.state. user && this.state.user.courseId == "0" ? 'selected' : ''}>*/}
                                    {/*    Computer Science Technology*/}
                                    {/*</option>*/}
                                    {/*<option value="1" selected={this.state. user && this.state.user.courseId == "1" ? 'selected' : ''}>*/}
                                    {/*    Computer Science And Mathematics*/}
                                    {/*</option>*/}
                                    {/*<option value="2" selected={this.state. user && this.state.user.courseId == "2" ? 'selected' : ''}>*/}
                                    {/*    Social Science*/}
                                    {/*</option>*/}
                                    {/*<option value="3" selected={this.state. user && this.state.user.courseId == "3" ? 'selected' : ''}>*/}
                                    {/*    Pure and Applied Science*/}
                                    {/*</option>*/}
                                    {/*<option value="4" selected={this.state. user && this.state.user.courseId == "4" ? 'selected' : ''}>*/}
                                    {/*    Commerce*/}
                                    {/*</option>*/}
                                    {/*<option value="5" selected={this.state. user && this.state.user.courseId == "5" ? 'selected' : ''}>*/}
                                    {/*    Communications*/}
                                    {/*</option>*/}
                                    {/*<option value="6" selected={this.state. user && this.state.user.courseId == "6" ? 'selected' : ''}>*/}
                                    {/*    Business Administration*/}
                                    {/*</option>*/}
                                    {/*<option value="7" selected={this.state. user && this.state.user.courseId == "7" ? 'selected' : ''}>*/}
                                    {/*    Early Childhood education*/}
                                    {/*</option>*/}
                                    {/*<option value="8" selected={this.state. user && this.state.user.courseId == "8" ? 'selected' : ''}>*/}
                                    {/*    Nursing*/}
                                    {/*</option>*/}
                                    {/*<option value="9" selected={this.state. user && this.state.user.courseId == "9" ? 'selected' : ''}>*/}
                                    {/*    Music*/}
                                    {/*</option>*/}
                                    {/*<option value="10" selected={this.state. user && this.state.user.courseId == "10" ? 'selected' : ''}>*/}
                                    {/*    Science*/}
                                    {/*</option>*/}
                                </select>
                            </div>

                            <div>
                                <a className="bttn" onClick={async () => {
                                    this.setState({...this.state, redirectTo: '/users'});
                                    await axios.post(`/users/updateStudent/${this.state.user.studentId}`, {user: this.state.user});
                                }}>Save Changes</a>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);