// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6kS4zp3pqb5yPZaj2VU1Uk2vb_vSwD4U",
  authDomain: "house-marketplace-app-883ca.firebaseapp.com",
  projectId: "house-marketplace-app-883ca",
  storageBucket: "house-marketplace-app-883ca.appspot.com",
  messagingSenderId: "320121916173",
  appId: "1:320121916173:web:4f544444a1bcfa569a3e44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore()