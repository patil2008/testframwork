import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../config';

  if (!firebase.apps.length) {
  firebase.initializeApp(config.firebase);
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

export {
  auth,firebase,firestore
};