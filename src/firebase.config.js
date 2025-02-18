import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Tu configuración actual de Firebase
  apiKey: "AIzaSyCrJTk0-eePPJxOogYYjguHikambSKspIw",
  authDomain: "landing-nodefleet.firebaseapp.com",
  projectId: "landing-nodefleet",
  storageBucket: "landing-nodefleet.appspot.com",
  messagingSenderId: "73192320150",
  appId: "1:73192320150:web:b396bd8457ebb9d863e6b7",
  measurementId: "G-EK7E6FH5DX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 