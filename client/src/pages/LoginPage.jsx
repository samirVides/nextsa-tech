import { useState, useContext } from 'react'; // <--- Importar hooks
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import AuthContext from '../context/AuthContext'; // <--- Importar contexto

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext); // Usar la función del contexto
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    const result = await login(email, password);

    if (result.success) {
      navigate('/'); // Redirigir al Home si todo sale bien
    } else {
      setError(result.message); // Mostrar error si falla
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-800 rounded-xl p-8 shadow-2xl border border-slate-700">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Log in</h2>
        
        {/* Mensaje de Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-center text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Email</label>
            <div className="relative flex items-center">
              <FaUser className="absolute left-3 text-gray-500" />
              <input 
                type="email" 
                placeholder="admin@nexora.com" 
                className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2 text-sm">Contraseña</label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-3 text-gray-500" />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition shadow-lg">
            Ingresar
          </button>
          <div className="text-right mb-4">
    <Link to="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300">
        ¿Olvidaste tu contraseña?
    </Link>

</div>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-gray-500 hover:text-white text-sm">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;