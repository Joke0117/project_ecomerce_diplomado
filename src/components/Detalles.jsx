import { useCarrito } from '../context/CarritoContext.jsx';
import { useDescuento } from '../context/DescuentoContext.jsx';
import { Link } from 'react-router-dom';

const Detalles = ({ product }) => {
  const { addToCarrito } = useCarrito();
  const { precioConDescuento } = useDescuento();
  const price = precioConDescuento ? precioConDescuento(product.price) : product.price;
  const originalPrice = product.price;
  const discount = product.discount || 0; // Asume que algunos productos tienen discount (simulado)

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <img src={product.image} alt={product.title} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="mb-4">
        <p className="text-2xl font-bold text-green-600">${price.toFixed(2)}</p>
        {discount > 0 && (
          <p className="text-gray-500 line-through">${originalPrice.toFixed(2)}</p>
        )}
        {discount > 0 && (
          <span className="bg-red-500 text-white px-2 py-1 rounded text-sm ml-2">
            -{discount}%
          </span>
        )}
      </div>
      <button 
        onClick={() => addToCarrito(product)} 
        className="bg-green-500 text-white py-2 px-4 rounded mr-2 hover:bg-green-600"
      >
        Agregar al Carrito
      </button>
      <Link 
        to="/carrito" 
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Comprar Ahora
      </Link>
      <div className="mt-4">
        <a 
          href={`https://wa.me/1234567890?text=Hola, quiero comprar ${product.title}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-green-500 underline"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
};

export default Detalles;