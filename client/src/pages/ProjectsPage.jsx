import { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar TODOS los proyectos
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/api/projects');
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando proyectos", error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Función para eliminar (Igual que en el Home)
  const handleDeleteProject = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este proyecto?')) return;
    try {
      await api.delete(`/api/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
      alert('Proyecto eliminado');
    } catch (error) {
      alert('Error al eliminar');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Cabecera */}
        <div className="mb-12">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition">
                <FaArrowLeft /> Volver al Inicio
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Portafolio Completo
            </h1>
            <p className="text-slate-400 mt-4 text-lg">
                Explora cada una de las soluciones digitales que he desarrollado.
            </p>
        </div>

        {/* Grid de Proyectos */}
        {loading ? (
            <div className="text-center py-20"><p>Cargando proyectos...</p></div>
        ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <ProjectCard 
                        key={project._id} 
                        project={project} 
                        onDelete={handleDeleteProject} 
                    />
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-slate-900/30 rounded-xl border border-slate-800">
                <p className="text-slate-400">Aún no hay proyectos publicados.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;