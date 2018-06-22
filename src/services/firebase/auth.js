import { auth } from 'firebase';
// Sign Up
export const doCreateUserWithEmailAndPassword = (params) =>
  auth().createUserWithEmailAndPassword(params['email'], params['password']);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth().signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
  auth().signOut();

// Password Reset
export const doPasswordReset = (email) =>
  auth().sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);

export const socialSignup = (type) => {
  let provider;
  if(type == 'facebook')
  {
    provider = new auth.FacebookAuthProvider();
  }
  if(type == 'google')
  {
    provider = new auth.GoogleAuthProvider();
  }
  
  provider.setCustomParameters({
    'display': 'popup'
  });
  return auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    console.log("token",token);
    // The signed-in user info.
    var user = result.user;
    localStorage.setItem('firebaseAuth', JSON.stringify(result.additionalUserInfo));
    return Promise.resolve(result);
    // ...
  }).catch(function (error) {
    console.log("fb login error",error);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    return Promise.reject(error);
    // ...
  });
}