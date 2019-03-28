import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import '../../stylesheets/login-signup.css';

import { Style } from 'radium';
import _ from 'lodash';

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
                fullName: '',
                confirmPasswordValid: true
            }
        };

        this.idRef = React.createRef();
        this.pwRef = React.createRef();

        this.forgotPWClicked = () => this.setState({ redirectTo: '/forgotPassword' });
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
                    response = await axios.post("/users/login", {...this.state.login});
                } catch(error) {
                    response = error.response;
                }

                if(response && response.status === 200)
                    this.setState({redirectTo: '/dashboard'});
                else
                    this.setState({ ...this.state, errorLogin: response.data.error })
            }
            else {
                let response;

                try {
                    response = await axios.post("/users/signup", {...this.state.signup});
                } catch(error) {
                    response = error.response;
                }

                if(response && response.status === 200)
                    //TODO Send email confirmation link from the backend
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
                          <input type="text" maxLength="7" ref={this.idRef}
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
                                 placeholder="Full Name" name="fullName" id="fullName" onChange={evt => {
                              this.setState({
                                  ...this.state,
                                  signup: {
                                      ...this.state.signup,
                                      fullName: evt.target.value
                                  }
                              });
                          }}/>
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
                              <span className="btn" style={this.state.registerClicked ? textWhite : {}}>Go</span>
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

export default LoginRegister;