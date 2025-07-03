import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import './Skills.css'
import './Projects.css'
import './Contact.css';
import Lottie from 'lottie-react';
import robotAni from "../public/Animation - robot.json";

function App() {

  const sections = {
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null)
  }

  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const [aboutEffect, setAboutEffect] = useState(null);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    if (!aboutEffect && window.VANTA) {
      setAboutEffect(
        window.VANTA.NET({
          el: aboutRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x383bca,
          backgroundColor: 0x140d14,
          points: 12.0,
          maxDistance: 18.0,
          spacing: 14.0,
        })
      );
    }

    return () => {
      if (aboutEffect) aboutEffect.destroy();
    };
  }, [aboutEffect]);


  const fullName = "Abhimanyu Singh Rathore";
  const [typedName, setTypedName] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (index < fullName.length) {
        setTypedName((prev) => prev + fullName.charAt(index))
        setIndex(index + 1)
      } else {
        setTimeout(() => {
          setTypedName("");
          setIndex(0);
        }, 1000)
      }
    }, 100)

    return () => clearTimeout(timeOut)
  }, [index])


  const projects = [
    {
      title: 'Video Streaming App',
      description: 'Full-stack app for video uploads and streaming.',
      tech: 'React, Node.js, MongoDB, JWT',
      github: 'https://github.com/mrrathore67/video-frontend'
    },
    {
      title: 'TextUtils',
      description: 'Text utility app for formatting and counting.',
      tech: 'React, Bootstrap',
      github: 'https://github.com/mrrathore67/TextUtils-'
    },
    {
      title: 'News Portal',
      description: 'Live news feed with category filters.',
      tech: 'React, News API',
      github: 'https://github.com/mrrathore67/News-Monkey'
    },
    {
      title: 'Recipe Book',
      description: 'A simple and interactive Recipe Book web application. Where you can add new recipes with title, ingredients, and instructions in localStorage.',
      tech: 'HTML, CSS, JavaScript, Bootstrap',
      github: 'https://github.com/mrrathore67/Recipe-Book'
    },
    {
      title: 'Link-Shortener',
      description: 'An interactive Link-Shortener web application.',
      tech: 'ReactJS, Bootstrap, APIs',
      github: 'https://github.com/mrrathore67/Recipe-Book'
    },
    {
      title: 'Rock-Paper-Scissors',
      description: 'A simple Rock-Paper-Scissors game.',
      tech: 'HTML, CSS, JavaScript',
      github: 'https://github.com/mrrathore67/Rock-Paper-Scissors'
    }
  ];





  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if we're at the bottom of the page
      if (scrollY + windowHeight >= documentHeight - 50) {
        setActiveSection("contact");
        return;
      }

      const sectionOffsets = {
        about: aboutRef.current.offsetTop,
        skills: skillsRef.current.offsetTop,
        projects: projectsRef.current.offsetTop,
        contact: contactRef.current.offsetTop,
      };

      // Find the last section where scroll position is past its offset
      let current = "about";
      Object.entries(sectionOffsets).forEach(([section, offset]) => {
        if (scrollY + windowHeight * 0.3 >= offset) { 
          current = section;
        }
      });

      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);


  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current?.scrollIntoView({ behavior: "smooth" })
    }

  }


  return (
    <div>
      {/* NavBar */}
      <section className='navbar'>
        <nav className='nav'>
          <div className='nav-name'>╰┈➤ Portfolio</div>
          <div className={`nav-links ${isOpen ? "active" : ""}`}>
            <button className={activeSection === 'about' ? "active-link" : ""} onClick={() => scrollToSection(aboutRef)}>About</button>
            <button className={activeSection === 'skills' ? "active-link" : ""} onClick={() => scrollToSection(skillsRef)}>Skills</button>
            <button className={activeSection === 'projects' ? "active-link" : ""} onClick={() => scrollToSection(projectsRef)}>Projects</button>
            <button className={activeSection === 'contact' ? "active-link" : ""} onClick={() => scrollToSection(contactRef)}>Contact</button>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div className={`bar ${isOpen ? "rotate1" : ""}`}></div>
            <div className={`bar ${isOpen ? "hide" : ""}`}></div>
            <div className={`bar ${isOpen ? "rotate2" : ""}`}></div>
          </div>
        </nav>
      </section>

      {/* About */}
      <section ref={aboutRef} className="about">


        <div className="about-content">
          {/* Left */}
          <div className="about-me">
            <div className="name">
              <h1>Hi,  <span className='typed-name'>I'm {typedName}</span></h1>
              <p>Front-end Developer | React.js | MERN Stack</p>
            </div>
            <div className="pro-summary">
              <p>
                A passionate self-taught Front-End Developer. With a strong foundation in <span className="language"> HTML, CSS,
                  JavaScript, and React.js.</span> My journey started with curiosity and hands-on practice.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="profile-image">
            <img src="/AbhimanyuSingh.jpg" alt="Abhimanyu" />
          </div>
        </div>
      </section>

      {/* Skills */}
      <section ref={skillsRef} className="skills-section">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">These are all my skill sets.</p>

        <div className="skills-grid">
          {/* Card 1: Programming Languages */}
          <div className="skill-card">
            <h3>Programming Languages</h3>
            <div className="skill-item">
              <img src="https://img.icons8.com/?size=48&id=v8RpPQUwv0N8&format=png" alt="HTML" />
              <span>HTML</span>
            </div>
            <div className="skill-item">
              <img src="https://img.icons8.com/?size=80&id=YjeKwnSQIBUq&format=png" alt="CSS" />
              <span>CSS</span>
            </div>
            <div className="skill-item">
              <img src="https://img.icons8.com/?size=48&id=PXTY4q2Sq2lG&format=png" alt="JavaScript" />
              <span>JavaScript</span>
            </div>
          </div>

          {/* Card 2: Front-End */}
          <div className="skill-card">
            <h3>Front-End Technologies</h3>
            <div className="skill-item">
              <img src="https://img.icons8.com/?size=80&id=wPohyHO_qO1a&format=png" alt="ReactJS" />
              <span>ReactJS</span>
            </div>
            <div className="skill-item">
              <img src="https://img.icons8.com/?size=48&id=PndQWK6M1Hjo&format=png" alt="Bootstrap" />
              <span>Bootstrap</span>
            </div>
            <div className="skill-item">
              <img src="https://img.icons8.com/?size=48&id=x7XMNGh2vdqA&format=png" alt="Tailwind" />
              <span>Tailwind CSS</span>
            </div>
          </div>

          {/* Card 3: Back-End */}
          <div className="skill-card">
            <h3>Back-End & Full-Stack</h3>
            <div className="skill-item">
              <img src="https://img.icons8.com/?size=48&id=hsPbhkOH4FMe&format=png" alt="Node.js" />
              <span>Node.js</span>
            </div>
            <div className="skill-item">
              <img src="https://img.icons8.com/?size=50&id=kg46nzoJrmTR&format=png" alt="Express.js" />
              <span>Express.js</span>
            </div>
            <div className="skill-item">
              <img src="https://img.icons8.com/?size=48&id=bosfpvRzNOG8&format=png" alt="MongoDB" />
              <span>MongoDB</span>
            </div>
            <div className="skill-item">
              <img src="https://img.icons8.com/?size=48&id=21896&format=png" alt="REST APIs" />
              <span>REST APIs</span>
            </div>
          </div>

          {/* Card 4: Others */}
          <div className="skill-card">
            <h3>Others</h3>
            <div className="skill-item">
              <img src="https://img.icons8.com/?size=64&id=3tC9EQumUAuq&format=png" alt="GitHub" />
              <span>GitHub</span>
            </div>
            <div className="skill-item">
              <img src="https://img.icons8.com/?size=48&id=9OGIyU8hrxW5&format=png" alt="VS Code" />
              <span>VS Code</span>
            </div>
            <div className="skill-item">
              <img src="https://img.icons8.com/?size=80&id=EPbEfEa7o8CB&format=png" alt="Postman" />
              <span>Postman</span>
            </div>
            <div className="skill-item">
              <img src="https://img.icons8.com/?size=48&id=20906&format=png" alt="Git" />
              <span>Git</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section ref={projectsRef} className="projects-section" id="projects">
        <h2 className="projects-title">Projects</h2>
        <p className="projects-subtitle">
          Here are some of the real-world projects I've built to sharpen my front-end and full-stack development skills.
          These projects demonstrate my ability to work with React.js, Node.js, MongoDB, APIs, and modern UI frameworks like Tailwind and Bootstrap.
          Each project focuses on solving a specific problem or delivering a useful feature with clean, responsive design.
        </p>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <p className="project-tech"><strong>Tech:</strong> {project.tech}</p>
              <a href={project.github} target="_blank" rel="noreferrer" className="project-link">View on GitHub</a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section ref={contactRef} className="contact-section" id="contact">
        <h2 className="contact-title">Contact Me</h2>

        <div className="contact-details">
          <p>
            📧 Email: <a href="mailto:asr672001@gmail.com">asr672001@gmail.com</a>
          </p>
          <p>
            📞 Mobile No.: <a href="tel:+917690841833">+91 7690841833</a>
          </p>

          <div className="contact-buttons">
            <a href="https://linkedin.com/in/abhimanyu-singh-rathore-0399a8337" target="_blank" rel="noopener noreferrer" className="contact-btn">
              <img src="https://img.icons8.com/?size=48&id=qNUNvR9aEWql&format=png" alt="LinkedIn" /> <span>LinkedIn</span>
            </a>

            <a href="https://github.com/mrrathore67" target="_blank" rel="noopener noreferrer" className="contact-btn">
              <img src="https://img.icons8.com/?size=64&id=3tC9EQumUAuq&format=png" alt="GitHub" /> <span>GitHub</span>
            </a>

            <a href="/Abhimanyu_Singh_Rathore.pdf"  download target="_blank" rel="noopener noreferrer" onClick={() => alert("Resume has downloaded") } className="contact-btn">
              <img src="https://img.icons8.com/?size=80&id=44091&format=png" alt="Resume" /> <span>Resume</span>
            </a>
          </div>
        </div>

        <div className="contact-animation">
          <Lottie animationData={robotAni} loop className="robot-lottie" />
        </div>
      </section>
    </div>
  )
}

export default App
