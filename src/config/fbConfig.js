import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBAuAP5u6iYP40iH5D2qWpwFvE6Gr-VvbQ",
    authDomain: "react-firebase-98ede.firebaseapp.com",
    databaseURL: "https://react-firebase-98ede.firebaseio.com",
    projectId: "react-firebase-98ede",
    storageBucket: "react-firebase-98ede.appspot.com",
    messagingSenderId: "4851100155",
    appId: "1:4851100155:web:e3c084396a0dd6ae79c35e",
    measurementId: "G-RNBG6RVQVY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;