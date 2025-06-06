import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCoHjDrMtMrNLllpFDZpTQw4-oq7qoalFc",
  authDomain: "change-lms.firebaseapp.com",
  projectId: "change-lms",
  storageBucket: "change-lms.firebasestorage.app",
  messagingSenderId: "172184355270",
  appId: "1:172184355270:web:5aa19f0480788c255bf2c7",
  measurementId: "G-EHMG7GZ0Z6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
