import { useMemo } from 'react';
import type { TeamMemberWithEvaluation } from '@/types/database.types';
import { 
  mockProfiles, 
  mockAvaliacoes, 
  mockCargos, 
  mockPontuacoes,
  mockCompetenciasComportamentais,
  getUltimaAvaliacao 
} from '@/services/mockData';
import { determinarMaturidade } from '@/utils/calcularEixos';

interface ComparisonMember {
  id: string;
  name: string;
  role: string;
  email: string;
  initials: string;
  maturityLevel: 'M1' | 'M2' | 'M3' | 'M4';
  cargo_id: string;
  lider_id: string;
  areas: string[];
  competencias: {
    nome: string;
    pontuacao: number;
  }[];
  ultima_avaliacao: {
    id_avaliacao: string;
    eixo_x_tecnico_geral: number;
    eixo_y_comportamental: number;
    data_avaliacao: string;
  };
}

/**
 * Hook para comparar múltiplos liderados
 * Retorna dados formatados para o gráfico de radar de comparação
 */
export function useMockComparison(memberIds: string[]) {
  const members = useMemo((): ComparisonMember[] => {
    return memberIds
      .map(id => {
        const profile = mockProfiles.find(p => p.id === id);
        if (!profile) return null;

        const ultimaAvaliacao = getUltimaAvaliacao(profile.id);
        if (!ultimaAvaliacao) return null;

        const cargo = mockCargos.find(c => c.id_cargo === ultimaAvaliacao.id_cargo);
        const pontuacoes = mockPontuacoes.filter(p => p.id_avaliacao === ultimaAvaliacao.id_avaliacao);

        // Pegar apenas competências comportamentais para comparação
        const competencias = mockCompetenciasComportamentais.map(comp => {
          const pontuacao = pontuacoes.find(p => p.id_competencia === comp.id_competencia);
          return {
            nome: comp.nome_competencia,
            pontuacao: pontuacao?.pontuacao || 0,
          };
        });

        const initials = profile.nome
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()
          .substring(0, 2);

        const maturityLevel = determinarMaturidade(
          ultimaAvaliacao.eixo_x_tecnico_geral,
          ultimaAvaliacao.eixo_y_comportamental
        );

        return {
          id: profile.id,
          name: profile.nome,
          role: cargo?.nome_cargo || 'Sem cargo',
          email: profile.email,
          initials,
          maturityLevel,
          cargo_id: ultimaAvaliacao.id_cargo,
          lider_id: profile.lider_id || '',
          areas: ['BIG DATA/IA', 'Desenvolvimento Web'],
          competencias,
          ultima_avaliacao: {
            id_avaliacao: ultimaAvaliacao.id_avaliacao,
            eixo_x_tecnico_geral: ultimaAvaliacao.eixo_x_tecnico_geral,
            eixo_y_comportamental: ultimaAvaliacao.eixo_y_comportamental,
            data_avaliacao: ultimaAvaliacao.data_avaliacao,
          },
        };
      })
      .filter((m): m is ComparisonMember => m !== null);
  }, [memberIds]);

  // Formatar dados para o radar chart
  const radarData = useMemo(() => {
    if (members.length === 0) return [];

    // Usar as competências do primeiro membro como base
    return members[0].competencias.map((comp, index) => {
      const dataPoint: any = { competency: comp.nome };
      
      // Adicionar pontuação de cada membro
      members.forEach(member => {
        dataPoint[member.name] = member.competencias[index]?.pontuacao || 0;
      });
      
      return dataPoint;
    });
  }, [members]);

  return {
    members,
    radarData,
    isLoading: false,
    error: null,
  };
}
