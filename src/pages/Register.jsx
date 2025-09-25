import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService.js';

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authService.register(formData.email, formData.password);
      navigate('/tienda');
    } catch (err) {
      setError('Correo ya registrado o error en el registro');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8] px-4">
      <div className="max-w-md w-full bg-white shadow-xl border border-[#e5e5e5] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#1a1a1a] py-6 px-8 text-center">
          <h1 className="text-3xl font-bold text-[#d4af37] font-serif tracking-wide">E-Commerce</h1>
        </div>

        {/* Formulario */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 text-center font-serif">
            Crea tu cuenta
          </h2>

          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[#1a1a1a] font-medium mb-2">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-md focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all"
              />
            </div>

            <div>
              <label className="block text-[#1a1a1a] font-medium mb-2">Contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-md focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1a1a1a] text-white font-medium rounded-md hover:bg-[#333] transition-colors duration-200 flex justify-center items-center gap-2"
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              className="text-[#d4af37] font-medium hover:text-[#b89a2a] transition-colors"
            >
              Inicia Sesión
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="bg-[#f8f8f8] py-4 px-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} E-Commerce. Todos los derechos reservados.
        </div>
      </div>
    </div>
  );
};

export default Register;
