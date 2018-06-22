import React, { Component } from 'react';
import store from './../store';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import IsLoggedInContainer from './IsLoggedInContainer';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Category from './Category';
import SocialAuth from './SocialAuth';
import config from '../config';

import { connect } from 'react-redux';
class App extends Component {


    render() {
        const history = syncHistoryWithStore(browserHistory, store);
        
        return (
            <Router history={history}>

                <Route path="/" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route component={IsLoggedInContainer}  >
                    <Route path="/home" component={Home}></Route>
                    <Route path="/category" component={Category}></Route>
                </Route>
            </Router>
        );
    }
}



function consoleLog(arg1, arg2, arg3, arg4) {
    if (!config.production) {
        console.log(arg1, arg2, arg3, arg4);
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        consoleLog: () => {
            dispatch(consoleLog());
        }
        
    }
};

function mapStateToProps(state) {
    return {consoleLog:consoleLog(state)};
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
