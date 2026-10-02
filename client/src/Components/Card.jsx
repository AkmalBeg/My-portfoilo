import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({
  image,
  title,
  role,
  description,
  demoLink,
  codeLink,
  onEdit,
  onDelete,
}) => {
  const [visible, setVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const divRef = React.useRef(null);

  const handleMouseMove = (e) => {
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="relative w-full h-96 rounded-xl p-px bg-slate-900 overflow-hidden shadow-lg cursor-pointer"
    >
      <div
        className={`pointer-events-none blur-3xl rounded-full bg-gradient-to-r from-[#A6FF5D] via-[#5DFFB0] to-[#A6FF5D] size-60 absolute z-0 transition-opacity duration-500 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ top: position.y - 120, left: position.x - 120 }}
      />

      {(onEdit || onDelete) && (
        <div className="absolute top-3 right-3 z-20 flex gap-2">
          {onEdit && (
            <button onClick={onEdit} className="px-3 py-1 rounded-full bg-black/80 border border-[#A6FF5D]/60 text-xs text-[#A6FF5D] hover:bg-[#A6FF5D] hover:text-black transition-colors">
              Edit
            </button>
          )}
          {onDelete && (
            <button onClick={onDelete} className="px-3 py-1 rounded-full bg-black/80 border border-red-400/60 text-xs text-red-300 hover:bg-red-400 hover:text-black transition-colors">
              Delete
            </button>
          )}
        </div>
      )}

      <div className="relative z-10 bg-black/85 p-6 h-full w-full rounded-[11px] flex flex-col items-center justify-center text-center">
        <img
          src={image || undefined}
          alt={title}
          className="w-24 h-24 rounded-full shadow-md my-4 border-2 border-[#A6FF5D]/40 object-cover"
        />
        <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
        <p className="text-sm text-[#A6FF5D] font-medium mb-4">{role}</p>
        <p className="text-sm text-slate-400 mb-4 px-4">{description}</p>

        <div className="flex gap-4 mb-4 text-sm">
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-700 rounded-md text-slate-300 hover:border-[#A6FF5D] hover:text-[#A6FF5D] transition-colors"
          >
            <FaExternalLinkAlt className="w-3 h-3" />
            Live demo
          </a>
          <a
            href={codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-700 rounded-md text-slate-300 hover:border-[#A6FF5D] hover:text-[#A6FF5D] transition-colors"
          >
            <FaGithub className="w-3.5 h-3.5" />
            Source code
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;