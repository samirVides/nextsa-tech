import { createContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Cargar usuario si existe cookie/token al iniciar
    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const { data } = await api.get('/api/users/profile');
                setUser(data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkUserLoggedIn();
    }, []);

    // 2. FUNCIÓN DE LOGIN (Corregida)
    const login = async (userData) => {
        // userData ya viene como { email: '...', password: '...' }
        // NO debemos poner llaves extras aquí como { userData } o { email: userData }
        const { data } = await api.post('/api/users/login', userData);
        setUser(data);
        return data;
    };

    // 3. FUNCIÓN DE REGISTRO (Corregida)
    const register = async (userData) => {
        // userData viene como { name: '...', email: '...', password: '...' }
        const { data } = await api.post('/api/users/register', userData);
        setUser(data);
        return data;
    };

    // 4. FUNCIÓN DE LOGOUT
    const logout = async () => {
        try {
            await api.post('/api/users/logout');
            setUser(null);
            window.location.href = '/login';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;