import { useState, useEffect, useRef } from 'react';
import api from '../api';
import { useAdmin } from '../AdminContext';
import { AboutModal } from './AdminModals';
import { FaLinkedin, FaGithub,  } from 'react-icons/fa';

// Counts up from 0 to `target` every time the card scrolls into view
function CountUp({ target = 0, duration = 1200 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) { setCount(0); return; }
    let raf;
    let start;
    const step = (t) => {
      if (start === undefined) start = t;
      const p = Math.min((t - start) / duration, 1);
      setCount(Math.round(target * (1 - Math.pow(1 - p, 3)))); // ease-out
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, duration]);

  return (
    <div ref={ref} className="text-center flex flex-col items-center">
      <span className="flex items-baseline gap-0.5 text-4xl font-semibold text-[#A6FF5D]">
        <span>{count}</span>
        <span>+</span>
      </span>
    </div>
  );
}

export default function Example() {
  const [about, setAbout] = useState(null);
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const techCount = new Set(skills.map((x) => x.icon || x.name)).size;
  const skillsCount = skills.length;
  const projectsCount = projects.length;
  useEffect(() => {
    api.get('/about').then(({ data }) => setAbout(data)).catch(console.error);
    api.get('/projects').then(({ data }) => setProjects(data)).catch(console.error);
    api.get('/skills').then(({ data }) => setSkills(data)).catch(console.error);
  }, []);


    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
                    html, body {
    margin: 0;
    padding: 0;
    background-color: #000;
}
            `}</style>
              
              <div className='bg-black text-white flex flex-col items-center bg-[url("https://assets.prebuiltui.com/components/hero-section/hero-background-image.png")] bg-cover bg-center bg-no-repeat pt-16   px-4 '> 
            <h1 className="text-5xl font-semibold text-center mx-auto mb-5 ">About me</h1>
            {isAdmin && (
              <button onClick={() => setEditing(true)} className="mb-4 px-5 py-2 rounded-full bg-[#A6FF5D] text-gray-800 text-sm font-medium">
                Edit about text
              </button>
            )}
            {editing && (
              <AboutModal
                description={about?.description}
                onClose={() => setEditing(false)}
                onSaved={(text) => setAbout((prev) => ({ ...prev, description: text }))}
              />
            )}
            
       
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 px-7 md:px-0 py-10">

  <div className="w-[460px] h-[460px] md:w-[480px] md:h-[480px] rounded-xl p-[3px] bg-gradient-to-r from-[#A6FF5D] via-[#5DFFB0] to-[#A6FF5D] bg-[length:200%_200%] animate-gradient-border">
  <div className="w-full h-full rounded-[10px] overflow-hidden bg-black flex flex-col items-center justify-center px-6 gap-4">
    {about?.description ? (
      <p className="text-base text-gray-300 text-center max-w-md mx-auto">{about.description}</p>
    ) : (
      <p className="text-base text-gray-300 text-center max-w-md mx-auto">
      I am a passionate{" "}
      <strong className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#A6FF5D] to-[#9CEF53]">
        MERN Stack Developer
      </strong>{" "}
      focused on building scalable, responsive, and engaging web experiences.
      I love transforming ideas into clean, functional applications
      while continuously learning and growing as a developer.
    </p>
    )}

    <div className=" mt-8 flex gap-6 justify-center">
      <a href="https://www.linkedin.com/in/akmal-beg-0b1542331/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="w-8 h-8 hover:-translate-y-0.5 transition text-slate-400 hover:text-[#A6FF5D] transition-colors" />
      </a>
      <a href="https://github.com/AkmalBeg" target="_blank" rel="noopener noreferrer">
        <FaGithub className="w-8 h-8 hover:-translate-y-0.5 transition text-slate-400 hover:text-[#A6FF5D] transition-colors" />
      </a>
    </div>
  </div>
</div>
                <div>
                   <h2 className="text-3xl  pl-38 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#A6FF5D] to-[#9CEF53]">Core Strengths</h2>
<p className="text-sm text-slate-300 mt-2 max-w-2xl pl-5 ">
  From responsive UI to robust backend logic — full-stack capability built on the MERN ecosystem.
</p>
            
                    <div className="flex flex-col gap-10 mt-6 bg-black p-6 rounded-lg">
                      <div className="p-[3px] rounded-lg bg-gradient-to-r from-[#A6FF5D] via-[#5DFFB0] to-[#A6FF5D] bg-[length:200%_200%] animate-gradient-border">
  <div className="flex items-center gap-4 rounded-[10px] p-4 bg-black">
    <div className="min-w-16 h-16 px-2 flex items-center justify-center">
      <CountUp target={techCount} />
    </div>
    <div>
      <h3 className="text-base font-medium text-slate-100">Technologies Used</h3>
      <p className="text-sm text-slate-400">Different technologies I work with across the stack.</p>
    </div>
  </div>
</div>
                       <div className="p-[3px] rounded-lg bg-gradient-to-r from-[#A6FF5D] via-[#5DFFB0] to-[#A6FF5D] bg-[length:200%_200%] animate-gradient-border">
  <div className="flex items-center gap-4 rounded-[10px] p-4 bg-black">
    <div className="min-w-16 h-16 px-2 flex items-center justify-center">
      <CountUp target={projectsCount} />
    </div>
    <div>
      <h3 className="text-base font-medium text-slate-100">Projects Built</h3>
      <p className="text-sm text-slate-400">Projects I have designed and built from scratch.</p>
    </div>
  </div>
</div>
                        <div className="p-[3px] rounded-lg bg-gradient-to-r from-[#A6FF5D] via-[#5DFFB0] to-[#A6FF5D] bg-[length:200%_200%] animate-gradient-border">
  <div className="flex items-center gap-4 rounded-[10px] p-4 bg-black">
    <div className="min-w-16 h-16 px-2 flex items-center justify-center">
      <CountUp target={skillsCount} />
    </div>
    <div>
      <h3 className="text-base font-medium text-slate-100">Skills</h3>
      <p className="text-sm text-slate-400">Skills in my toolkit, from frontend to backend.</p>
    </div>
  </div>
</div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
};