import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import logoWhite from '@/assets/logo-white.png';
import iconpers2 from '@/assets/iconpers2.svg';
import iconpers3 from '@/assets/iconpers3.svg';

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecionar se já estiver autenticado
    if (isAuthenticated) {
      navigate('/');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAuthenticated, navigate]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#000303] text-white">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(9,15,36,0.85)] backdrop-blur-xl'
            : 'bg-[rgba(9,15,36,0.75)] backdrop-blur-xl'
        } border-b border-white/10`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <img src={logoWhite} alt="Orbitta" className="h-8" />

          <div className="hidden md:flex gap-10">
            <button
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-[#E09F7D] transition-colors relative group"
            >
              Início
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E09F7D] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-white hover:text-[#E09F7D] transition-colors relative group"
            >
              Sobre
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E09F7D] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
            <button
              onClick={() => scrollToSection('recursos')}
              className="text-white hover:text-[#E09F7D] transition-colors relative group"
            >
              Recursos
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E09F7D] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          </div>

          <Link to="/login">
            <Button
              className="border-2 border-transparent bg-gradient-to-r from-transparent to-transparent hover:from-[rgba(224,159,125,0.2)] hover:to-[rgba(255,255,255,0.05)] text-white hover:text-[#E09F7D] transition-all hover:shadow-lg hover:shadow-[rgba(224,159,125,0.3)]"
              style={{
                borderImage: 'linear-gradient(90deg, #E09F7D, #ffffff) 1'
              }}
            >
              Entrar
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center text-center relative overflow-hidden"
        style={{
          background: 'radial-gradient(circle at bottom, #012873 0%, #000303 80%)'
        }}
      >
        <div className="z-10 max-w-3xl px-6">
          <h1 className="font-['Michroma'] text-4xl md:text-5xl mb-6 tracking-tight">
            ORBITTA
          </h1>
          <p className="text-base md:text-lg mb-8 opacity-90 max-w-lg mx-auto leading-relaxed">
            Plataforma inteligente de gestão de competências e desenvolvimento de equipes
          </p>
          <Link to="/login">
            <Button
              className="bg-gradient-to-r from-[#012873] to-[#e09f7d] hover:shadow-xl transition-all hover:-translate-y-1 text-white font-medium uppercase tracking-wider"
              size="lg"
            >
              Começar Agora
            </Button>
          </Link>
        </div>

        {/* Decorative gradient orb */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-t from-[#012873] to-transparent rounded-full blur-3xl opacity-50" />
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-24 px-6 bg-[#0a0f1a]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Sobre o <span className="text-[#E09F7D]">ORBITTA</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg leading-relaxed opacity-90 mb-6">
                O ORBITTA é uma plataforma completa para gestão de competências e desenvolvimento
                de equipes, permitindo que líderes acompanhem a evolução de seus liderados de forma
                estratégica e baseada em dados.
              </p>
              <p className="text-lg leading-relaxed opacity-90">
                Com visualizações intuitivas e análises detalhadas, facilitamos a identificação de
                gaps de competências e a criação de planos de desenvolvimento personalizados.
              </p>
            </div>
            <div className="relative">
              <img src={iconpers2} alt="Ilustração" className="w-full max-w-md mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Recursos Section */}
      <section id="recursos" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Recursos <span className="text-[#E09F7D]">Principais</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[rgba(9,15,36,0.5)] backdrop-blur-xl p-8 rounded-lg border border-white/10 hover:border-[#E09F7D]/50 transition-all">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">Análise de Competências</h3>
              <p className="opacity-80">
                Visualize e compare competências técnicas e comportamentais da sua equipe
              </p>
            </div>
            <div className="bg-[rgba(9,15,36,0.5)] backdrop-blur-xl p-8 rounded-lg border border-white/10 hover:border-[#E09F7D]/50 transition-all">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Gestão de Maturidade</h3>
              <p className="opacity-80">
                Acompanhe o nível de maturidade (M1-M4) de cada membro da equipe
              </p>
            </div>
            <div className="bg-[rgba(9,15,36,0.5)] backdrop-blur-xl p-8 rounded-lg border border-white/10 hover:border-[#E09F7D]/50 transition-all">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-3">Desenvolvimento Individual</h3>
              <p className="opacity-80">
                Planos personalizados de desenvolvimento baseados em gaps identificados
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <img src={iconpers3} alt="Ilustração recursos" className="w-full max-w-md mx-auto" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 bg-[#0a0f1a]">
        <div className="container mx-auto text-center opacity-60">
          <p>&copy; 2025 ORBITTA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
