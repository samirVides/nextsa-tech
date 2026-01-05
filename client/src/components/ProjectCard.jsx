import { FaGithub, FaExternalLinkAlt, FaTrash, FaEdit } from 'react-icons/fa';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../api';

const ProjectCard = ({ project, onDelete }) => { // Recibimos la función onDelete
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    if (window.confirm(`¿Seguro que quieres eliminar "${project.title}"?`)) {
      try {
        await api.delete(`/api/projects/${project._id}`);
        onDelete(project._id); // Actualizar la lista en el padre visualmente
      } catch (error) {
        alert('Error al eliminar');
      }
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-slate-700 flex flex-col h-full relative group">
      
      {/* BOTONES ADMIN (Solo visibles si eres admin) */}
      {user?.role === 'admin' && (
        <div className="absolute top-2 right-2 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link 
            to={`/admin/edit/${project._id}`} // <--- Link a la página de edición
            className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 shadow-lg"
            title="Editar"
          >
            <FaEdit />
          </Link>
          <button 
            onClick={handleDelete}
            className="p-2 bg-red-600 text-white rounded hover:bg-red-700 shadow-lg"
            title="Eliminar"
          >
            <FaTrash />
          </button>
        </div>
      )}

      {/* Imagen */}
      <div className="h-48 overflow-hidden">
        <img 
          src={project.image.url} 
          alt={project.title} 
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Contenido (Igual que antes...) */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span key={index} className="px-2 py-1 bg-slate-700 text-blue-400 text-xs rounded-full border border-slate-600">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-auto">
          {project.linkDemo && (
            <a href={project.linkDemo} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition">
              <FaExternalLinkAlt /> Demo
            </a>
          )}
          {project.linkRepo && (
            <a href={project.linkRepo} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-sm font-semibold transition border border-slate-600">
              <FaGithub /> Código
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;