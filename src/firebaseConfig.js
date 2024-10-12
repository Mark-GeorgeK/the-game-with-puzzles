// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALx48DA82IKretxVItW6CBL0LptiTVcY0",
  authDomain: "the-game-with-puzzles.firebaseapp.com",
  projectId: "the-game-with-puzzles",
  storageBucket: "the-game-with-puzzles.appspot.com",
  messagingSenderId: "1087051254817",
  appId: "1:1087051254817:web:709f62611e03e328dd6760"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
