import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AdminRoute = () => {
    const { user, loading } = useContext(AuthContext);

    // 1. Si está cargando (verificando cookie), mostramos espera
    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">Cargando permisos...</div>;

    // 2. Si hay usuario Y es admin, dejamos pasar (Outlet)
    // 3. Si no, lo mandamos al Login
    return (user && user.role === 'admin') ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;