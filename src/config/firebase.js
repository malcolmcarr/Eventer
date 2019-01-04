import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import keys from '../credentials/keys';

const firebaseConfig = {
  apiKey: keys.fireBaseAPIKey,
  authDomain: "ventually-72c13.firebaseapp.com",
  databaseURL: "https://ventually-72c13.firebaseio.com",
  projectId: "ventually-72c13",
  storageBucket: "ventually-72c13.appspot.com",
  messagingSenderId: "14837710919"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);

export default firebase;