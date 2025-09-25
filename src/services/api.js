import { db } from './firebase.js';
import { 
  collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc 
} from 'firebase/firestore';

const productosRef = collection(db, 'productos');

export const api = {
  // Obtener todos los productos
  getProducts: async () => {
    const snapshot = await getDocs(productosRef);
    return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
  },

  // Obtener un producto por ID
  getProductById: async (id) => {
    const snap = await getDoc(doc(db, 'productos', id));
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }
    throw new Error('Producto no encontrado');
  },

  // Crear producto
  createProduct: async (product) => {
    const docRef = await addDoc(productosRef, product);
    return { id: docRef.id, ...product };
  },

  // Actualizar producto
  updateProduct: async (id, product) => {
    await updateDoc(doc(db, 'productos', id), product);
    return { id, ...product };
  },

  // Eliminar producto
  deleteProduct: async (id) => {
    await deleteDoc(doc(db, 'productos', id));
    return id;
  },
};
