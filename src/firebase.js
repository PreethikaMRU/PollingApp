// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDk-zoMOboe_ceChtHlkrrRstv4PfQGWSg",
  authDomain: "polling-app-e8314.firebaseapp.com",
  projectId: "polling-app-e8314",
  storageBucket: "polling-app-e8314.appspot.com",
  messagingSenderId: "186136227700",
  appId: "1:186136227700:web:cd1752f34fe4b8884ac621"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);