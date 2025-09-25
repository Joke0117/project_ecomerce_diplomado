import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { StarIcon, ShoppingBagIcon, ArrowLeftIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useCarrito } from '../context/CarritoContext.jsx';
import { useDescuento } from '../context/DescuentoContext.jsx';

const DetallesPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCarrito } = useCarrito();
  const { precioConDescuento } = useDescuento();

  useEffect(() => {
    api.getProductById(id).then(data => {
      data.discount = data.category === 'electronics' ? 10 : 0;
      setProduct(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
      <div className="text-[#1a1a1a] text-xl font-serif">Cargando...</div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
      <div className="text-[#1a1a1a] text-xl font-serif">Producto no encontrado</div>
    </div>
  );

  const price = precioConDescuento ? precioConDescuento(product.price) : product.price;
  const originalPrice = product.price;
  const discount = product.discount || 0;

  return (
    <div className="min-h-screen bg-[#f8f8f8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Volver a la tienda */}
        <Link
          to="/tienda"
          className="inline-flex items-center text-[#1a1a1a] hover:text-[#d4af37] transition-colors mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 text-[#1a1a1a] group-hover:text-[#d4af37]" />
          <span className="font-serif text-lg">Volver a la Tienda</span>
        </Link>

        {/* Contenedor principal del producto */}
        <div className="bg-white border border-[#e5e5e5] rounded-none shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* Imagen del producto */}
            <div className="md:w-1/2 p-6 flex items-center justify-center bg-[#f9f9f9]">
              <img
                src={product.image}
                alt={product.title}
                className="w-full max-w-md object-contain"
              />
            </div>

            {/* Detalles del producto */}
            <div className="md:w-1/2 p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#1a1a1a] font-serif mb-2">{product.title}</h1>

              </div>

              <div className="mb-8">
                <div className="text-2xl font-bold text-[#1a1a1a] mb-2">
                  ${price.toFixed(2)}
                  {discount > 0 && (
                    <span className="ml-2 text-[#666] line-through">${originalPrice.toFixed(2)}</span>
                  )}
                </div>
                {discount > 0 && (
                  <div className="flex items-center">
                    <span className="bg-[#d4af37] text-[#1a1a1a] text-xs font-bold px-2 py-1 rounded-sm">
                      -{discount}% DESCUENTO
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#1a1a1a] font-serif mb-3">Descripción</h3>
                <p className="text-[#666] leading-relaxed">{product.description}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#1a1a1a] font-serif mb-3">Categoría</h3>
                <span className="inline-block bg-[#f0f0f0] text-[#666] px-3 py-1 rounded-sm text-sm">
                  {product.category}
                </span>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => addToCarrito(product)}
                  className="flex-1 flex items-center justify-center bg-[#1a1a1a] text-white py-3 px-6 border border-[#1a1a1a] hover:bg-[#333] transition-colors group"
                >
                  <ShoppingBagIcon className="h-5 w-5 mr-2 text-[#d4af37] group-hover:text-[#b89a2a]" />
                  <span>Agregar al Carrito</span>
                </button>
                <Link
                  to="/carrito"
                  className="flex-1 flex items-center justify-center bg-transparent text-[#1a1a1a] py-3 px-6 border border-[#e5e5e5] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
                >
                  <CurrencyDollarIcon className="h-5 w-5 mr-2 text-[#666] group-hover:text-[#d4af37]" />
                  <span>Comprar Ahora</span>
                </Link>
              </div>

              {/* WhatsApp */}
              <div className="mt-6">
                <a
                  href={`https://wa.me/1234567890?text=Hola, quiero consultar sobre ${product.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#d4af37] hover:text-[#b89a2a] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.17 11.33L8.59 9.91L11 12.33l7.17-7.17L20 7.33l-8 8z" />
                  </svg>
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesPage;
