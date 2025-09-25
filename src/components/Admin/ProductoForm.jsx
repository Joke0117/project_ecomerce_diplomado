import { useState, useEffect } from 'react';
import { api } from '../../services/api.js';

const ProductForm = ({ product = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
    rating: 0,
    count: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        price: product.price || '',
        description: product.description || '',
        image: product.image || '',
        category: product.category || '',
        rating: product.rating || 0,
        count: product.count || 0
      });
    } else {
      resetForm();
    }
  }, [product]);

  const resetForm = () => {
    setFormData({
      title: '',
      price: '',
      description: '',
      image: '',
      category: '',
      rating: 0,
      count: 0
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (product) {
        await api.updateProduct(product.id, formData);
      } else {
        await api.createProduct(formData);
      }
      resetForm();
      onSuccess();
    } catch (error) {
      console.error('Error en CRUD:', error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'rating' || name === 'count'
        ? Number(value)
        : value
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg space-y-5 border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-[#1a1a1a] font-serif mb-4">
        {product ? 'Editar Producto' : 'Crear Nuevo Producto'}
      </h2>

      {/* Campo Título */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
        <input 
          type="text" 
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none"
          required
        />
      </div>

      {/* Campo Precio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
        <input 
          type="number" 
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none"
          required
        />
      </div>

      {/* Campo Descripción */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none"
        />
      </div>

      {/* Campo Imagen */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">URL de Imagen</label>
        <input 
          type="url" 
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none"
        />
      </div>

      {/* Campo Categoría */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none"
        >
          <option value="">Seleccionar categoría</option>
          <option value="electronics">Electrónicos</option>
          <option value="jewelery">Joyería</option>
          <option value="men's clothing">Ropa Hombre</option>
          <option value="women's clothing">Ropa Mujer</option>
        </select>
      </div>

      {/* Campo Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating ⭐</label>
        <input 
          type="number" 
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none"
          min="0"
          max="5"
          step="0.1"
        />
      </div>

      {/* Campo Count */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Número de Reseñas 📦</label>
        <input 
          type="number" 
          name="count"
          value={formData.count}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none"
          min="0"
        />
      </div>

      {/* Botón */}
      <button 
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-[#1a1a1a] text-white font-semibold rounded-lg hover:bg-[#333] transition-all duration-300 disabled:opacity-70"
      >
        {loading ? 'Guardando...' : (product ? 'Actualizar Producto' : 'Crear Producto')}
      </button>
    </form>
  );
};

export default ProductForm;
