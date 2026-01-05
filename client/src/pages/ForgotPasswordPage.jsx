import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/users/forgotpassword', { email });
      setMessage('¡Listo! Revisa tu correo (bandeja de entrada o spam).');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar correo');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 text-white">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-xl border border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-center">Recuperar Cuenta</h2>
        <p className="text-gray-400 text-sm mb-6 text-center">Ingresa tu email y te enviaremos un enlace.</p>
        
        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
        {message && <div className="bg-green-500/20 text-green-400 p-3 rounded mb-4 text-sm">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="tucorreo@ejemplo.com" 
            className="w-full bg-slate-900 border border-slate-600 rounded p-3 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded transition">
            Enviar Enlace
          </button>
        </form>
        <div className="mt-4 text-center">
            <Link to="/login" className="text-sm text-gray-500 hover:text-white">Volver al Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;