import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC_T3Kw0OpYub13_c4vmG9Th839DE8BUOc",
  authDomain: "f-a-c-e-b-o-o--k.firebaseapp.com",
  projectId: "f-a-c-e-b-o-o--k",
  storageBucket: "f-a-c-e-b-o-o--k.appspot.com",
  messagingSenderId: "118575338412",
  appId: "1:118575338412:web:c312d75249fa60e616a009",
  measurementId: "G-0H1NMVZFGX",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
export { storage, auth, provider };
export default db;
