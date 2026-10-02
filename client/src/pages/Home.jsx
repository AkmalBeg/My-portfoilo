import React from 'react'
import Hero from '../Components/Hero.jsx'
import About from '../Components/About.jsx'
import Project from '../Components/project.jsx'
import Skills from '../Components/Skills.jsx'
import Contact from '../Components/Contact.jsx'
import AdminBar from '../Components/AdminBar.jsx'
const Home = () => {
  return (
  <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <AdminBar />
      <section className="h-screen snap-start">
        <Hero />
      </section>
      <section id='About' className="h-screen snap-start overflow-y-auto bg-black">
        <About />
      </section>
      <section id='Projects' className="h-screen snap-start">
        <Project />
      </section>
      <section id='Skills' className="h-screen snap-start">
        <Skills />
      </section>
      <section id='Contact' className="h-screen snap-start">
        <Contact />
      </section>
    </div>
  )
}

export default Home