import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import Card from '../components/Card.jsx';
import { ChevronLeftIcon, ChevronRightIcon, ShoppingBagIcon, FireIcon } from '@heroicons/react/24/outline';

const Inicio = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [popular, setPopular] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleCategoryClick = (category) => {
    navigate(`/tienda?category=${encodeURIComponent(category.value)}`);
  };

  const categories = [
    { name: 'Electrónicos', value: 'electronics', icon: '📱' },
    { name: 'Joyería', value: 'jewelery', icon: '💍' },
    { name: 'Ropa Hombre', value: "men's clothing", icon: '👔' },
    { name: 'Ropa Mujer', value: "women's clothing", icon: '👗' },
  ];



  useEffect(() => {
    api.getProducts().then((data) => {
      setProducts(data);

      // 🔥 Productos destacados → los primeros 5
      setFeatured(data.slice(0, 5));

      // ⭐ Productos populares → ordenados por count (reseñas)
      const populares = [...data]
        .sort((a, b) => (b.count || 0) - (a.count || 0))
        .slice(0, 8);
      setPopular(populares);
    });
  }, []);

  // Funciones de navegación
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % featured.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + featured.length) % featured.length);

  // Autoplay cada 5s
  useEffect(() => {
    if (featured.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featured]);

  return (
    <div className="min-h-screen bg-[#f8f8f8] font-sans">
      {/* Carrusel de productos destacados */}
      <section className="py-16 px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-[#1a1a1a] mb-10 font-serif">
          Productos Destacados
        </h2>
        <div className="relative overflow-hidden rounded-none">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {featured.map((product) => (
              <div key={product.id} className="min-w-full px-2">
                <Card
                  product={product}
                  className="bg-white rounded-none shadow-none border border-[#e5e5e5] hover:shadow-lg transition-all duration-300"
                />
              </div>
            ))}
          </div>
          {/* Botones navegación */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-[#f0f0f0] border border-[#e5e5e5]"
          >
            <ChevronLeftIcon className="h-6 w-6 text-[#1a1a1a]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-[#f0f0f0] border border-[#e5e5e5]"
          >
            <ChevronRightIcon className="h-6 w-6 text-[#1a1a1a]" />
          </button>
        </div>

        {/* Indicadores (puntos) */}
        <div className="flex justify-center mt-6 space-x-2">
          {featured.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-[#d4af37]'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Productos Populares */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white border-t border-[#e5e5e5]">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-[#1a1a1a] font-serif flex items-center">
            <FireIcon className="h-8 w-8 text-[#d4af37] mr-2" />
            Más Populares
          </h2>
          <Link
            to="/tienda"
            className="text-[#1a1a1a] font-medium hover:text-[#d4af37] transition-colors"
          >
            Ver más →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popular.map((product) => (
            <Card
              key={product.id}
              product={product}
              className="bg-white rounded-none shadow-sm border border-[#e5e5e5] hover:shadow-lg hover:border-[#d4af37] transition-all duration-300"
            />
          ))}
        </div>
      </section>

      {/* Secciones de categorías */}
      <section className="py-16 px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-[#1a1a1a] mb-10 font-serif">
          Categorías
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryClick(cat)}
              className="bg-white p-8 rounded-none border border-[#e5e5e5] hover:border-[#d4af37] transition-all duration-300 flex flex-col items-center text-center group"
            >
              <span className="text-4xl mb-3 group-hover:text-[#d4af37]">
                {cat.icon}
              </span>
              <span className="text-[#1a1a1a] font-medium group-hover:text-[#d4af37]">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* CTA Luxury */}
      <section className="py-20 px-4 sm:px-8 lg:px-16 text-center bg-[#1a1a1a] text-white">
        <h2 className="text-3xl font-bold mb-6 font-serif">
          Descubre Nuestra Colección Exclusiva
        </h2>
        <Link
          to="/tienda"
          className="inline-flex items-center px-8 py-4 border-2 border-[#d4af37] text-base font-medium rounded-none text-[#1a1a1a] bg-[#d4af37] hover:bg-[#b89a2a] transition-all duration-300"
        >
          EXPLORAR TIENDA
          <ShoppingBagIcon className="ml-3 h-5 w-5" />
        </Link>
      </section>
    </div>
  );
};

export default Inicio;