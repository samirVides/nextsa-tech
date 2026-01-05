import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import AuthContext from '../context/AuthContext'; // Reutilizamos el contexto para auto-login

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext); // Para loguear automáticamente tras registrar
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Registrar usuario (Backend espera POST /api/users)
      await api.post('/api/users', formData);
      
      // 2. Iniciar sesión automáticamente
      await login(formData.email, formData.password);
      
      // 3. Ir al Home
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-800 rounded-xl p-8 shadow-2xl border border-slate-700">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Crear Cuenta</h2>
        
        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm">Nombre Completo</label>
            <input 
              type="text" 
              className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500"
              placeholder="Ej: Samir Bertel"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm">Correo Electrónico</label>
            <input 
              type="email" 
              className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500"
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm">Contraseña</label>
            <input 
              type="password" 
              className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg p-3 outline-none focus:border-blue-500"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition">
            Registrarse
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-400 hover:underline">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;