import firebase from "firebase/compat/app";
import auth from "firebase/auth";
import "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

import "firebase/compat/firestore";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC35yIsMzl7fUGGfUOkb7TIpV9blygHEs4",
  authDomain: "improvemind-7b170.firebaseapp.com",
  projectId: "improvemind-7b170",
  storageBucket: "improvemind-7b170.appspot.com",
  messagingSenderId: "676174095819",
  appId: "1:676174095819:web:e124a9e2fc2ce2daa6024e",
  measurementId: "G-QFVQT3KSLC",
};
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
