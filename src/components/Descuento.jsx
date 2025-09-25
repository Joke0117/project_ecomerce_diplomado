const Descuento = ({ porcentaje }) => (
  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm absolute top-2 right-2">
    -{porcentaje}%
  </span>
);

export default Descuento;