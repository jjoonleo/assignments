// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwUjwX7YfD_1VCsu6cn-mt90HLBJ77U_s",
  authDomain: "assignment-c0949.firebaseapp.com",
  projectId: "assignment-c0949",
  storageBucket: "assignment-c0949.appspot.com",
  messagingSenderId: "72272072768",
  appId: "1:72272072768:web:77102e4e5fd4b303c58fa5",
  measurementId: "G-S1HNQ6HT36"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
