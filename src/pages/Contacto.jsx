import { useState } from 'react';

const Contacto = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simula envío (integra con EmailJS o backend real)
    console.log('Formulario enviado:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">Contacto</h1>
      {submitted && <p className="bg-green-100 text-green-700 p-4 rounded mb-4">¡Mensaje enviado! Te contactaremos pronto.</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          name="name" 
          placeholder="Tu nombre" 
          value={formData.name} 
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Tu email" 
          value={formData.email} 
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea 
          name="message" 
          placeholder="Tu mensaje" 
          value={formData.message} 
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="5"
          required
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contacto;