// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzzBnhp9LIcX8HF8tlbQ38nLFQKcJbHlY",
  authDomain: "projeto-pb-5866f.firebaseapp.com",
  projectId: "projeto-pb-5866f",
  storageBucket: "projeto-pb-5866f.appspot.com",
  messagingSenderId: "674122161381",
  appId: "1:674122161381:web:d1819da0f8f6312a75080c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
