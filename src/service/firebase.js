// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // 🚀 Add this for auth!

const firebaseConfig = {
  apiKey: "AIzaSyCpBwcogEDN65SatETCRWwWQtaRVcrQJXc",
  authDomain: "react-app-6.firebaseapp.com",
  projectId: "react-app-6",
  storageBucket: "react-app-6.appspot.com",   // ⚡ Fix spelling mistake here
  messagingSenderId: "477498696455",
  appId: "1:477498696455:web:38c9e66062926e1a09dba2",
  measurementId: "G-5N3M7XMK6M"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app); // 🚀 Create auth object

const saveHistory = async (url, result) => {
  try {
    await addDoc(collection(db, 'history'), {
      url,
      result,
      timestamp: new Date(),
    });
  } catch (e) {
    console.error('Error saving to Firestore', e);
  }
};

// 🚀 Now export auth too!
export { db, auth, saveHistory };

