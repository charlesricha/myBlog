// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "pixel-chronicles-1f1ol",
  appId: "1:755162815313:web:964eb093856040e1461170",
  storageBucket: "pixel-chronicles-1f1ol.appspot.com",
  apiKey: "AIzaSyAoUQsg5wNZK8g6Xk1r69pnlzZPxZK5XtA",
  authDomain: "pixel-chronicles-1f1ol.firebaseapp.com",
  messagingSenderId: "755162815313",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
