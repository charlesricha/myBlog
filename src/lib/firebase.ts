// This file is for client-side Firebase initialization
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "pixel-chronicles-1f1ol",
  appId: "1:755162815313:web:964eb093856040e1461170",
  storageBucket: "pixel-chronicles-1f1ol.appspot.com",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pixel-chronicles-1f1ol.firebaseapp.com",
  messagingSenderId: "755162815313",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // Client-side auth

export { app, db, storage, auth };
