// This file is for server-side Firebase initialization
import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  projectId: "pixel-chronicles-1f1ol",
  appId: "1:755162815313:web:964eb093856040e1461170",
  storageBucket: "pixel-chronicles-1f1ol.appspot.com",
  apiKey: process.env.FIREBASE_API_KEY, // Use environment variable for server
  authDomain: "pixel-chronicles-1f1ol.firebaseapp.com",
  messagingSenderId: "755162815313",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };
