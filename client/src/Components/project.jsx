import React, { useRef, useState, useEffect, useCallback } from 'react'
import Card from './Card';
import api, { fileUrl } from '../api';
import { useAdmin } from '../AdminContext';
import { ProjectModal } from './AdminModals';

const Project = () => {
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const rafRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 across the whole track
  const [projects, setProjects] = useState([]);

  const { isAdmin } = useAdmin();
  const [modal, setModal] = useState(null); // null | { project } (project is null when adding)

  const loadProjects = useCallback(() => {
    api.get('/projects').then(({ data }) => setProjects(data)).catch(console.error);
  }, []);
  useEffect(() => { loadProjects(); }, [loadProjects]);

  const removeProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      loadProjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const drag = useRef({ isDown: false, startX: 0, startScroll: 0, moved: false });

  // --- Coverflow math: scale/opacity/tilt each card by its distance from track-center ---
  const applyCoverflow = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const centerX = trackRect.left + trackRect.width / 2;
    let closestIndex = 0;
    let closestDist = Infinity;

    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = cardCenter - centerX;
      const norm = Math.min(Math.abs(dist) / (trackRect.width / 2), 1); // 0 at center, 1 at edge

      const scale = 1 - norm * 0.3;
      const opacity = 1 - norm * 0.65;
      const rotateY = Math.sign(dist) * norm * 14; // degrees
      const translateY = norm * 10; // px, recede slightly downward

      el.style.transform = `perspective(1000px) rotateY(${-rotateY}deg) scale(${scale}) translateY(${translateY}px)`;
      el.style.opacity = opacity;
      el.style.zIndex = String(1000 - Math.round(norm * 1000));

      if (Math.abs(dist) < closestDist) {
        closestDist = Math.abs(dist);
        closestIndex = i;
      }
    });

    setActiveIndex(closestIndex);

    const maxScroll = track.scrollWidth - track.clientWidth;
    setProgress(maxScroll > 0 ? track.scrollLeft / maxScroll : 0);
  }, []);

  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(applyCoverflow);
  }, [applyCoverflow]);

  useEffect(() => {
    applyCoverflow();
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [applyCoverflow, onScroll]);

  // re-run coverflow once projects arrive (must stay below applyCoverflow)
  useEffect(() => {
    applyCoverflow();
  }, [projects, applyCoverflow]);

  const scrollToIndex = (index) => {
    const el = slideRefs.current[index];
    if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  const scrollByCard = (direction) => {
    const next = Math.min(Math.max(activeIndex + direction, 0), projects.length - 1);
    scrollToIndex(next);
  };

  // --- Drag-to-scroll ---
  const onPointerDown = useCallback((e) => {
    const track = trackRef.current;
    if (!track) return;
    drag.current.isDown = true;
    drag.current.moved = false;
    drag.current.startX = e.clientX;
    drag.current.startScroll = track.scrollLeft;
    track.classList.add('is-dragging');
  }, []);

  const onPointerMove = useCallback((e) => {
    const track = trackRef.current;
    if (!track || !drag.current.isDown) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4 && !drag.current.moved) {
      drag.current.moved = true;
      track.setPointerCapture(e.pointerId);
    }
    track.scrollLeft = drag.current.startScroll - dx;
    onScroll();
  }, [onScroll]);

  const endDrag = useCallback((e) => {
    const track = trackRef.current;
    if (!track) return;
    drag.current.isDown = false;
    track.classList.remove('is-dragging');
    if (e?.pointerId != null && track.hasPointerCapture?.(e.pointerId)) {
      track.releasePointerCapture(e.pointerId);
    }
  }, []);

  const onClickCapture = useCallback((e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  return (
    <div className='bg-black text-white flex flex-col items-center bg-[url("https://assets.prebuiltui.com/components/hero-section/hero-background-image.png")] bg-cover bg-center bg-no-repeat pt-16 pb-47 px-4 overflow-hidden'>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .project-card-enter {
          animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: var(--d);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
          will-change: transform, opacity;
        }
        .project-track {
          cursor: grab;
          -webkit-mask-image: linear-gradient(to right, transparent 0, black 60px, black calc(100% - 60px), transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, black 60px, black calc(100% - 60px), transparent 100%);
        }
        .project-track.is-dragging {
          cursor: grabbing;
          scroll-snap-type: none;
        }
        .project-track.is-dragging .project-card-enter {
          transition: opacity 0.15s ease; /* transform updates instantly while dragging */
        }
      `}</style>

      <h1 className="text-3xl font-semibold text-center mx-auto m-0">
        My Projects
      </h1>

      {isAdmin && (
        <button
          onClick={() => setModal({ project: null })}
          className="mt-4 px-5 py-2 rounded-full bg-[#A6FF5D] text-gray-800 text-sm font-medium"
        >
          + Add project
        </button>
      )}
      {projects.length === 0 && <p className="text-slate-400 text-sm mt-4">No projects to show yet.</p>}

      {/* Numeral counter, replacing a generic label */}
      <div className="flex items-baseline gap-2 mt-3 font-semibold tracking-tight">
        <span className="text-2xl text-[#A6FF5D]">{String(projects.length ? activeIndex + 1 : 0).padStart(2, '0')}</span>
        <span className="text-sm text-white/40">/ {String(projects.length).padStart(2, '0')}</span>
      </div>

      <div className="relative w-full max-w-6xl mt-8">

        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Previous project"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 items-center justify-center size-10 rounded-full bg-white/10 hover:bg-[#A6FF5D] hover:text-black backdrop-blur border border-white/20 transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
          disabled={activeIndex === 0}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onClickCapture}
          onScroll={onScroll}
          className="project-track flex items-center gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-8 select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ paddingInline: 'calc(50% - 140px)' }} // centers first/last card in the viewport
        >
          {projects.map((p, i) => (
            <div
              key={p._id}
              ref={(el) => (slideRefs.current[i] = el)}
              style={{ '--d': `${i * 120}ms` }}
              className="project-card-enter snap-center shrink-0 w-[280px] sm:w-[300px]"
            >
              <Card
                image={fileUrl(p.image)}
                title={p.title}
                role={p.role}
                description={p.description}
                demoLink={p.demoLink}
                codeLink={p.codeLink}
                onEdit={isAdmin ? () => setModal({ project: p }) : undefined}
                onDelete={isAdmin ? () => removeProject(p._id) : undefined}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollByCard(1)}
          aria-label="Next project"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 items-center justify-center size-10 rounded-full bg-white/10 hover:bg-[#A6FF5D] hover:text-black backdrop-blur border border-white/20 transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
          disabled={activeIndex === projects.length - 1}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Slim progress line instead of dots */}
      <div className="w-40 h-[3px] rounded-full bg-white/15 mt-2 overflow-hidden">
        <div
          className="h-full bg-[#A6FF5D] rounded-full transition-[width] duration-150 ease-out"
          style={{ width: `${Math.max(progress * 100, 6)}%` }}
        />
      </div>

      {modal && (
        <ProjectModal project={modal.project} onClose={() => setModal(null)} onSaved={loadProjects} />
      )}
    </div>
  )
}

export default Project