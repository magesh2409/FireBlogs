import firebase from "firebase/app";
import "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyB0dCbcRzsi5pYwkXLM8F-bZWm6ZmsR874",
    authDomain: "fireblogs-8c7a5.firebaseapp.com",
    projectId: "fireblogs-8c7a5",
    storageBucket: "fireblogs-8c7a5.firebasestorage.app",
    messagingSenderId: "76123833092",
    appId: "1:76123833092:web:b60c791a71ab82218fc651"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {timestamp};
export default firebaseApp.firestore();