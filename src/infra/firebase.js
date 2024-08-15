// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ1Fku-_4J6Kqb3uEJJdLAxtMvmpfaEIE",
  authDomain: "react-add90.firebaseapp.com",
  projectId: "react-add90",
  storageBucket: "react-add90.appspot.com",
  messagingSenderId: "432005302220",
  appId: "1:432005302220:web:e41bb989e98c9735e57f69",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
