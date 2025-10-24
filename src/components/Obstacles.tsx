import { AlertCircle, TrendingDown, Users } from "lucide-react";

const obstacles = [
  {
    icon: AlertCircle,
    title: "O Vácuo do Feedback",
    description:
      "Apesar de 70% dos profissionais de TI considerarem o feedback regular fundamental, a maioria não o recebe. Essa desconexão gera desmotivação, ansiedade e um sentimento de que o trabalho não está sendo visto.",
    stat: "70%",
  },
  {
    icon: Users,
    title: "A Lacuna da Gestão",
    description:
      "Apenas 64% das empresas brasileiras possuem um processo formal de avaliação de desempenho. Sem ele, líderes e equipes ficam sem uma direção clara para o crescimento, gerando um ciclo de ineficiência e incerteza.",
    stat: "64%",
  },
  {
    icon: TrendingDown,
    title: "O Custo da Incerteza",
    description:
      "Para 43% dos profissionais de TI, a falta de um plano de carreira claro é o principal motivo para a troca de emprego. A ausência de perspectivas de crescimento se torna um alto custo de rotatividade para a empresa.",
    stat: "43%",
  },
];

const Obstacles = () => {
  return (
    <section id="obstaculos" className="bg-[#090F24] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
          Obstáculos <span className="text-[#E09F7D]">Enfrentados</span>
        </h2>
        <p className="text-center text-white/70 mb-16 max-w-2xl mx-auto">
          Desafios que impedem o crescimento e engajamento das equipes
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {obstacles.map((obstacle, index) => {
            const Icon = obstacle.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#E09F7D]/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#E09F7D]/20"
              >
                <div className="absolute top-0 right-0 text-8xl font-bold text-[#E09F7D]/10 pr-4 pt-2 select-none">
                  {obstacle.stat}
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#E09F7D]/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#E09F7D]/30 transition-colors">
                    <Icon className="w-8 h-8 text-[#E09F7D]" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {obstacle.title}
                  </h3>

                  <p className="text-white/80 leading-relaxed">
                    {obstacle.description}
                  </p>
                </div>

                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#E09F7D]/20 via-[#012873]/20 to-[#E09F7D]/20 animate-pulse"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Obstacles;
