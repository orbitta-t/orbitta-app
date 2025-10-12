import { useMemo } from 'react';
import type { Competencia } from '@/types/database.types';
import { 
  mockProfiles, 
  mockCompetenciasComportamentais,
  mockTemplateCompetencia,
  getUltimaAvaliacao,
  getPontuacoesByAvaliacao,
  getCargoById,
  CURRENT_USER_ID
} from '@/services/mockData';
import { determinarMaturidade } from '@/utils/calcularEixos';

interface PersonalDevelopmentData {
  usuario: {
    nome: string;
    email: string;
    cargo: string;
    nivel_maturidade: 'M1' | 'M2' | 'M3' | 'M4';
    data_ultima_avaliacao: string;
  };
  competencias: {
    nome: string;
    pontuacao: number;
    nota_ideal: number;
    gap: number;
  }[];
  pontoFortes: string[];
  areasAtencao: string[];
}

/**
 * Hook para buscar dados de desenvolvimento pessoal do liderado atual
 * Preparado para futura integração com API
 * 
 * Futuro: substituir por chamada real à API
 * ```ts
 * const { data } = useQuery({
 *   queryKey: ['personal-development', userId],
 *   queryFn: () => fetchUserEvaluationData(userId)
 * });
 * ```
 */
export function useMockPersonalDevelopment(lideradoId: string = "550e8400-e29b-41d4-a716-446655440010") {
  const data = useMemo((): PersonalDevelopmentData | null => {
    const profile = mockProfiles.find(p => p.id === lideradoId);
    if (!profile) return null;

    const ultimaAvaliacao = getUltimaAvaliacao(profile.id);
    if (!ultimaAvaliacao) return null;

    const cargo = getCargoById(ultimaAvaliacao.id_cargo);
    const pontuacoes = getPontuacoesByAvaliacao(ultimaAvaliacao.id_avaliacao);
    const templates = mockTemplateCompetencia.filter(t => t.id_cargo === ultimaAvaliacao.id_cargo);

    // Mapear competências comportamentais com nota ideal
    const competencias = mockCompetenciasComportamentais.map(comp => {
      const pontuacao = pontuacoes.find(p => p.id_competencia === comp.id_competencia);
      const template = templates.find(t => t.id_competencia === comp.id_competencia);
      
      const pontuacaoAtual = pontuacao?.pontuacao || 0;
      const notaIdeal = template?.nota_ideal || 5;
      const gap = notaIdeal - pontuacaoAtual;

      return {
        nome: comp.nome_competencia,
        pontuacao: pontuacaoAtual,
        nota_ideal: notaIdeal,
        gap: parseFloat(gap.toFixed(1))
      };
    });

    // Identificar pontos fortes (gap <= 0.5)
    const pontoFortes = competencias
      .filter(c => Math.abs(c.gap) <= 0.5)
      .map(c => c.nome);

    // Identificar áreas de atenção (gap > 1.0)
    const areasAtencao = competencias
      .filter(c => c.gap > 1.0)
      .map(c => c.nome);

    const nivelMaturidade = determinarMaturidade(
      ultimaAvaliacao.eixo_x_tecnico_geral,
      ultimaAvaliacao.eixo_y_comportamental
    );

    return {
      usuario: {
        nome: profile.nome,
        email: profile.email,
        cargo: cargo?.nome_cargo || 'Sem cargo',
        nivel_maturidade: nivelMaturidade,
        data_ultima_avaliacao: new Date(ultimaAvaliacao.data_avaliacao).toLocaleDateString('pt-BR')
      },
      competencias,
      pontoFortes,
      areasAtencao
    };
  }, [lideradoId]);

  return {
    data,
    isLoading: false,
    error: null
  };
}
