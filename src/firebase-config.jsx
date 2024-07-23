// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxI09lXOq_eMjud0vqon9Jqjq83BAmIh0",
  authDomain: "fir-form-701f4.firebaseapp.com",
  projectId: "fir-form-701f4",
  storageBucket: "fir-form-701f4.appspot.com",
  messagingSenderId: "512855404528",
  appId: "1:512855404528:web:0f8be6c7125ae449a4b735",
  measurementId: "G-T4H94SXWGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);