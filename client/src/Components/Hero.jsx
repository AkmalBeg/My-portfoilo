import React from 'react'
import TypingHeading from './Typingheading';
import image from '../assets/image.png'
import weblogo from '../assets/weblogo.svg'
import { Link } from 'react-router-dom';

const Hero = () => {
 const [mobileOpen, setMobileOpen] = React.useState(false);

 
const scrollToSection = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
};

const downloadResume = () => {
  const link = document.createElement("a");
  link.href = "/JohnDoe.pdf";
  link.download = "Akmal_Beg_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

    return (
        <>
            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
                    *{
                        font-family: "Poppins", sans-serif;
                    }
                    @keyframes rotate {
                        100% {
                            transform: rotate(1turn);
                        }
                    }

                    /* ---------------------------------------------------
                       Reusable background. Copy this class into your
                       global stylesheet (e.g. index.css / globals.css)
                       and apply "hero-bg" to any section/header/div
                       across the project to get the exact same look.
                    --------------------------------------------------- */
                    .hero-bg {
                        background-color: #000;
                        background-image: url("https://assets.prebuiltui.com/components/hero-section/hero-background-image.png");
                        background-size:cover;
                        background-position: center;
                        background-repeat: no-repeat;
                    }

                    .rainbow::before {
                        content: '';
                        position: absolute;
                        z-index: -2;
                        left: -50%;
                        top: -50%;
                        width: 200%;
                        height: 200%;
                        background-position: 100% 50%;
                        background-repeat: no-repeat;
                        background-size: 50% 30%;
                        filter: blur(6px);
                        background-image: linear-gradient(#FFF);
                        animation: rotate 4s linear infinite;
                    }

                    /* ---------------------------------------------------
                       Portrait ring: a spinning gradient ring sitting
                       behind the photo. The photo itself stays static,
                       only the ring rotates.
                    --------------------------------------------------- */
                    .photo-ring {
                        position: relative;
                        z-index: 0;
                    }
                    .photo-ring::before {
                        content: '';
                        position: absolute;
                        inset: -6px;
                        z-index: -1;
                        border-radius: 9999px;
                        background: conic-gradient(from 0deg, transparent 0%, #A6FF5D 25%, transparent 55%, #A6FF5D 85%, transparent 100%);
                        animation: rotate 5s linear infinite;
                    }
                `}
            </style>

            <header className='hero-bg text-white flex flex-col items-center pb-90'>
                <nav className="flex flex-col items-center w-full" >
                    <div className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-4 w-full">
                        <a href="">
                            <img src={weblogo} alt="Logo" className="h-8 md:h-10" />
                        </a>
                        <div id="menu" className={`${mobileOpen ? 'max-md:w-full' : 'max-md:w-0'} max-md:fixed max-md:top-0 max-md:z-10 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-screen max-md:bg-black/50 max-md:backdrop-blur max-md:flex-col max-md:justify-center flex items-center gap-8 text-sm`}>
                            <a href="#" onClick={scrollToSection('Home')} className="text-white/70 hover:text-white/80">Home</a>
                            <a href="#about" onClick={scrollToSection('About')} className="text-white/70 hover:text-white/80">About</a>
                            <a href="#projects" onClick={scrollToSection('Projects')} className="text-white/70 hover:text-white/80">Projects</a>
                            <a href="#skills" onClick={scrollToSection('Skills')} className="text-white/70 hover:text-white/80">Skills</a>
                            <a href="#contact" onClick={scrollToSection('Contact')} className="text-white/70 hover:text-white/80 mr-6">Contact</a>

                            <button id="close-menu" onClick={() => setMobileOpen(false)} className="md:hidden bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-md aspect-square font-medium transition">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                                </svg>
                            </button>
                            <div className='p-[0.5px] rounded-full bg-linear-to-r from-white to-[#999999]/0'>
                                <button className="hidden md:flex items-center gap-2 bg-[#A6FF5D] text-gray-800 font-medium px-4 py-2.5 rounded-full text-sm transition cursor-pointer group">
                                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.795.605v2.593m1.245-1.296h-2.488M1.845 13.565c.687 0 1.244-.58 1.244-1.296s-.557-1.296-1.244-1.296-1.244.58-1.244 1.296.557 1.296 1.244 1.296M6.209 1.13a.65.65 0 0 1 .214-.379.61.61 0 0 1 .795 0 .66.66 0 0 1 .214.38l.653 3.601c.047.256.166.492.343.676s.403.309.649.357l3.456.681a.62.62 0 0 1 .364.223.665.665 0 0 1 0 .828.62.62 0 0 1-.364.223l-3.456.681a1.23 1.23 0 0 0-.65.358c-.176.184-.295.42-.3042.675l-.653 3.602a.65.65 0 0 1-.214.38.61.61 0 0 1-.795 0 .65.65 0 0 1-.214-.38l-.654-3.602a1.3 1.3 0 0 0-.342-.675 1.23 1.23 0 0 0-.649-.358l-3.456-.68a.62.62 0 0 1-.365-.224.665.665 0 0 1 0-.828.62.62 0 0 1 .365-.223l3.456-.68c.246-.05.472-.174.649-.358s.296-.42.342-.676z" stroke="#1e2939" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                     <div className="relative overflow-hidden">
                                        <Link to="/login" className="block transition-transform duration-200 group-hover:-translate-y-full">
                                            Admin Panel
                                        </Link>
                                        <Link to="/login" className="absolute top-0 left-0 block transition-transform duration-200 group-hover:translate-y-0 translate-y-full">
                                            Admin Panel
                                        </Link>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <button id="open-menu" onClick={() => setMobileOpen(true)}
                            className="md:hidden bg-gray-900 hover:bg-gray-800 text-gray-50 p-2 rounded-md aspect-square font-medium transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
                            </svg>
                        </button>
                    </div>
                </nav>

                <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-px flex items-center justify-center rounded-full transition duration-300 active:scale-100 mt-16 md:mt-20">
                    <button className="flex items-center justify-center gap-3 pl-4 pr-6 py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur">
                        <div className="relative flex size-3.5 items-center justify-center">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[#A6FF5D] opacity-75 animate-ping duration-300"></span>
                            <span className="relative inline-flex size-2 rounded-full bg-[#A6FF5D]"></span>
                        </div>
                        <span className='text-xs'>Available to work From idea to launch</span>
                    </button>
                </div>

                {/* Photo + headline, side by side on desktop, stacked on mobile */}
                <div className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-14 mt-8 px-4 md:px-16 lg:px-24 max-w-6xl w-full">

                    <div className="photo-ring shrink-0 w-40 h-40 md:w-56 md:h-56">
                        <img
                            src={image}
                            alt="Portrait"
                            className="w-full h-full object-cover rounded-full border-4 border-black"
                        />
                    </div>

                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                       <h1 className="text-4xl md:text-[56px]/[68px] max-w-2xl bg-clip-text leading-tight text-transparent bg-gradient-to-r from-[#A6FF5D] to-[#9CEF53]">
                        Akmal Beg
                       </h1>
                        <span className="text-4xl md:text-[56px]/[68px] max-w-2xl bg-clip-text leading-tight">
                            <TypingHeading/>
                        </span>
                        <p className="text-sm md:text-base text-gray-300 bg-clip-text max-w-lg mt-4.5">
                           I design and build modern web applications using MongoDB, Express, React and Node.
Open to new opportunities — let's create something great together.
                        </p>

                        <div className='flex gap-3 mt-8'>
                            <a href='#Projects' onClick={scrollToSection('Projects')}>
                            <button className="bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-800 px-6 py-2.5 rounded-full text-sm transition cursor-pointer group">
                                <div className="relative overflow-hidden">
                                    <span className="block transition-transform duration-200 group-hover:-translate-y-full">
                                        View Projects
                                    </span>
                                    <span className="absolute top-0 left-0 block transition-transform duration-200 group-hover:translate-y-0 translate-y-full">
                                       View Projects 
                                    </span>
                                </div>
                            </button>
                            </a>
                            <div className="bg-white/15 hover:bg-white/10 p-px flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                            
                                <button onClick={downloadResume} className="px-6 text-sm py-3 text-white rounded-full bg-white/5 cursor-pointer">
                                    Download Resume
                                </button>
                                 
                            </div>
                        </div>
                    </div>

                </div>
            </header>
        </>
    )
}

export default Hero