import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams lee el token de la URL
import api from '../api';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const { token } = useParams(); // Obtenemos el token de la URL
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        return setError("Las contraseñas no coinciden");
    }

    try {
      await api.put(`/api/users/resetpassword/${token}`, { password });
      setMessage('¡Contraseña actualizada! Redirigiendo...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error o token expirado');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 text-white">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-xl border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-center">Nueva Contraseña</h2>
        
        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
        {message && <div className="bg-green-500/20 text-green-400 p-3 rounded mb-4 text-sm">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="password" 
            placeholder="Nueva contraseña" 
            className="w-full bg-slate-900 border border-slate-600 rounded p-3 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <input 
            type="password" 
            placeholder="Confirmar contraseña" 
            className="w-full bg-slate-900 border border-slate-600 rounded p-3 outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="w-full bg-green-600 hover:bg-green-700 font-bold py-3 rounded transition">
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;