import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import '../../stylesheets/login-signup.css';

import { Style } from 'radium';
import _ from 'lodash';
import {
    getCountries,
    getFiatCurrencies,
    getUserList,
    setCurrentUserRole
} from "../../actions";

import { connect } from 'react-redux';

const containerStyle = {
    background: '#ED2553'
};

const textWhite = {
    color: 'white'
};

const visible = {
    display: 'block'
};

const hidden = {
    display: 'none'
};

const mapStateToProps = state => {
    return {
        countries: state.countries.countries,
        fiat: state.coins.fiat
    }
};

class LoginRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
            registerClicked : false,
            login: {
                email: '',
                password: ''
            },
            signup: {
                email: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: '',
                country: 0,
                currency: 'CAD',
                confirmPasswordValid: true
            }
        };

        this.idRef = React.createRef();
        this.pwRef = React.createRef();

        this.forgotPWClicked = () => this.setState({ redirectTo: '/forgotPassword' });
    }

    componentWillMount() {
        this.props.getCountries();
        this.props.getFiatCurrencies();
    }

    async validateForm(evt) {
        evt.preventDefault();

        if(_.isEqual(this.state.signup.password, this.state.signup.confirmPassword)) {
            await this.setState({
                ...this.state,
                signup: {
                    ...this.state.signup,
                    confirmPasswordValid: true
                }
            });

            if(!this.state.registerClicked) {
                let response;

                try {
                    response = await axios.post("http://localhost:8000/users/login", {...this.state.login});
                    sessionStorage.setItem('userId', response.data);
                } catch(error) {
                    response = error.response;
                }

                if(response && response.status === 200) {
                    const has2FA = await axios.get(`http://localhost:8000/users/has2FA/${sessionStorage.getItem('userId')}`);
                    const secret = await axios.get(`http://localhost:8000/users/get2FA/${sessionStorage.getItem('userId')}`);

                    if(has2FA.data === true) {
                        const code = window.prompt('Enter your 2FA code: ');
                        const verify2FA = await axios.post("http://localhost:8000/users/verify2FA", { code, secret: secret.data });

                        if(verify2FA.data === 'Success') {
                            const status = await axios.get(`http://localhost:8000/users/getStatus/${sessionStorage.getItem('userId')}`);

                            if(status.data === 'active')
                                this.setState({redirectTo: '/dashboard'});
                            else {
                                sessionStorage.removeItem('userId');
                                this.setState({ redirectTo: '/frozen' })
                            }

                            const role = await axios.get(`http://localhost:8000/users/getRole/${sessionStorage.getItem('userId')}`);
                            if(role.data === 'admin') {
                                this.props.setCurrentUserRole('admin');
                                this.props.getUserList();
                            }
                        }
                    }
                    else {
                        const status = await axios.get(`http://localhost:8000/users/getStatus/${sessionStorage.getItem('userId')}`);

                        if (status.data === 'active') {
                            const role = await axios.get(`http://localhost:8000/users/getRole/${sessionStorage.getItem('userId')}`);
                            if(role.data === 'admin') {
                                this.props.setCurrentUserRole('admin');
                                this.props.getUserList();
                            }
                            this.setState({redirectTo: '/dashboard'});
                        }
                        else {
                            sessionStorage.removeItem('userId');
                            this.setState({redirectTo: '/frozen'})
                        }
                    }
                }
                else
                    this.setState({ ...this.state, errorLogin: 'login error' })
            }
            else {
                let response;

                try {
                    response = await axios.post('http://localhost:8000/users/signup', {...this.state.signup});
                } catch(error) {
                    response = error.response;
                }

                if(response && response.status === 200)
                    this.setState({redirectTo: '/signupSuccess'});
                else
                    this.setState({ ...this.state, errorLogin: response.data.error });
            }
        }
        else {
            this.setState({
                ...this.state,
                signup: {
                    ...this.state.signup,
                    confirmPasswordValid: false
                }
            })
        }
    }

    toggleRegister() {
        this.idRef.current.value = '';
        this.pwRef.current.value = '';

        this.setState({
            registerClicked: !this.state.registerClicked
        })
    }

  render() {
      const handleRegisterClick = () => {
          this.toggleRegister();
      };

      if (this.state.redirectTo)
          return <Redirect push to={{ pathname: this.state.redirectTo }}/>;
      else {
          return (
              <div className="container">
                  <div className="box" style={this.state.registerClicked ? containerStyle : {}}>


                      {this.state.registerClicked ?
                          <Style scopeSelector=".input" rules={{
                              '::-webkit-input-placeholder': {
                                  color: 'white'
                              }
                          }}/>
                          : ""
                      }
                      <div className="title" style={this.state.registerClicked ? textWhite : {}}>
                          {this.state.registerClicked ? "REGISTER" : "LOGIN"}
                      </div>

                      <div className="input">
                          <input type="text"  ref={this.idRef}
                                 style={this.state.registerClicked ? textWhite : {}}
                                 placeholder="Email" name="email" id="email" onChange={evt => {
                              if (this.state.registerClicked)
                                  this.setState({
                                      ...this.state,
                                      signup: {
                                          ...this.state.signup,
                                          email: evt.target.value
                                      }
                                  });
                              else
                                  this.setState({
                                      ...this.state,
                                      login: {
                                          ...this.state.login,
                                          email: evt.target.value
                                      }
                                  });
                          }}/>
                      </div>

                      <div className="input" style={this.state.registerClicked ? visible : hidden}>
                          <input type="text" style={this.state.registerClicked ? textWhite : {}}
                                 placeholder="First Name" name="firstName" id="firstName" onChange={evt => {
                              this.setState({
                                  ...this.state,
                                  signup: {
                                      ...this.state.signup,
                                      firstName: evt.target.value
                                  }
                              });
                          }}/>
                      </div>

                      <div className="input" style={this.state.registerClicked ? visible : hidden}>
                          <input type="text" style={this.state.registerClicked ? textWhite : {}}
                                 placeholder="Last Name" name="lastName" id="lastName" onChange={evt => {
                              this.setState({
                                  ...this.state,
                                  signup: {
                                      ...this.state.signup,
                                      lastName: evt.target.value
                                  }
                              });
                          }}/>
                      </div>

                      <div className="input" style={this.state.registerClicked ? visible : hidden}>
                          <label style={{color: 'white'}}>Country: </label>
                          <select className="modal" style={this.state.registerClicked ? {float: 'right', background: 'white', color: 'red'} : {}}
                                  name="country" id="country" onLoad={evt => {
                              this.setState({
                                  ...this.state,
                                  signup: {
                                      ...this.state.signup,
                                      country: "0"
                                  }
                              });
                          }}
                                  onChange={evt => {
                                      this.setState({
                                          ...this.state,
                                          signup: {
                                              ...this.state.signup,
                                              country: evt.target.value
                                          }
                                      });
                                  }}>

                              {this.props.countries ? _.map(this.props.countries, country => {
                                  return <option value = { country.country_id }>{ country.country_name }</option>
                              }) : ''}
                          </select>
                      </div>

                      <div className="input" style={this.state.registerClicked ? visible : hidden}>
                          <label style={{color: 'white'}}>Currency: </label>
                          <select className="modal" style={this.state.registerClicked ? {float: 'right', background: 'white', color: 'red'} : {}}
                                  name="currency" id="currency" onLoad={evt => {
                              this.setState({
                                  ...this.state,
                                  signup: {
                                      ...this.state.signup,
                                      currency: "0"
                                  }
                              });
                          }}
                                  onChange={evt => {
                                      this.setState({
                                          ...this.state,
                                          signup: {
                                              ...this.state.signup,
                                              currency: evt.target.value
                                          }
                                      });
                                  }}>
                              {this.props.fiat ? _.map(this.props.fiat, fiat => {
                                  return <option value={fiat.ticker}>{fiat.ticker}</option>
                              }) : ''}
                          </select>
                      </div>

                      <div className="input">
                          <input type="password" style={this.state.registerClicked ? textWhite : {}}
                                 ref={this.pwRef}
                                 placeholder="Password" name="password" id="pass" onChange={evt => {
                              if (this.state.registerClicked)
                                  this.setState({
                                      ...this.state,
                                      signup: {
                                          ...this.state.signup,
                                          password: evt.target.value
                                      }
                                  });
                              else
                                  this.setState({
                                      ...this.state,
                                      login: {
                                          ...this.state.login,
                                          password: evt.target.value
                                      }
                                  });
                          }}/>
                          {!this.state.signup.confirmPasswordValid ?
                              <p style={{color: 'white'}}>
                                  Passwords must match
                              </p> : ""}
                      </div>

                      <div className="input" style={this.state.registerClicked ? visible : hidden}>
                          <input type="password" style={this.state.registerClicked ? textWhite : {}}
                                 placeholder="Confirm Password" name="repass" id="repass" onChange={evt => {
                              this.setState({
                                  ...this.state,
                                  signup: {
                                      ...this.state.signup,
                                      confirmPassword: evt.target.value
                                  }
                              })
                          }}/>
                          {!this.state.signup.confirmPasswordValid ?
                              <p style={{color: 'white'}}>
                                  Passwords must match
                              </p> : ""}
                      </div>

                      <div className="button login">
                          {  !this.state.registerClicked && this.state.errorLogin ?
                              <p style={this.state.registerClicked ? {color: 'white'} : {color: '#ED2553'}}>
                                  Incorrect Login
                              </p> : ""
                          }
                          <button className={""} onClick={async evt => {
                              await this.validateForm(evt)
                          }}>
                              <span className="btttn" style={this.state.registerClicked ? textWhite : {}}>Go</span>
                              <i className="fa fa-check"></i>
                          </button>
                      </div>

                      <a href="" className="pass-forgot" onClick={this.forgotPWClicked}>Forgot your password?</a>

                  </div>

                  <div className="overbox">
                      <div className="material-button alt-2"><span className="shape" onClick={handleRegisterClick}>
                </span></div>
                  </div>
              </div>
          );
      }
  }
}

const mapDispatchToProps = {
    getCountries,
    getFiatCurrencies,
    getUserList,
    setCurrentUserRole
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister);