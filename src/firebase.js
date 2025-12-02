// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // ✅ add this line

const firebaseConfig = {
  apiKey: "AIzaSyD65DWq_F6Z3r9jcPuj4OmRHHManZBV-sQ",
  authDomain: "gokulwebsite-de84a.firebaseapp.com",
  projectId: "gokulwebsite-de84a",
  storageBucket: "gokulwebsite-de84a.appspot.com", // ✅ fix: corrected the storageBucket URL
  messagingSenderId: "1029154691068",
  appId: "1:1029154691068:web:5dd1ffa25eb0fcca640479",
  measurementId: "G-4PM2KQJVVD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export everything needed across your app
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // ✅ added this
