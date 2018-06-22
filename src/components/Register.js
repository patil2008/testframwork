import React, { Component } from 'react';

import * as Validation from '../validationHelper';
import { connect } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-bootstrap/lib/Button';
import SocialAuth from './SocialAuth';
import { auth, firebase } from '../services/firebase/index';
import { Link } from 'react-router';
import Loader from 'react-loader';
import HeaderLogin from './_core/HeaderLogin';
import Footer from './_core/footer';
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = { loaded: true,registerResult:false };
        this.onSubmit = this.onSubmit.bind(this);
        
    }

    onSubmit(e) {

        e.preventDefault();
        this.form.validateAll();
        let errors = this.form.getChildContext()._errors;
        if (errors.length == 0) {
            let _self = this;
            let params = this.state;
            console.log("params", params);
            _self.setState({ loaded: false });
            // this.props.dispatch(registerAction(params));

            auth.doCreateUserWithEmailAndPassword(params)
                .then(authUser => {
                    console.log("authUSer", authUser);
                    this.setState({registerResult:"Registered Successfully"});
                    _self.setState({ loaded: true,name:'',email:'',contact:'',password:'',cpassword:'' });
                })
                .catch(error => {
                    console.log("firebase error", error);
                    // _self.props.dispatch(registerAction(params));
                    this.setState({registerResult:error.message});
                    _self.setState({ loaded: true });
                });

            console.log("this state", _self.state);

        }

    }

    render() {


        return (
            <div>
            <HeaderLogin />
            <Loader loaded={this.state.loaded} zIndex={2e9}>
                <div className="col-md-6 col-md-offset-3">
                    <h2>Register</h2>

                    <Form name="registerForm" ref={c => { this.form = c }} onSubmit={this.onSubmit}>
                        
                        <div className='form-group'>
                            <Input placeholder="Enter Email" className="form-control" type="text" name="email" id="email" validations={[Validation.required, Validation.email]} required-message="Please enter email" onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} />
                        </div>
                        
                        <div className='form-group'>
                            <Input placeholder="Enter Password" className="form-control" type="password" name="password" id="password" validations={[Validation.required, Validation.checkEqual]} required-message="Please enter password" compare-message="Password are not equal" compare-field="cpassword" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                        </div>
                        <div className='form-group'>
                            <Input placeholder="Re-enter Password" className="form-control" required-message="Please re-enter email" type="password" name="cpassword" id="cpassword" validations={[Validation.required]} value={this.state.cpassword} onChange={(e) => this.setState({ cpassword: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <Button className="btn btn-primary" type="submit">Register</Button>

                            <SocialAuth></SocialAuth>
                        </div>
                    
                    </Form>
                    <div>{this.state.registerResult && <div>{this.state.registerResult}</div>}</div>
                </div>
            </Loader>
            <Footer/>
            </div>


        );
    }





}

const mapStateToProps = (state) => {
    console.log("state", state.registerReducer);
    return {
        // registerResult: (state.registerReducer.message)?state.registerReducer.message:'',
        // isRegister: state.registerReducer.status != 'error'

    }
}
export default connect(mapStateToProps)(Register);
