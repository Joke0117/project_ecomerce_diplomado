import { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import ProductForm from '../components/Admin/ProductoForm.jsx';
import OrderTable from '../components/Admin/OrderTable.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { importFakeStoreProducts } from '../utils/importProducts.js'; // 👈 función para importar productos

const Admin = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (user) {
        setLoading(true);
        const data = await api.getProducts();
        setProducts(data);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user, refresh]);

  const handleSuccess = () => {
    setRefresh(prev => prev + 1);
    setSelectedProduct(null);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar producto?')) {
      await api.deleteProduct(id);
      handleSuccess();
    }
  };

  const handleImport = async () => {
    setImporting(true);
    try {
      await importFakeStoreProducts(); // 👈 importar productos desde FakeStore
      handleSuccess(); // refrescar lista
      alert('Productos importados con éxito 🚀');
    } catch (error) {
      console.error('Error al importar productos:', error);
      alert('Hubo un error al importar los productos');
    }
    setImporting(false);
  };

  if (!user) {
    return <div className="text-center p-4">Debes iniciar sesión para acceder al admin.</div>;
  }

  return (
    <div className="container mx-auto p-4">

      <h1 className="text-3xl font-bold mb-4">Panel Administrativo</h1>
      
      {/* Tabs */}
      <div className="mb-4">
        <button 
          onClick={() => setActiveTab('products')} 
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Productos
        </button>
        <button 
          onClick={() => setActiveTab('orders')} 
          className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Órdenes
        </button>
      </div>

      {activeTab === 'products' && (
        <>
          {/* Botón para importar productos */}
          <div className="mb-4">
            <button 
              onClick={handleImport} 
              disabled={importing}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {importing ? 'Importando...' : 'Importar productos desde FakeStore'}
            </button>
          </div>

          <ProductForm product={selectedProduct} onSuccess={handleSuccess} />

          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>
            {loading ? (
              <p className="text-center">Cargando productos...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                  <div key={product.id} className="border p-4 rounded">
                    <h3 className="font-bold">{product.title}</h3>
                    <p>${product.price}</p>
                    <p className="text-sm text-gray-500">⭐ {product.rating} | Reseñas: {product.count}</p>
                    <button 
                      onClick={() => handleEdit(product)} 
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)} 
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'orders' && (
        <>
          <h2 className="text-2xl font-bold mb-4">Lista de Órdenes</h2>
          <OrderTable />
        </>
      )}
    </div>
  );
};

export default Admin;