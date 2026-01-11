import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaTrash, FaEdit, FaImage } from 'react-icons/fa';
import { useContext, useState } from 'react'; // <--- Importamos useState
import AuthContext from '../context/AuthContext';

const ProjectCard = ({ project, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [imgError, setImgError] = useState(false); // <--- Estado para controlar si la imagen falló

  // --- LÓGICA INTELIGENTE DE URL ---
  const getImageUrl = (imgData) => {
    if (!imgData) return null;
    if (imgData.url) return imgData.url; // Formato Nuevo (Objeto)
    if (typeof imgData === 'string') return imgData; // Formato Viejo (String)
    return null;
  };

  const imageUrl = getImageUrl(project.image);
  // ----------------------------------

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20 flex flex-col h-full">
      
      {/* SECCIÓN DE IMAGEN (Con Fallback CSS) */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
        <div className="absolute inset-0 bg-blue-900/10 group-hover:opacity-0 transition z-10"></div>
        
        {/* Si tenemos URL y NO ha dado error, mostramos la imagen */}
        {imageUrl && !imgError ? (
            <img 
              src={imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              onError={() => setImgError(true)} // Si falla, activamos el modo error
            />
        ) : (
            // Si no hay imagen o dio error, mostramos este diseño elegante
            <div className="flex flex-col items-center justify-center text-slate-600 gap-2 p-4">
                <FaImage className="text-4xl opacity-50" />
                <span className="text-xs uppercase tracking-widest font-bold">Sin Imagen</span>
            </div>
        )}

        {/* Decoración inferior */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-50"></div>
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition line-clamp-1">{project.title}</h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">
          {project.description}
        </p>

        {/* Botones de Acción */}
        <div className="mt-auto flex justify-between items-center border-t border-slate-800 pt-4">
            <div className="flex gap-4">
                {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition flex items-center gap-2 text-sm font-bold" title="Ver Proyecto">
                        <FaExternalLinkAlt /> <span className="hidden md:inline">Visitar</span>
                    </a>
                )}
            </div>

            {/* Botones de Admin */}
            {user && user.role === 'admin' && (
                <div className="flex gap-3">
                    <Link to={`/admin/edit/${project._id}`} className="p-2 text-yellow-500 hover:bg-yellow-500/10 rounded-full transition" title="Editar">
                        <FaEdit />
                    </Link>
                    <button 
                        onClick={() => onDelete(project._id)} 
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition" title="Eliminar"
                    >
                        <FaTrash />
                    </button>
                </div>
            )}
        </div>
        
        {/* Botón Ver Detalles */}
        <Link to={`/projects/${project._id}`} className="mt-4 block text-center w-full py-2 rounded-lg bg-slate-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 text-slate-300 hover:text-white text-sm font-bold transition-all shadow-lg hover:shadow-blue-500/20">
            Ver Detalles y Galería
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;