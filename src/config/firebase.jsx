// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-muM_rPqeqvDfvM7B0ITtaze_fLeG0Do",
  authDomain: "e-com-app-a6f5a.firebaseapp.com",
  projectId: "e-com-app-a6f5a",
  storageBucket: "e-com-app-a6f5a.firebasestorage.app",
  messagingSenderId: "531520547642",
  appId: "1:531520547642:web:824d38a7b659302673fe03",
  measurementId: "G-1F4SN5673C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app)
const storage = getStorage(app)

export { analytics, auth, firestore, storage }