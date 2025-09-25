import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase.js';

export const authService = {
  register: async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Crea doc en Firestore para user
    await setDoc(doc(db, 'users', userCredential.user.uid), { email });
    return userCredential.user;
  },
  login: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },
  logout: async () => {
    await signOut(auth);
  },
};