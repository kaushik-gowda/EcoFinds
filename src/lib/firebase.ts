import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "shopwave-83t21",
  "appId": "1:86692676897:web:d6c5ee897838d378522a60",
  "storageBucket": "shopwave-83t21.firebasestorage.app",
  "apiKey": "AIzaSyCb4NK9PIoUUnszqF2mcAfLMeoys0DkXwg",
  "authDomain": "shopwave-83t21.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "86692676897"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
