import { Link } from 'react-router-dom';
import { useDescuento } from '../context/DescuentoContext.jsx';
import { useCarrito } from '../context/CarritoContext.jsx';
import Descuento from './Descuento.jsx';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

const Card = ({ product }) => {
  const { precioConDescuento } = useDescuento();
  const { addToCarrito } = useCarrito();

  const price = precioConDescuento ? precioConDescuento(product.price) : product.price;
  const originalPrice = product.discount ? product.price : null;

  // Rating
  const rating = product.rating || 0;
  const count = product.count || 0;

  const handleAgregar = () => {
    addToCarrito(product, 1);
  };

  return (
    <div className="bg-white rounded-none border border-[#e5e5e5] hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden group flex flex-col">
      {/* Imagen */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        {product.discount && (
          <div className="absolute top-3 right-3">
            <Descuento porcentaje={product.discount} />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-[#1a1a1a] font-bold text-lg mb-2 line-clamp-2 font-sans group-hover:text-[#d4af37] transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${i < Math.round(rating) ? 'text-[#d4af37]' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-sm text-gray-500 ml-1">({count})</span>
          </div>

          {/* Precios */}
          <div className="flex items-center gap-2 mb-4">
            {originalPrice && (
              <span className="text-[#999] text-sm line-through font-serif">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-[#1a1a1a] font-bold text-xl font-serif">
              ${price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col gap-2 mt-auto">
          <Link
            to={`/detalles/${product.id}`}
            className="w-full bg-[#1a1a1a] text-white py-3 px-4 text-center font-medium transition-colors duration-200 hover:bg-[#333] border border-[#1a1a1a] hover:border-[#333] font-sans rounded-md"
          >
            Ver Detalles
          </Link>

          <button
            onClick={handleAgregar}
            className="w-full flex items-center justify-center gap-2 bg-[#d4af37] text-[#1a1a1a] py-3 px-4 font-medium hover:bg-[#b89a2a] border border-[#d4af37] hover:border-[#b89a2a] rounded-md transition-colors duration-200"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
