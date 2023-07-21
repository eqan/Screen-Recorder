// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6F7l9HJfmMiTm0kA8xubBViyXdSzT9RI",
  authDomain: "microslush-screenrecorder.firebaseapp.com",
  projectId: "microslush-screenrecorder",
  storageBucket: "microslush-screenrecorder.appspot.com",
  messagingSenderId: "839789220945",
  appId: "1:839789220945:web:f864b02e0496ae1ca1d470",
  measurementId: "G-VRZFNMVXY0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
