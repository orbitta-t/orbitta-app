// Funções de cálculo de eixos X e Y para denormalização
// CRÍTICO: Estes valores devem ser calculados e salvos no momento da avaliação

import type { PontuacaoAvaliacao, Competencia } from '@/types/database.types';

/**
 * Calcula o Eixo Y (Competências Comportamentais) usando média ponderada
 * 
 * Fórmula: Σ(pontuacao × peso) / Σ(pesos)
 * 
 * @param pontuacoes - Array de pontuações da avaliação
 * @param competencias - Array de competências com pesos
 * @returns Valor calculado do eixo Y (0-5)
 */
export function calcularEixoY(
  pontuacoes: PontuacaoAvaliacao[],
  competencias: Competencia[]
): number {
  // Filtrar apenas competências comportamentais
  const comportamentais = pontuacoes.filter(p => {
    const comp = competencias.find(c => c.id_competencia === p.id_competencia);
    return comp?.tipo === 'comportamental';
  });

  if (comportamentais.length === 0) {
    return 0;
  }

  // Calcular soma ponderada
  const somaPonderada = comportamentais.reduce((acc, p) => {
    const comp = competencias.find(c => c.id_competencia === p.id_competencia);
    const peso = comp?.peso ?? 1;
    return acc + (p.pontuacao * peso);
  }, 0);

  // Calcular soma dos pesos
  const somaPesos = comportamentais.reduce((acc, p) => {
    const comp = competencias.find(c => c.id_competencia === p.id_competencia);
    return acc + (comp?.peso ?? 1);
  }, 0);

  // Retornar média ponderada
  return Number((somaPonderada / somaPesos).toFixed(2));
}

/**
 * Calcula o Eixo X (Competências Técnicas) usando média ponderada
 * 
 * Fórmula: Σ(pontuacao × peso) / Σ(pesos)
 * 
 * @param pontuacoes - Array de pontuações da avaliação
 * @param competencias - Array de competências com pesos
 * @returns Valor calculado do eixo X (0-5)
 */
export function calcularEixoX(
  pontuacoes: PontuacaoAvaliacao[],
  competencias: Competencia[]
): number {
  // Filtrar apenas competências técnicas
  const tecnicas = pontuacoes.filter(p => {
    const comp = competencias.find(c => c.id_competencia === p.id_competencia);
    return comp?.tipo === 'tecnica';
  });

  if (tecnicas.length === 0) {
    return 0;
  }

  // Calcular soma ponderada
  const somaPonderada = tecnicas.reduce((acc, p) => {
    const comp = competencias.find(c => c.id_competencia === p.id_competencia);
    const peso = comp?.peso ?? 1;
    return acc + (p.pontuacao * peso);
  }, 0);

  // Calcular soma dos pesos
  const somaPesos = tecnicas.reduce((acc, p) => {
    const comp = competencias.find(c => c.id_competencia === p.id_competencia);
    return acc + (comp?.peso ?? 1);
  }, 0);

  // Retornar média ponderada
  // Normalizar de escala 1-4 para 0-5 (técnicas usam escala 1-4)
  const mediaPonderada = somaPonderada / somaPesos;
  const normalizado = ((mediaPonderada - 1) / 3) * 5; // Converte de 1-4 para 0-5
  
  return Number(normalizado.toFixed(2));
}

/**
 * Calcula ambos os eixos de uma vez
 * 
 * @param pontuacoes - Array de pontuações da avaliação
 * @param competencias - Array de competências com pesos
 * @returns Objeto com eixo_x e eixo_y calculados
 */
export function calcularEixos(
  pontuacoes: PontuacaoAvaliacao[],
  competencias: Competencia[]
): { eixo_x: number; eixo_y: number } {
  return {
    eixo_x: calcularEixoX(pontuacoes, competencias),
    eixo_y: calcularEixoY(pontuacoes, competencias),
  };
}

/**
 * Determina o nível de maturidade baseado nos eixos X e Y
 * 
 * Regras:
 * - M1: X ≤ 2.5 && Y ≤ 2.5 (Baixo em ambos)
 * - M2: X ≤ 2.5 && Y > 2.5 (Baixo técnico, alto comportamental)
 * - M3: X > 2.5 && Y ≤ 2.5 (Alto técnico, baixo comportamental)
 * - M4: X > 2.5 && Y > 2.5 (Alto em ambos)
 * 
 * @param eixoX - Valor do eixo X (0-5)
 * @param eixoY - Valor do eixo Y (0-5)
 * @returns Nível de maturidade (M1, M2, M3, M4)
 */
export function determinarMaturidade(eixoX: number, eixoY: number): 'M1' | 'M2' | 'M3' | 'M4' {
  if (eixoX <= 2.5 && eixoY <= 2.5) return 'M1';
  if (eixoX <= 2.5 && eixoY > 2.5) return 'M2';
  if (eixoX > 2.5 && eixoY <= 2.5) return 'M3';
  return 'M4';
}
