import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import * as All from '../validationHelper';
import { connect } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { apiService } from '../services/apiService';
import { Link } from 'react-router';
import Loader from 'react-loader';
import { auth, firebase } from '../services/firebase/index';
import SocialButton from './SocialButton';


class SocialAuth extends Component {


    constructor(props) {
        super(props);
        this.state = { loaded: true, loginError: false };
        this.socialAuth = this.socialAuth.bind(this);

    }
    handleSocialLogin = (user) => {
        console.log(user)
    }

    handleSocialLoginFailure = (err) => {
        console.error(err)
    }


    socialAuth(e, type) {
        let _self = this;
        auth.socialSignup(type).then(authUser => {
            console.log("firestore sign in", authUser);
            browserHistory.push('/');
        }).catch(error => {
            console.log("firebase error", error);
            _self.setState({ loaded: true });

        });
    }


    render() {
        console.log("this.state", this.state);

        return (
            <div>
                <Loader loaded={this.state.loaded} zIndex={2e9}>

                    <Link onClick={(e) => this.socialAuth(e, 'facebook')} className="btn btn-link">Firebase Facebook</Link>
                    <Link onClick={(e) => this.socialAuth(e, 'google')} className="btn btn-link">Firebase Google</Link>

                    {/* <div>
                    <SocialButton
                        provider='facebook'
                        appId='178519739530234'
                        onLoginSuccess={this.handleSocialLogin}
                        onLoginFailure={this.handleSocialLoginFailure}
                    >
                        Login with Facebook
    </SocialButton>
                </div> */}
                    <div>{this.state.loginError && <div>{this.state.loginError}</div>}</div>
                 
            </Loader>
            </div> 
        );
    }





}

const mapStateToProps = (state) => {
    console.log("state", state);
    return {

    }
}

export default connect(mapStateToProps)(SocialAuth);
