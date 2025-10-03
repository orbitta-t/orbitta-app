import React from "react";

import "./landing.css";

import Login from "../LoginPage/index";
import { useNavigate } from "react-router-dom";

import NavbarEffect from "../../components/Landing/Navbar/navbar";
import FloatEffect from "../../components/Landing/Float/float";
import StarsBackground2 from "../../components/Landing/StarsBackground2/stars";

import logo2 from "./img/logo.svg";
import logo from "./img/logo.png"
import titleobj1 from "./img/titleobj1.svg";
import titlepers1 from "./img/titlepers1.svg";
import titleobj2 from "./img/titleobj2.svg";
import titlepers2 from "./img/titlepers2.svg";
import iconback from "./img/iconback.svg";
import iconobj1 from "./img/iconobj1.svg";
import iconpers1 from "./img/iconpers1.svg";
import iconpers2 from "./img/iconpers2.svg";
import backgoal1 from "./img/backgoal1.svg";
import spark from "./img/spark.svg";
import goal1 from "./img/goal1.svg";
import goal2 from "./img/goal2.svg";
import iconback3 from "./img/iconback3.svg";
import iconobj3 from "./img/iconobj3.svg";
import iconpers3 from "./img/iconpers3.svg";
import iconobj4 from "./img/iconobj4.svg";

function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      <NavbarEffect />
      <FloatEffect />
      <StarsBackground2 />

      {/* HEADER */}
      <header className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Orbitta Logo" draggable="false" />
        </div>
        <nav className="navbar-links">
          <a href="#tela1" className="nav-link active">Início</a>
          <a href="#tela2b" className="nav-link">O problema</a>
          <a href="#tela3" className="nav-link">A solução</a>
          <a href="#tela4" className="nav-link">Funcionalidades</a>
          <a href="#tela6" className="nav-link">Nossa Órbita</a>
        </nav>
        <div className="navbar-actions">
          <button className="navbar-btn" onClick={() => navigate("/login")}>Entrar</button>
          <button className="navbar-btn">Cadastrar</button>
        </div>
      </header>

      {/* HERO */}
      <section id="tela1">
        <div className="hero-content">
          <h2 className="titleofc gradient-orange">
            Conectando talentos em uma única órbita
          </h2>
          <p className="textofc white">
            Do ponto de partida ao sucesso, uma plataforma que potencializa o
            desenvolvimento e alinha a estratégia da sua equipe.
          </p>
          <button className="botao-gradiente">Começar agora</button>
        </div>

        <div className="stars" id="stars"></div>
        <div className="ring small"></div>
        <div className="ring medium"></div>
        <div className="ring large"></div>
        <div className="galaxy-ring one"></div>
        <div className="galaxy-ring two"></div>

        <div id="container-curvo">
          <div id="tela2"></div>
        </div>

        <div className="absolute cbox" style={{ display: "none" }}>
          <div id="titleiconbox">
            <img className="icon absolute float" src={titleobj1} alt="" draggable="false" />
            <img className="icon absolute" src={titlepers1} alt="" draggable="false" />
          </div>
          <div id="titleiconbox2">
            <img className="icon absolute float" src={titleobj2} alt="" draggable="false" />
            <img className="icon absolute" src={titlepers2} alt="" draggable="false" />
          </div>
        </div>
      </section>

      {/* === SECTIONS === */}
      <section id="tela2b">
      <div className="center white marginb">
        <h1 className="center title">Obstáculos enfrentados</h1>
        <p className="text">
          Problemas que atingem a sua órbita e desviam a rota de crescimento da sua equipe.
        </p>
      </div>

      <div className="white box1">
        {/* BOX 1 */}
        <div className="left">
          <div className="minbox1 marginb">
            <h2 className="title2">O Vácuo do Feedback</h2>
            <p className="text">
              Apesar de 70% dos profissionais de TI considerarem o feedback regular fundamental,
              a maioria não o recebe. Essa desconexão gera desmotivação, ansiedade e um sentimento
              de que o trabalho não está sendo visto.
            </p>
          </div>
          <div className="imgset1">
            <img className="absolute icon float" src={iconback} alt="" draggable="false"
              style={{ userDrag: "none", WebkitUserDrag: "none" }} />
            <img className="absolute icon float" src={iconobj1} alt="" draggable="false"
              style={{ userDrag: "none", WebkitUserDrag: "none" }} />
            <img className="absolute icon float" src={iconpers1} alt="" draggable="false"
              style={{ userDrag: "none", WebkitUserDrag: "none" }} />
            <img className="absolute icon float" src={iconpers2} alt="" draggable="false"
              style={{ userDrag: "none", WebkitUserDrag: "none" }} />
          </div>
        </div>

        {/* BOX 2 */}
        <div className="right">
          <div className="minbox2 marginb">
            <h2 className="title2">A Lacuna da Gestão</h2>
            <p className="text">
              Apenas 64% das empresas brasileiras possuem um processo formal de avaliação de desempenho.
              Sem ele, líderes e equipes ficam sem uma direção clara para o crescimento, gerando um ciclo
              de ineficiência e incerteza.
            </p>
          </div>
          <div className="imgset2">
            <img className="absolute icon float" src={backgoal1} alt="" draggable="false"
              style={{ userDrag: "none", WebkitUserDrag: "none" }} />
            <img className="absolute icon float" src={spark} alt="" draggable="false"
              style={{ userDrag: "none", WebkitUserDrag: "none" }} />
            <img className="absolute icon float" src={goal2} alt="" draggable="false"
              style={{ userDrag: "none", WebkitUserDrag: "none" }} />
            <img className="absolute icon float" src={goal1} alt="" draggable="false"
              style={{ userDrag: "none", WebkitUserDrag: "none" }} />
          </div>
        </div>

        {/* BOX 3 */}
        <div className="left">
          <div className="minbox1 marginb">
            <h2 className="title2">O Custo da Incerteza</h2>
            <p className="text">
              Para 43% dos profissionais de TI, a falta de um plano de carreira claro é o principal motivo
              para a troca de emprego. A ausência de perspectivas de crescimento se torna um alto custo de
              rotatividade para a empresa.
            </p>
          </div>
          <div className="imgset1">
            <img className="absolute icon float" src={iconback3} alt="" draggable="false"
              style={{ userDrag: "none", WebkitUserDrag: "none" }} />
            <img className="absolute icon float" src={iconobj3} alt="" draggable="false"
              style={{ userDrag: "none", WebkitUserDrag: "none" }} />
            <img className="absolute icon float" src={iconpers3} alt="" draggable="false"
              style={{ userDrag: "none", WebkitUserDrag: "none" }} />
            <img className="absolute icon float" src={iconobj4} alt="" draggable="false"
              style={{ userDrag: "none", WebkitUserDrag: "none" }} />
          </div>
        </div>
      </div>
    </section>

      {/* Section 3 */}
      <section id="tela3">
        <div className="t3-inner">
          <h1 className="t3-title margin1">
            <span>Nossa</span> <span className="orange">Solução</span>
          </h1>
                    <div className="t3-grid">
      <div className="t3-left">
        <div className="t3-card-large"><img src="/src/pages/landing/img/orb2.jfif" draggable="false" style={{ userDrag: "none", webkitUserDrag: "none"}}/></div>
        <div className="t3-card-small" aria-hidden="true"><img src="/src/pages/landing/img/orb1.jfif" draggable="false" style={{ userDrag: "none", webkitUserDrag: "none"}}/></div>
      </div>
      <div className="t3-right">
        <div className="t3-feature">
          <div className="t3-feature-icon"><img src="/src/pages/landing/img/grap1.svg" alt="" draggable="false" style={{ userDrag: "none", webkitUserDrag: "none"}}/></div>
          <div className="t3-feature-text">
            <h2>Para o Líder</h2>
            <p>Oferece visibilidade total das competências da equipe, transformando gestão em liderança estratégica.</p>
          </div>
        </div>
        <div className="t3-feature">
          <div className="t3-feature-icon t3-feature-icon--peach"><img src="/src/pages/landing/img/heart1.svg" alt="" draggable="false" style={{ userDrag: "none", webkitUserDrag: "none"}}/></div>
          <div className="t3-feature-text">
            <h2>Para o Liderado</h2>
            <p>Cria um caminho claro de evolução profissional, conectando carreira e projetos.</p>
          </div>
        </div>
        <div className="t3-feature">
          <div className="t3-feature-icon"><img src="/src/pages/landing/img/brief1.svg" alt="" draggable="false" style={{ userDrag: "none", webkitUserDrag: "none"}}/></div>
          <div className="t3-feature-text">
            <h2>Para a Empresa</h2>
            <p>Garante retenção de talentos e acelera resultados, cultivando uma cultura de crescimento.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

        
      </section>

      {/* Section 4 */}
      <section id="tela4">
        <div className="t4-inner">
          <h1 className="t4-title">Funcionalidades</h1>
          
          <div className="t4-grid">
      <div className="t4-left">
        <div className="t4-feature">
          <div className="t4-icon"><span class="notselect">✔</span></div>
          <div className="t4-text">
            <h3>Gráfico "VERSUS"</h3>
            <p>Compare as competências atuais do colaborador com o perfil ideal do cargo de forma visual e intuitiva.</p>
          </div>
        </div>
        <div className="t4-feature">
          <div className="t4-icon"><span class="notselect">✔</span></div>
          <div className="t4-text">
            <h3>Painel de Maturidade</h3>
            <p>Visualize a distribuição de maturidade (M1-M4) de toda a sua equipe em um único gráfico de quadrante.</p>
          </div>
        </div>
        <div className="t4-feature">
          <div className="t4-icon"><span class="notselect">✔</span></div>
          <div className="t4-text">
            <h3>Contextualize novos membros</h3>
            <p>rapidamente com uma página central de objetivos, links e responsabilidades.</p>
          </div>
        </div>
        <div className="t4-feature">
          <div className="t4-icon"><span class="notselect">✔</span></div>
          <div className="t4-text">
            <h3>Linha do Tempo</h3>
            <p>Registre e consulte feedbacks e marcos de desenvolvimento em um histórico cronológico e de fácil acesso.</p>
          </div>
        </div>
      </div>
      <div className="t4-right">
        <div className="t4-card">
          <img className="t4-person" src="/src/pages/landing/img/lider.svg" alt="Líder Técnico" draggable="false" style={{ userDrag: "none", webkitUserDrag: "none"}}/>
          <div className="t4-card-content">
            <h2>Líder Técnico</h2>
            <p>Dores do Líder</p>
          </div>
        </div>
      </div>
    </div>

        </div>
      </section>

      {/* Section 5 */}
      <section id="tela5">
        
        <div className="t5-inner">
    <div className="t5-grid">
      <div className="t5-left">
        <div className="t5-card">
          <img className="t5-person" src="/src/pages/landing/img/liderado.svg" alt="Colaborador" draggable="false" style={{ userDrag: "none", webkitUserDrag: "none"}}/>
          <div className="t5-card-content">
            <h2>Colaborador</h2>
            <p>Dores do Liderado</p>
          </div>
        </div>
      </div>
      <div clasNames="t5-right">
        <div className="t5-feature">
          <div className="t5-text">
            <h3>Histórico de Feedback</h3>
            <p>Consulte feedbacks salvos em linha cronológica para compreender os pontos fortes e pontos de melhoria.</p>
          </div>
          <div className="t5-icon"><span class="notselect">✔</span></div>
        </div>
        <div className="t5-feature">
          <div className="t5-text">
            <h3>Trilha de Desenvolvimento</h3>
            <p>Tenha acesso a uma trilha de desenvolvimento criado pelo próprio Líder para guiá-lo no projeto.</p>
          </div>
          <div className="t5-icon"><span class="notselect">✔</span></div>
        </div>
        <div className="t5-feature">
          <div className="t5-text">
            <h3>Onboarding do projeto</h3>
            <p>Integração rápida e eficiente de novos membros à equipe e ao projeto.</p>
          </div>
          <div className="t5-icon"><span class="notselect">✔</span></div>
        </div>
      </div>
    </div>
  </div>

      </section>

      {/* Section 6 */}
      <section id="tela6">
        
        <div className="t6-inner">
    <h1 className="t6-title">As Leis da Nossa Órbita</h1>
    <p className="t6-subtitle">Nossa metodologia é baseada em ciência, não em achismos</p>
    <div className="t6-cards">
      <div className="t6-card">
        <div className="t6-card-icon blue notselect">⚡</div>
        <h2>Liderança Situacional</h2>
        <p className="t6-text">
          "Defende que não existe um único estilo de liderança eficaz. O líder deve adaptar sua postura de acordo com o 
          <span className="highlight margA">nível de maturidade do liderado (M1 a M4)</span>. A Orbitta oferece recursos que facilitam 
          a aplicação dessa teoria, permitindo que líderes ajustem seus métodos de gestão em tempo real."
        </p>
        <div className="t6-card-bottom">
          <span className="badge red notselect">M1</span>
          <span className="badge orange notselect">M2</span>
          <span className="badge yellow notselect">M3</span>
          <span className="badge green notselect">M4</span>
        </div>
        <div className="t6-card-labels">
          <span>Iniciante</span>
          <span>Aprendiz</span>
          <span>Competente</span>
          <span>Expert</span>
        </div>
      </div>
      <div className="t6-card">
        <div className="t6-card-icon orange notselect">📊</div>
        <h2>Gestão por Competências</h2>
        <p className="t6-text">
          "Define competência como um conjunto integrado de 
          <span className="highlight margA">conhecimentos (saber)</span>, 
          <span className="highlight margA margB">habilidades (saber fazer)</span> 
          e <span className="highlight marg">atitudes (querer fazer)</span>.
          Na Orbitta, isso se traduz em trilhas personalizadas de desenvolvimento e uma visão clara de gaps individuais,
          garantindo que o talento cresça de forma orientada."
        </p>
        <div className="t6-card-bottom">
          <span className="badge blue2 notselect">K</span>
          <span className="badge green2 notselect">S</span>
          <span className="badge purple notselect">A</span>
        </div>
        <div className="t6-card-labels">
          <span>Conhecimento</span>
          <span>Habilidade</span>
          <span>Atitude</span>
        </div>
      </div>
    </div>
  </div>

      </section>

      {/* FOOTER */}
      <footer id="footer">
        <div className="footer-inner">
          <div className="footer-left">
            <img className="reverse icon2" src={logo} alt="Orbitta Logo" draggable="false" />
            <p>
              Do ponto de partida ao sucesso, uma plataforma que sincroniza a estratégia e o desempenho de toda a equipe.
            </p>
          </div>

          <div class="footer-divider"></div>

          <div className="footer-links">
            <h4>Plataforma</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Problemas</a></li>
              <li><a href="#">Solução</a></li>
              <li><a href="#">Metodologia</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Orbitta. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;