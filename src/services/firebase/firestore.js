import { firestore } from 'firebase';
console.log("firestore",firestore);
// Sign Up
export const addData = (params) => 
  firestore().createUserWithEmailAndPassword(params['email'], params['password']);
  
// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  firestore().signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
  firestore().signOut();

// Password Reset
export const doPasswordReset = (email) =>
  firestore().sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
  firestore.currentUser.updatePassword(password);