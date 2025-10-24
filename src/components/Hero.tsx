import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  useEffect(() => {
    const starContainer = document.getElementById("stars");
    if (!starContainer) return;

    const numStars = 150;
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.className = "absolute bg-white rounded-full opacity-80 animate-twinkle";
      star.style.top = Math.random() * 100 + "%";
      star.style.left = Math.random() * 100 + "%";
      const size = Math.random() * 2 + 1;
      star.style.width = size + "px";
      star.style.height = size + "px";
      star.style.animationDuration = Math.random() * 2 + 1 + "s";
      starContainer.appendChild(star);
    }
  }, []);
  const navigate = useNavigate();
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
      style={{
        background: "radial-gradient(circle at bottom, #012873 0%, #000303 80%)",
      }}
    >
      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-[#E09F7D] bg-clip-text text-transparent font-michroma">
          Conectando talentos em uma única órbita
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Do ponto de partida ao sucesso, uma plataforma que potencializa o
          desenvolvimento e alinha a estratégia da sua equipe.
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-[#012873] to-[#E09F7D] text-white font-semibold rounded hover:scale-105 hover:shadow-xl transition-all duration-300" onClick={() => navigate("/login")}>
          COMEÇAR AGORA
        </button>
      </div>

      {/* Stars */}
      <div id="stars" className="absolute inset-0 z-0"></div>

      {/* Rings */}
      <div className="ring small"></div>
      <div className="ring medium"></div>
      <div className="ring large"></div>
      
      {/* Galaxy Rings */}
      <div className="galaxy-ring one"></div>
      <div className="galaxy-ring two"></div>

      {/* Curved bottom section */}
      <div className="absolute bottom-0 left-0 w-full h-[50vh] overflow-hidden">
        <div
          className="absolute -bottom-[190vh] h-[200vh] w-full left-0 bg-[#090F24] z-[1] shadow-[0_-20px_100px_20px_rgba(255,255,255,0.3),0_-1px_15px_-1px_rgba(255,255,255,0.5)_inset]"
          style={{
            borderTopLeftRadius: "50vw 11vh",
            borderTopRightRadius: "50vw 11vh",
          }}
        ></div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-twinkle {
          animation: twinkle 2s infinite ease-in-out;
        }
        .ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: rotateRing 30s linear infinite;
          opacity: 0.2;
          z-index: 1;
        }
        .ring.small { width: 45vh; height: 45vh; animation-duration: 25s; }
        .ring.medium { width: 70vh; height: 70vh; animation-duration: 40s; }
        .ring.large { width: 95vh; height: 95vh; animation-duration: 55s; }
        .galaxy-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border: 2px solid rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          transform: translate(-50%, -50%) rotateX(65deg) rotateZ(25deg);
          animation: rotateGalaxy 90s linear infinite;
          filter: blur(1px);
          z-index: 0;
        }
        .galaxy-ring.one { width: 80vh; height: 45vh; animation-duration: 120s; }
        .galaxy-ring.two { width: 100vh; height: 50vh; opacity: 0.08; animation-duration: 150s; }
        @keyframes rotateRing {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes rotateGalaxy {
          from { transform: translate(-50%, -50%) rotateX(65deg) rotateZ(0deg); }
          to { transform: translate(-50%, -50%) rotateX(65deg) rotateZ(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
