import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBUzLiEOBDyut5bgJn9Ghs5sv5afKtwhcg",
  authDomain: "photofolio-6f75e.firebaseapp.com",
  projectId: "photofolio-6f75e",
  storageBucket: "photofolio-6f75e.firebasestorage.app",
  messagingSenderId: "935760451247",
  appId: "1:935760451247:web:f2c737955380cb16a5a65a",
  measurementId: "G-LB3739PF08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
