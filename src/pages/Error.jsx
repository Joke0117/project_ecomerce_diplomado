import { Link } from 'react-router-dom';

const Error = () => (
  <div className="container mx-auto p-4 text-center">
    <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
    <h2 className="text-2xl font-bold mb-4">Página no encontrada</h2>
    <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
      Volver al Inicio
    </Link>
  </div>
);

export default Error;