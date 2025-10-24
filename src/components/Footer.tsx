import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-10 mb-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Orbitta</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Conectando talentos em uma única órbita. Do ponto de partida ao
              sucesso.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/orbitta"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 hover:bg-[#E09F7D] rounded-full flex items-center justify-center transition-colors group"
              >
                <Instagram className="w-5 h-5 text-gray-600 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#inicio"
                  className="text-gray-600 hover:text-[#E09F7D] transition-colors"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#obstaculos"
                  className="text-gray-600 hover:text-[#E09F7D] transition-colors"
                >
                  O Problema
                </a>
              </li>
              <li>
                <a
                  href="#solucao"
                  className="text-gray-600 hover:text-[#E09F7D] transition-colors"
                >
                  A Solução
                </a>
              </li>
              <li>
                <a
                  href="#funcionalidades"
                  className="text-gray-600 hover:text-[#E09F7D] transition-colors"
                >
                  Funcionalidades
                </a>
              </li>
              <li>
                <a
                  href="#leis"
                  className="text-gray-600 hover:text-[#E09F7D] transition-colors"
                >
                  Nossa Órbita
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Orbitta. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-[#E09F7D] transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-600 hover:text-[#E09F7D] transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-600 hover:text-[#E09F7D] transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
