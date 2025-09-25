import { useCarrito } from '../context/CarritoContext.jsx';
import { useDescuento } from '../context/DescuentoContext.jsx';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCarrito } = useCarrito();
  const { precioConDescuento } = useDescuento();
  const price = precioConDescuento ? precioConDescuento(item.price) : item.price;

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
      <div className="flex-1 ml-4">
        <h3 className="font-bold">{item.title}</h3>
        <p className="text-gray-600">${price.toFixed(2)} x {item.quantity}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => updateQuantity(item.id, item.quantity - 1)} 
          className="bg-gray-300 px-2 py-1 rounded"
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)} 
          className="bg-gray-300 px-2 py-1 rounded"
        >
          +
        </button>
        <button 
          onClick={() => removeFromCarrito(item.id)} 
          className="bg-red-500 text-white px-2 py-1 rounded ml-2"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;