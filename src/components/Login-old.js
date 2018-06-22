import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { setLoginPending, setLoginSuccess, setLoginError } from './Login/action';
import * as All from '../validationHelper';
import { connect } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { Link } from 'react-router';
import Loader from 'react-loader';
import SocialAuth from './SocialAuth';
import { auth, firebase } from '../services/firebase/index';
class LoginOLD extends Component {

    constructor(props) {
        super(props);
        this.state = { loaded: true,loginError:false };
        this.onSubmit = this.onSubmit.bind(this);
    }


    onSubmit(e) {

        e.preventDefault();
        this.form.validateAll();
        let errors = this.form.getChildContext()._errors;
        console.log("this.form.getChildContext()._errors", errors.length);
        if (errors.length == 0) {
            let { email, password } = this.state;
            let _self = this;
            _self.setState({ loaded: false });
            _self.props.dispatch(setLoginPending(email, password));
            auth.doSignInWithEmailAndPassword(email, password).then(authUser=>{

                console.log("firestore sign in",authUser);
                _self.props.dispatch(setLoginSuccess(email, password, "Login Success"));
                localStorage.setItem('firebaseAuth', JSON.stringify(authUser));
                browserHistory.push('/');

            }).catch(error=>{
                console.log("firebase error", error);
                _self.setState({ loaded: true });
                _self.props.dispatch(setLoginError(email, password, error.message));
            });
            
            
        }

    }

    render() {
        console.log("this.state", this.state);

        return (
            <Loader loaded={this.state.loaded} zIndex={2e9}>
                <div className="col-md-6 col-md-offset-3">
                    <h2>Login</h2>
                    <Form name="loginForm" ref={c => { this.form = c }} onSubmit={this.onSubmit}>
                        <div>

                            <Input placeholder="Enter Email" className="form-control" type="text" name="email" id="email" validations={[All.required, All.email]} onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} />
                        </div>
                        <div>
                            <Input placeholder="Enter Password" className="form-control" type="password" name="password" id="password" validations={[All.required]} value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Login</button>

                            <Link to="/register" className="btn btn-link">Register</Link>
                            <SocialAuth></SocialAuth>
                        </div>
                        {/* <div>
                        <button type="submit">Login</button>
                    </div> */}
                    </Form>
                    <div>{this.props.loginResult && this.props.loginResult.loginStatus && <div>{this.props.loginResult.loginStatus}</div>}</div>
                    <div>{this.state.loginError && <div>{this.state.loginError}</div>}</div>
                </div>
            </Loader>

        );
    }





}

const mapStateToProps = (state) => {
    console.log("state", state.loginReducer);
    return {
        loginResult: state.loginReducer.loginResult,
        isLoggedIn: state.loginReducer.isLoggedIn

    }
}

export default connect(mapStateToProps)(LoginOLD);
