// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi333D2hlT66pn1ZmKnobLFZnCE4v7X-Y",
  authDomain: "crud-fb7a7.firebaseapp.com",
  databaseURL: "https://crud-fb7a7-default-rtdb.firebaseio.com",
  projectId: "crud-fb7a7",
  storageBucket: "crud-fb7a7.appspot.com",
  messagingSenderId: "260827575023",
  appId: "1:260827575023:web:e24ff69f37a8cc2bf2e11a",
  measurementId: "G-DQ711TZ55H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


export default db