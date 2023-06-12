// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGEvzqU3wu8bye-DZcPtZ3wP0VmtYz240",
  authDomain: "proyecto1-15a67.firebaseapp.com",
  databaseURL: "https://proyecto1-15a67.firebaseio.com",
  projectId: "proyecto1-15a67",
  storageBucket: "proyecto1-15a67.appspot.com",
  messagingSenderId: "1006291162559",
  appId: "1:1006291162559:web:992c439a676bcab266bd0a",
  measurementId: "G-7DKJ01YMYK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const FirebaseAuth = getAuth(app)
export const db = getFirestore(app);