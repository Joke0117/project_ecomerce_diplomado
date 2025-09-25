import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../services/api.js';
import Card from '../components/Card.jsx';
import { useDescuento } from '../context/DescuentoContext.jsx';
import { FunnelIcon, MagnifyingGlassIcon, TagIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Producto = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { applyCupon } = useDescuento();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const catFromUrl = searchParams.get('category');
    if (catFromUrl) {
      setCategory(catFromUrl);
    }

    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.search]);

  useEffect(() => {
    api.getProducts().then(data => {
      setProducts(data);
      const cats = [...new Set(data.map(p => p.category).filter(Boolean))];
      setCategories(cats);
      setFiltered(data);
    });
  }, []);

  useEffect(() => {
    let result = products;
    if (search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) {
      result = result.filter(p => p.category === category);
    }
    result = result.map(p => ({
      ...p,
      discount: p.category === 'electronics' ? 10 : 0
    }));
    setFiltered(result);
  }, [search, category, products]);

  const clearFilters = () => {
    setSearch('');
    setCategory('');
  };

  return (
     <div className="min-h-screen bg-[#f8f8f8] pt-36 lg:pt-24 pb-4">
      {/* Header fijo (ancho completo) */}
      <div className="fixed top-0 left-0 right-0 bg-[#f8f8f8] pt-20 pb-4 z-10 border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#1a1a1a] font-serif mb-2">
            Nuestra Colección
          </h1>
          <p className="text-[#666] text-lg">
            Descubre lo último en diseño y calidad excepcional.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Sidebar de filtros (fijo en desktop) */}
          <div className="pt-10 lg:w-1/4 lg:sticky lg:top-32 lg:self-start lg:h-fit hidden lg:block">
            <div className="bg-white border border-[#e5e5e5] rounded-none p-6">
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-6 font-serif">Filtros</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#666] mb-2">Buscar</label>
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#666]" />
                    <input
                      type="text"
                      placeholder="Buscar por nombre..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-[#e5e5e5] rounded-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#666] mb-2">Categoría</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-3 pr-4 py-2 border border-[#e5e5e5] rounded-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all appearance-none"
                  >
                    <option value="">Todas las categorías</option>
                    {categories.map((cat, i) => (
                      <option key={`cat-${i}`} value={cat || ''} className="capitalize">
                        {(cat || '').replace(/'/g, "’")}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={clearFilters}
                  className="w-full flex items-center justify-center px-4 py-2 border border-[#e5e5e5] text-[#666] hover:text-[#d4af37] hover:border-[#d4af37] transition-all"
                >
                  <XMarkIcon className="h-4 w-4 mr-2" />
                  Limpiar filtros
                </button>
                <button
                  onClick={() => applyCupon('DESCUENTO10')}
                  className="w-full flex items-center justify-center px-4 py-2 bg-[#1a1a1a] text-white border border-[#1a1a1a] hover:bg-[#333] transition-colors duration-200 group"
                >
                  <TagIcon className="h-4 w-4 mr-2 text-[#d4af37] group-hover:text-[#b89a2a]" />
                  Aplicar Descuento
                </button>
              </div>
            </div>
          </div>

          {/* Área principal de productos */}
          <div className="lg:w-3/4">
            {/* Filtros móviles */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center justify-center px-4 py-2 bg-white border border-[#e5e5e5] rounded-none w-full hover:border-[#d4af37] transition-all"
              >
                <FunnelIcon className="h-5 w-5 mr-2 text-[#666]" />
                Filtrar productos
              </button>
            </div>

            {/* Lista de productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(product => (
                <Card key={product.id} product={product} />
              ))}
            </div>

            {/* Mensaje si no hay productos */}
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[#666] text-lg font-medium">
                  No se encontraron productos que coincidan con tu búsqueda.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 inline-flex items-center px-4 py-2 text-[#1a1a1a] hover:text-[#d4af37] transition-colors font-medium border border-[#e5e5e5] hover:border-[#d4af37]"
                >
                  <XMarkIcon className="h-4 w-4 mr-2" />
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar móvil */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] lg:hidden">
          <div className="absolute left-0 top-0 bottom-0 w-3/4 bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#1a1a1a] font-serif">Filtros</h3>
              <button onClick={() => setIsSidebarOpen(false)}>
                <XMarkIcon className="h-6 w-6 text-[#666]" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#666] mb-2">Buscar</label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#666]" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-[#e5e5e5] rounded-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#666] mb-2">Categoría</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-3 pr-4 py-2 border border-[#e5e5e5] rounded-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all appearance-none"
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((cat, i) => (
                    <option key={`cat-${i}`} value={cat || ''} className="capitalize">
                      {(cat || '').replace(/'/g, "’")}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={clearFilters}
                className="w-full flex items-center justify-center px-4 py-2 border border-[#e5e5e5] text-[#666] hover:text-[#d4af37] hover:border-[#d4af37] transition-all"
              >
                <XMarkIcon className="h-4 w-4 mr-2" />
                Limpiar filtros
              </button>
              <button
                onClick={() => applyCupon('DESCUENTO10')}
                className="w-full flex items-center justify-center px-4 py-2 bg-[#1a1a1a] text-white border border-[#1a1a1a] hover:bg-[#333] transition-colors duration-200 group"
              >
                <TagIcon className="h-4 w-4 mr-2 text-[#d4af37] group-hover:text-[#b89a2a]" />
                Aplicar Descuento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Producto;
