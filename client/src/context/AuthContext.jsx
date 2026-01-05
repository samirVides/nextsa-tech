import { createContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const { data } = await api.post('/api/users/login', { email, password });
      setUser(data); // Guardamos al usuario en el estado
      localStorage.setItem('userInfo', JSON.stringify(data)); // Persistencia básica visual
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al conectar con el servidor' 
      };
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await api.post('/api/users/logout');
      setUser(null);
      localStorage.removeItem('userInfo');
    } catch (error) {
      console.error(error);
    }
  };

  // Al cargar la app, revisamos si ya había una sesión guardada visualmente
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;