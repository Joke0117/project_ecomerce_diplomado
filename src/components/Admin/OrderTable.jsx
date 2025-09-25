import { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase.js';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'orders', id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Usuario</th>
            <th className="px-4 py-2 border">Productos</th>
            <th className="px-4 py-2 border">Total</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-2 border">{order.id}</td>
              <td className="px-4 py-2 border">{order.userEmail}</td>
              <td className="px-4 py-2 border">
                {order.items.map(item => `${item.title} (x${item.quantity})`).join(', ')}
              </td>
              <td className="px-4 py-2 border">${order.total.toFixed(2)}</td>
              <td className="px-4 py-2 border">
                <button 
                  onClick={() => handleDelete(order.id)} 
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;