import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import api from '../../api';

// --- IMPORTS ---
import AdminUsers from './AdminUsers';
import AdminUserEdit from './AdminUserEdit';
import AdminProjects from './AdminProjects'; 
import ProjectForm from './ProjectForm'; 
import AdminNewsletter from './AdminNewsletter';
import AdminMessages from './AdminMessages';
import AdminBlogs from './AdminBlogs';
import BlogForm from './BlogForm';

// --- ÍCONOS ---
import { 
    FaChartPie, FaNewspaper, FaProjectDiagram, FaUsers, 
    FaEnvelope, FaSignOutAlt, FaConnectdevelop, FaEnvelopeOpenText, 
    FaPlusCircle, FaArrowLeft, FaServer
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [editId, setEditId] = useState(null);
  const { logout } = useContext(AuthContext); // Ya no necesitamos 'user' aquí para mostrarlo arriba

  // Renderizado dinámico de contenido
  const renderContent = () => {
    switch (activeTab) {
      
      // 1. DASHBOARD HOME
      case 'dashboard':
        return <DashboardHome setActiveTab={setActiveTab} />;
      
      // 2. USUARIOS
      case 'users':
        return <AdminUsers onEdit={(id) => { setEditId(id); setActiveTab('edit-user'); }} />;
      case 'edit-user':
        return <AdminUserEdit userId={editId} onBack={() => { setEditId(null); setActiveTab('users'); }} />;
      
      // 3. PROYECTOS
      case 'projects':
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Proyectos</h2>
                    <button onClick={() => { setEditId(null); setActiveTab('new-project'); }} className="bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition shadow-lg shadow-green-600/20 hover:-translate-y-0.5">
                        <FaPlusCircle /> Nuevo
                    </button>
                </div>
                <AdminProjects onEdit={(id) => { setEditId(id); setActiveTab('new-project'); }} />
            </div>
        );
      case 'new-project':
        return (
            <div>
                <button onClick={() => setActiveTab('projects')} className="mb-6 text-slate-400 hover:text-white flex items-center gap-2 transition font-medium"><FaArrowLeft/> Volver a Proyectos</button>
                {/* Pasamos el editId al formulario */}
                <ProjectForm projectId={editId} /> 
            </div>
        );

      // 4. BLOGS
      case 'blogs':
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Blogs & Noticias</h2>
                    <button onClick={() => { setEditId(null); setActiveTab('new-blog'); }} className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition shadow-lg shadow-purple-600/20 hover:-translate-y-0.5">
                        <FaPlusCircle /> Nuevo
                    </button>
                </div>
                <AdminBlogs onEdit={(id) => { setEditId(id); setActiveTab('new-blog'); }} />
            </div>
        );
      case 'new-blog':
        return (
            <div>
                <button onClick={() => setActiveTab('blogs')} className="mb-6 text-slate-400 hover:text-white flex items-center gap-2 transition font-medium"><FaArrowLeft/> Volver a Blogs</button>
                {/* Pasamos el editId al formulario */}
                <BlogForm blogId={editId} /> 
            </div>
        );

      // 5. OTROS
      case 'newsletter': return <AdminNewsletter />;
      case 'messages': return <AdminMessages />;

      default: return <DashboardHome setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans text-slate-300">
        
        {/* SIDEBAR FIJO */}
        <aside className="w-20 md:w-72 bg-slate-900 border-r border-slate-800 flex flex-col fixed top-0 left-0 h-screen z-40 transition-all duration-300">
             <div className="h-[72px] flex items-center justify-center md:justify-start md:px-8 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                <FaConnectdevelop className="text-3xl text-blue-500 shrink-0" />
                <span className="ml-3 font-bold text-white text-xl hidden md:block tracking-widest truncate">
                    NEX<span className="text-blue-500">ADMIN</span>
                </span>
             </div>
             
             <nav className="flex-1 py-8 px-2 md:px-4 space-y-2 overflow-y-auto custom-scrollbar">
                <SidebarItem id="dashboard" label="Resumen" icon={<FaChartPie />} activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="my-3 border-t border-slate-800 mx-4 opacity-30"></div>
                <SidebarItem id="projects" label="Proyectos" icon={<FaProjectDiagram />} activeTab={activeTab} setActiveTab={setActiveTab} />
                <SidebarItem id="blogs" label="Blogs" icon={<FaNewspaper />} activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="my-3 border-t border-slate-800 mx-4 opacity-30"></div>
                <SidebarItem id="users" label="Usuarios" icon={<FaUsers />} activeTab={activeTab} setActiveTab={setActiveTab} />
                <SidebarItem id="messages" label="Mensajes" icon={<FaEnvelope />} activeTab={activeTab} setActiveTab={setActiveTab} />
                <SidebarItem id="newsletter" label="Marketing" icon={<FaEnvelopeOpenText />} activeTab={activeTab} setActiveTab={setActiveTab} />
             </nav>

             <div className="p-4 border-t border-slate-800 bg-slate-900">
                <button onClick={logout} className="w-full flex items-center justify-center md:justify-start gap-3 text-red-400 hover:bg-red-500/10 p-3 rounded-xl transition font-bold border border-transparent hover:border-red-500/20">
                    <FaSignOutAlt className="shrink-0" /> <span className="hidden md:block">Cerrar Sesión</span>
                </button>
            </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        {/* pt-28 asegura que el contenido empiece DEBAJO del Navbar (que mide unos 70-80px) */}
        <main className="flex-1 p-6 md:p-12 w-full ml-20 md:ml-72 pt-28 min-h-screen bg-slate-950">
             {/* Eliminamos el Header redundante de usuario. Renderizamos directo el contenido */}
             <div className="animate-fade-in-up max-w-7xl mx-auto">
                {renderContent()}
             </div>
        </main>
    </div>
  );
};

// --- COMPONENTES AUXILIARES ---

const SidebarItem = ({ id, label, icon, activeTab, setActiveTab }) => (
    <button onClick={() => setActiveTab(id)} className={`w-full flex items-center justify-center md:justify-start gap-4 p-3.5 rounded-xl transition-all duration-200 group relative mb-1 
        ${activeTab === id || activeTab === `new-${id.slice(0, -1)}` || (id === 'users' && activeTab === 'edit-user') 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 translate-x-1' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
        <span className={`text-xl transition-transform ${activeTab === id ? 'scale-110' : ''}`}>{icon}</span>
        <span className="hidden md:block font-medium text-sm tracking-wide">{label}</span>
        
        {/* Tooltip para móvil */}
        <span className="md:hidden absolute left-16 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 pointer-events-none border border-slate-700 shadow-xl">
            {label}
        </span>
    </button>
);

// --- DASHBOARD HOME ---
const DashboardHome = ({ setActiveTab }) => {
    const [stats, setStats] = useState({ users: 0, projects: 0, blogs: 0, msgs: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Usamos Promise.allSettled para que si falla uno, no rompa los demás
                const results = await Promise.allSettled([
                    api.get('/api/users'),
                    api.get('/api/projects'),
                    api.get('/api/blogs'),
                    api.get('/api/messages')
                ]);
                
                setStats({
                    users: results[0].status === 'fulfilled' ? results[0].value.data.length : 0,
                    projects: results[1].status === 'fulfilled' ? results[1].value.data.length : 0,
                    blogs: results[2].status === 'fulfilled' ? results[2].value.data.length : 0,
                    msgs: results[3].status === 'fulfilled' ? results[3].value.data.length : 0
                });
            } catch (error) { console.error("Error stats", error); }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-900 to-slate-900 p-10 rounded-3xl text-white shadow-2xl border border-blue-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -mr-20 -mt-20 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h3 className="text-4xl font-bold mb-3 tracking-tight">Panel de Control</h3>
                        <p className="text-blue-200 text-lg max-w-xl">Bienvenido al centro de administración de NextSa Tech. Todo funciona correctamente al 100%.</p>
                    </div>
                    <FaServer className="text-8xl text-white/5 rotate-12" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Usuarios" value={stats.users} icon={<FaUsers />} color="bg-purple-500" onClick={() => setActiveTab('users')} />
                <StatCard title="Proyectos" value={stats.projects} icon={<FaProjectDiagram />} color="bg-green-500" onClick={() => setActiveTab('projects')} />
                <StatCard title="Artículos" value={stats.blogs} icon={<FaNewspaper />} color="bg-blue-500" onClick={() => setActiveTab('blogs')} />
                <StatCard title="Mensajes" value={stats.msgs} icon={<FaEnvelope />} color="bg-orange-500" onClick={() => setActiveTab('messages')} />
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color, onClick }) => (
    <div onClick={onClick} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-slate-600 transition cursor-pointer group hover:-translate-y-1 hover:shadow-xl flex items-center gap-5">
        <div className={`w-16 h-16 ${color}/10 rounded-2xl flex items-center justify-center text-2xl ${color.replace('bg-', 'text-')} group-hover:scale-110 transition border border-${color.replace('bg-', '')}/20`}>
            {icon}
        </div>
        <div>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</p>
            <p className="text-3xl font-bold text-white mt-1 group-hover:text-blue-400 transition">{value}</p>
        </div>
    </div>
);

export default AdminDashboard;