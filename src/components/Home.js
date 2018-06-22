import React, { Component } from 'react';

import Header from './_core/header';
import Footer from './_core/footer';

class Home extends Component {
    constructor(props){
        super(props);
        
    }
   
    render() {
        return (
            <div>
                <Header />
                <div className="message">
                   Gate6 Dashboard 
                </div>
                <Footer />
            </div>

        );
    }
}

export default Home;


// import React, { Component } from 'react';
// import { Link, browserHistory } from 'react-router';
// import { auth, firebase } from '../services/firebase/index';
// class Home extends Component {
//     constructor(props) {
//         super(props);
//         this.logout = this.logout.bind(this);
//     }


//     logout() {
//         auth.doSignOut().then(logoutResponse => {
//             console.log("firebase logout", logoutResponse);

//             localStorage.removeItem('loginUser');
//             browserHistory.push('/login');
//         }).catch(error=>{

//         });
//     }
//     render() {
//         return (
//             <div>

//                 <div>
//                     <Link to="/category">Category</Link>

//                     <button onClick={this.logout}>Logout</button>
//                 </div>



//             </div>

//         );
//     }
// }

// export default Home;