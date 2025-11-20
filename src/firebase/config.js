// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmn_7mB81xHYs7TH5orDecBdhzEY7HU4k",
  authDomain: "carrerai-genai.firebaseapp.com",
  projectId: "carrerai-genai",
  storageBucket: "carrerai-genai.appspot.com",  // Fixed the storage bucket URL
  messagingSenderId: "446989700886",
  appId: "1:446989700886:web:8f6c8e22b7282fb844ca37",
  measurementId: "G-KKXNGTW76W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };