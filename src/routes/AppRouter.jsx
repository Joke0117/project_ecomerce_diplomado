import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Inicio from '../pages/Inicio.jsx';
import Producto from '../pages/Producto.jsx';
import DetallesPage from '../pages/DetallesPage.jsx';
import Contacto from '../pages/Contacto.jsx';
import Carrito from '../pages/Carrito.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Admin from '../pages/Admin.jsx';
import Error from '../pages/Error.jsx';

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center p-4">Cargando...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

const ADMIN_UID = "LrJqzqWFZOe2SaKya1I2Znj5kyk2"; 

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center p-4">Cargando...</div>;

  return user && user.uid === ADMIN_UID 
    ? children 
    : <Navigate to="/tienda" replace />;
};


const AppRouter = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/tienda" element={<Producto />} />
          <Route path="/detalles/:id" element={<DetallesPage />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route 
            path="/carrito" 
            element={
              <ProtectedRoute>
                <Carrito />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            } 
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRouter;