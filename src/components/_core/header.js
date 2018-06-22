import React,{Component} from "react";
import {connect} from "react-redux";
import { Navbar, Grid } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';
import { auth, firebase } from '../../services/firebase/index';
class Header extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
              auth.doSignOut().then(logoutResponse => {
                  console.log("firebase logout", logoutResponse);
      
                  localStorage.removeItem('firebaseAuth');
                  browserHistory.push('/');
              }).catch(error=>{
      
              });
          }
  render(){
    return(
      <div>
          
          <Navbar inverse fixedTop>
            <Grid>
              <Navbar.Header>              
                <Navbar.Toggle >
                  <Link to="/" className="btn btn-link">Home</Link>
                  <Link to="/category" className="btn btn-link">Category</Link>
                </Navbar.Toggle >
                <Navbar.Toggle >
                  <button onClick={this.logout}>Logout</button>
                </Navbar.Toggle >
              </Navbar.Header>
            </Grid>
          </Navbar>
          
        </div>
      
    );
  } 
};

export default Header;
