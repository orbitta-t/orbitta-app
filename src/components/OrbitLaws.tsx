import { Compass, Target } from "lucide-react";

const laws = [
  {
    icon: Compass,
    title: "Liderança Situacional",
    description:
      "Defende que não existe um único estilo de liderança eficaz. O líder deve adaptar sua postura de acordo com o nível de maturidade do liderado (M1 a M4). A Orbitta oferece recursos que facilitam a aplicação dessa teoria, permitindo que líderes ajustem seus métodos de gestão em tempo real.",
    iconBg: "from-[#3142ff] to-[#012873]",
    badges: [
      { label: "M1", color: "bg-red-500" },
      { label: "M2", color: "bg-orange-500" },
      { label: "M3", color: "bg-yellow-400" },
      { label: "M4", color: "bg-green-500" },
    ],
  },
  {
    icon: Target,
    title: "Gestão por Competências",
    description:
      "Define competência como um conjunto integrado de conhecimentos (saber), habilidades (saber fazer) e atitudes (querer fazer). Na Orbitta, isso se traduz em trilhas personalizadas de desenvolvimento e uma visão clara de gaps individuais, garantindo que o talento cresça de forma orientada.",
    iconBg: "from-[#E09F7D] to-[#d88a68]",
    badges: [
      { label: "Conhecimento", color: "bg-blue-600" },
      { label: "Habilidade", color: "bg-green-500" },
      { label: "Atitude", color: "bg-purple-600" },
    ],
  },
];

const OrbitLaws = () => {
  return (
    <section
      id="leis"
      className="relative py-24 px-6"
      style={{
        background: "radial-gradient(circle at top, #0c0f1c 0%, #0b0d23 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
          As Leis da Nossa <span className="text-[#E09F7D]">Órbita</span>
        </h2>
        <p className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          Fundamentação teórica que guia nossa plataforma
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {laws.map((law, index) => {
            const Icon = law.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#E09F7D]/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#E09F7D]/10"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${law.iconBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {law.title}
                </h3>

                <p className="text-gray-300 leading-relaxed mb-6">
                  {law.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {law.badges.map((badge, badgeIndex) => (
                    <span
                      key={badgeIndex}
                      className={`${badge.color} text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md`}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>

                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#E09F7D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#E09F7D]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#3142ff]/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default OrbitLaws;
