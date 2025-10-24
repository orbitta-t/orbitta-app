import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    const sections = ["inicio", "obstaculos", "solucao", "funcionalidades", "leis"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Início", id: "inicio" },
    { href: "#obstaculos", label: "O problema", id: "obstaculos" },
    { href: "#solucao", label: "A solução", id: "solucao" },
    { href: "#funcionalidades", label: "Funcionalidades", id: "funcionalidades" },
    { href: "#leis", label: "Nossa Órbita", id: "leis" }
  ];


  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#090F24]/85 backdrop-blur-xl"
          : "bg-[#090F24]/75 backdrop-blur-xl"
      } border-b border-white/10`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-white">Orbitta</div>

        <div className="hidden md:flex gap-10">
          <a
            href="#inicio"
            className="text-white/90 hover:text-[#E09F7D] transition-colors relative group"
          >
            Início
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E09F7D] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="#obstaculos"
            className="text-white/90 hover:text-[#E09F7D] transition-colors relative group"
          >
            O problema
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E09F7D] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="#solucao"
            className="text-white/90 hover:text-[#E09F7D] transition-colors relative group"
          >
            A solução
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E09F7D] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="#funcionalidades"
            className="text-white/90 hover:text-[#E09F7D] transition-colors relative group"
          >
            Funcionalidades
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E09F7D] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="#leis"
            className="text-white/90 hover:text-[#E09F7D] transition-colors relative group"
          >
            Nossa Órbita
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E09F7D] group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>

        <button className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-[#E09F7D] to-[#d88a68] text-white font-semibold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-[#E09F7D]/30 transition-all duration-300" onClick={() => navigate("/login")}>
          Acessar Plataforma
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
