import React from "react";
import {browserHistory} from 'react-router';
import {LoginForm} from 'g6reactlogin';
import HeaderLogin from './_core/HeaderLogin';
import Footer from './_core/footer';
import {auth} from '../services/firebase/index';
import SocialAuth from './SocialAuth';
import { Link } from 'react-router';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

 
    handleSubmit(user, status){

        console.log(user, status);

        auth.doSignInWithEmailAndPassword(user.email, user.password).then(authUser=>{

            localStorage.setItem('firebaseAuth',authUser);
            browserHistory.push('/home');

        }).catch(error=>{
            console.log("firebase sign in error", error);
            
        });
        
        
    }
 	render() {
        const config = {
			handleSubmit:this.handleSubmit,
			//Password Regex Check for at least 8 characters, including 1 uppercase and 1 number.
			passwordPattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{7,}\S$/,
			//Email Regex Check for Valid Email Format.
			emailPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			usernameLabel: 'Email',
			passwordLabel: 'Password',
			rememberMeLabel: 'Remember Me',
			usernameErrorText: 'Please enter valid Email',
			passwordErrorText: 'Please enter valid Password',
        }
        return(            
            <div>
                <HeaderLogin />
                    <LoginForm config={config} />
                    
                    <SocialAuth></SocialAuth>
                <Footer />
            </div>
        );
  	}
}
export default App;