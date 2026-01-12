// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBndT9ZS3V0N4AQ-6pG4XD3uAnxKr2k0n8",
  authDomain: "sn-expensetracker.firebaseapp.com",
  projectId: "sn-expensetracker",
  storageBucket: "sn-expensetracker.firebasestorage.app",
  messagingSenderId: "78853442462",
  appId: "1:78853442462:web:61f51d2143dbd418d8a48f",
  measurementId: "G-KLHJL553SN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

