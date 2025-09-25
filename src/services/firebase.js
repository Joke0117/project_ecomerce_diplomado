import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB0cWbd0H7Ib0AKSsTtfEoWOl1fW-J1CXo",
  authDomain: "ecommerce-1d22a.firebaseapp.com",
  projectId: "ecommerce-1d22a",
  storageBucket: "ecommerce-1d22a.firebasestorage.app",
  messagingSenderId: "566381324266",
  appId: "1:566381324266:web:efee78eb9f26d4ad203493"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);