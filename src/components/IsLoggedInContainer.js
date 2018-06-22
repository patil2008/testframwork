import React, { Component } from 'react';
import store from './../store';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

class IsLoggedInContainer extends React.Component {
  constructor(props){
    super(props);
    
    
  }  
  componentDidMount() {
      const { dispatch, currentURL } = this.props;
      
      
      if(!localStorage.getItem('firebaseAuth'))
      {
        browserHistory.replace("/");
      }
    }
  
    render() {
      
      if (localStorage.getItem('firebaseAuth')) {
        return this.props.children;
      } else {
        return null;
      }
    }
  }
  
  // Grab a reference to the current URL. If this is a web app and you are
  // using React Router, you can use `ownProps` to find the URL. Other
  // platforms (Native) or routing libraries have similar ways to find
  // the current position in the app.
  function mapStateToProps(state, ownProps) {
    return {
      isLoggedIn: state.loggedIn,
      currentURL: ownProps.location.pathname
    }
  }
  
  export default connect(mapStateToProps)(IsLoggedInContainer)