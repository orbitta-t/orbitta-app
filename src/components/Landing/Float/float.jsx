import { useEffect } from "react";

export default function FloatEffect() {
  useEffect(() => {
    const elementosFlutuantes = document.querySelectorAll(".float");

    elementosFlutuantes.forEach((elemento) => {
      const atrasoAleatorio = Math.random() * 3;
      elemento.style.animationDelay = `${atrasoAleatorio}s`;

      const duracaoAleatoria = 2 + Math.random() * 2;
      elemento.style.animationDuration = `${duracaoAleatoria}s`;
    });
  }, []);

  return null;
}