const elementosFlutuantes = document.querySelectorAll('.float');

    elementosFlutuantes.forEach(elemento => {
        // Gera um atraso aleatório entre 0 e 3 segundos
        const atrasoAleatorio = Math.random() * 3;
        
        // Aplica o atraso
        elemento.style.animationDelay = `${atrasoAleatorio}s`;

        // Opcional: variar a duração da animação
        const duracaoAleatoria = 2 + Math.random() * 2; // entre 2s e 4s
        elemento.style.animationDuration = `${duracaoAleatoria}s`;
    });

    /* ======= GERADOR DE ESTRELAS ======= */
const starContainer = document.getElementById("stars");
const numStars = 150;

for (let i = 0; i < numStars; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  // Posição aleatória
  star.style.top = Math.random() * 100 + "%";
  star.style.left = Math.random() * 100 + "%";

  // Tamanho aleatório
  const size = Math.random() * 2 + 1;
  star.style.width = size + "px";
  star.style.height = size + "px";

  // Velocidade aleatória
  star.style.animationDuration = (Math.random() * 2 + 1) + "s";

  starContainer.appendChild(star);
}

