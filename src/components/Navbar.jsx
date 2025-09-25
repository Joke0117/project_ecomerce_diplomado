import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCarrito } from "../context/CarritoContext.jsx";
import { authService } from "../services/authService.js";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const { user } = useAuth();
  const { carrito } = useCarrito();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const ADMIN_UID = "LrJqzqWFZOe2SaKya1I2Znj5kyk2";

  const handleLogout = async () => {
    await authService.logout();
    navigate("/");
  };

  const username = user?.email ? user.email.split("@")[0] : null;
  const carritoCount = carrito.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-[#1a1a1a]/50 backdrop-blur-lg py-4 px-6 shadow-none border-b border-[#333]/30 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-[#f8f8f8] text-2xl font-bold font-serif tracking-wider"
        >
          E-Commerce
        </Link>

        {/* Buscador */}
        <div className="flex-1 max-w-sm mx-4 hidden md:block">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#999]" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 bg-[#333]/50 border border-[#555] rounded-full text-[#f8f8f8] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
            />
          </div>
        </div>

        {/* Enlaces (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-[#f8f8f8] hover:text-[#d4af37] transition-colors duration-200 font-medium"
          >
            Inicio
          </Link>
          <Link
            to="/tienda"
            className="text-[#f8f8f8] hover:text-[#d4af37] transition-colors duration-200 font-medium"
          >
            Tienda
          </Link>
          <div className="relative">
            <Link
              to="/carrito"
              className="text-[#f8f8f8] hover:text-[#d4af37] transition-colors duration-200 font-medium"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {carritoCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#d4af37] text-[#1a1a1a] text-xs font-bold px-2 py-0.5 rounded-full">
                  {carritoCount}
                </span>
              )}
            </Link>
          </div>

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-[#f8f8f8] hover:text-[#d4af37] transition-colors duration-200 font-medium flex items-center"
              >
                <UserIcon className="h-5 w-5 mr-1" />
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="text-[#f8f8f8] hover:text-[#d4af37] transition-colors duration-200 font-medium flex items-center"
              >
                <UserPlusIcon className="h-5 w-5 mr-1" />
                Registrarse
              </Link>
            </>
          ) : (
            <>
              {user.uid === ADMIN_UID && (
                <Link
                  to="/admin"
                  className="text-[#f8f8f8] hover:text-[#d4af37] transition-colors duration-200 font-medium"
                >
                  Admin
                </Link>
              )}
              <span className="text-[#d4af37] font-medium">Hola, {username}</span>
              <button
                onClick={handleLogout}
                className="text-[#f8f8f8] hover:text-[#d4af37] transition-colors duration-200 font-medium flex items-center"
              >
                <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-1" />
                Cerrar Sesión
              </button>
            </>
          )}
        </div>

        {/* Botón menú hamburguesa (Mobile) */}
        <button
          className="md:hidden text-[#f8f8f8] hover:text-[#d4af37]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
        </button>
      </div>

      {/* Menú desplegable (Mobile) */}
      {menuOpen && (
        <div className="md:hidden bg-[#1a1a1a]/90 backdrop-blur-lg px-6 pb-4 space-y-4">
          <Link
            to="/"
            className="block text-[#f8f8f8] hover:text-[#d4af37] font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/tienda"
            className="block text-[#f8f8f8] hover:text-[#d4af37] font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Tienda
          </Link>
          <Link
            to="/carrito"
            className="block text-[#f8f8f8] hover:text-[#d4af37] font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Carrito ({carritoCount})
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="block text-[#f8f8f8] hover:text-[#d4af37] font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="block text-[#f8f8f8] hover:text-[#d4af37] font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Registrarse
              </Link>
            </>
          ) : (
            <>
              {user.uid === ADMIN_UID && (
                <Link
                  to="/admin"
                  className="block text-[#f8f8f8] hover:text-[#d4af37] font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              <span className="block text-[#d4af37] font-medium">
                Hola, {username}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left text-[#f8f8f8] hover:text-[#d4af37] font-medium"
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
