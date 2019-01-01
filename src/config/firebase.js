import firebase from 'firebase'
import keys from '../credentials/keys';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: keys.fireBaseAPIKey,
  authDomain: "ventually-72c13.firebaseapp.com",
  databaseURL: "https://ventually-72c13.firebaseio.com",
  projectId: "ventually-72c13",
  storageBucket: "",
  messagingSenderId: "14837710919"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);

export default firebase;