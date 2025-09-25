import { db } from '../services/firebase.js';
import { collection, addDoc } from 'firebase/firestore';

// Importar productos de FakeStore
export const importFakeStoreProducts = async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();

    const productosRef = collection(db, 'productos');

    for (const product of products) {
      await addDoc(productosRef, {
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: product.rating?.rate || 0,   // ⭐ calificación promedio
        count: product.rating?.count || 0    // 📦 número de reseñas
      });
    }

    console.log('Productos importados a Firestore con éxito 🚀');
  } catch (error) {
    console.error('Error al importar productos:', error);
  }
};
