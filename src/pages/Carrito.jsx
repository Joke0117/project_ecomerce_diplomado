import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext.jsx';
import { useDescuento } from '../context/DescuentoContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import  CartItem  from '../components/Itemcart.jsx';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase.js';

const Carrito = () => {
  const { carrito, total, clearCarrito } = useCarrito();
  const { descuento, cupon, applyCupon, clearCupon, precioConDescuento } = useDescuento();
  const { user } = useAuth();
  const [cuponCode, setCuponCode] = useState('');
  const navigate = useNavigate();
  const [confirmando, setConfirmando] = useState(false);

  const subtotal = total;
  const descuentoTotal = subtotal * (descuento / 100);
  const totalFinal = subtotal - descuentoTotal;

  const handleApplyCupon = () => {
    const applied = applyCupon(cuponCode);
    if (applied > 0) {
      setCuponCode('');
    } else {
      alert('Cupón inválido');
    }
  };

  const handleConfirmar = async () => {
    if (!user) {
      alert('Debes iniciar sesión para confirmar la compra');
      navigate('/login');
      return;
    }
    setConfirmando(true);
    try {
      // Guarda orden en Firestore
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        userEmail: user.email,
        items: carrito.map(item => ({ ...item, price: precioConDescuento ? precioConDescuento(item.price) : item.price })),
        subtotal,
        descuentoTotal,
        total: totalFinal,
        date: new Date().toISOString()
      });
      clearCarrito();
      clearCupon();
      alert('¡Orden confirmada! Revisa tu email.');
      navigate('/tienda');
    } catch (error) {
      console.error('Error al confirmar orden:', error);
      alert('Error al procesar la orden');
    }
    setConfirmando(false);
  };

  if (carrito.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Tu Carrito está Vacío</h1>
        <Link to="/tienda" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Ir a la Tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>
      <div className="space-y-4 mb-6">
        {carrito.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      
      {/* Cupón */}
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <input 
          type="text" 
          placeholder="Código de cupón" 
          value={cuponCode} 
          onChange={(e) => setCuponCode(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <button onClick={handleApplyCupon} className="bg-yellow-500 text-white py-2 px-4 rounded">
          Aplicar
        </button>
        {cupon && <p className="mt-2 text-green-600">Cupón {cupon} aplicado: -{descuento}%</p>}
      </div>

      {/* Totales */}
      <div className="text-right space-y-2 mb-4">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        {descuento > 0 && <p>Descuento: -${descuentoTotal.toFixed(2)}</p>}
        <p className="text-2xl font-bold">Total: ${totalFinal.toFixed(2)}</p>
      </div>

      <div className="flex justify-end space-x-4">
        <Link to="/tienda" className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
          Continuar Comprando
        </Link>
        <button 
          onClick={handleConfirmar} 
          disabled={confirmando}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {confirmando ? 'Confirmando...' : 'Confirmar Compra'}
        </button>
      </div>
    </div>
  );
};

export default Carrito;