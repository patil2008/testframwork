
import React from "react";
import {connect} from "react-redux";
import { Link, browserHistory } from 'react-router';
import { Navbar, Grid,Header } from 'react-bootstrap';
const HeaderLogin = (props) => {
  return (
    <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>              
              <Navbar.Toggle >
              <Link to="/" className="btn btn-link">Login</Link>|<Link to="/register" className="btn btn-link">Signup</Link>
              </Navbar.Toggle >
            </Navbar.Header>
          </Grid>
        </Navbar>
        
      </div>
    
  );
};

export default HeaderLogin;
