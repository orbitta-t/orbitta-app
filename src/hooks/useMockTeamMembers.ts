// Hook mockado que simula query do Supabase
// Interface idêntica ao que será usado com TanStack Query

import { useState, useEffect } from 'react';
import type { TeamMemberWithEvaluation, QueryResult } from '@/types/database.types';
import { mockProfiles, mockAvaliacoes, mockCargos, getUltimaAvaliacao, CURRENT_USER_ID } from '@/services/mockData';
import { determinarMaturidade } from '@/utils/calcularEixos';

/**
 * Hook mockado para buscar liderados do líder logado
 * 
 * Quando migrar para Supabase, trocar por:
 * ```ts
 * const { data, isLoading, error } = useQuery({
 *   queryKey: ['liderados', liderId],
 *   queryFn: async () => {
 *     const { data } = await supabase
 *       .from('profiles')
 *       .select(`*, avaliacoes(*)`)
 *       .eq('lider_id', liderId);
 *     return data;
 *   }
 * });
 * ```
 */
export function useMockTeamMembers(liderId: string = CURRENT_USER_ID): QueryResult<TeamMemberWithEvaluation[]> {
  const [data, setData] = useState<TeamMemberWithEvaluation[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simula latência de rede
    const timer = setTimeout(() => {
      try {
        // Buscar liderados do líder
        const liderados = mockProfiles.filter(p => p.lider_id === liderId);
        
        // Mapear para formato com avaliação
        const lideradosComAvaliacao: TeamMemberWithEvaluation[] = liderados.map(profile => {
          const ultimaAvaliacao = getUltimaAvaliacao(profile.id);
          const cargo = mockCargos.find(c => c.id_cargo === ultimaAvaliacao?.id_cargo);
          
          // Gerar iniciais
          const initials = profile.nome
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);

          let maturityLevel: 'M1' | 'M2' | 'M3' | 'M4' = 'M1';
          if (ultimaAvaliacao) {
            maturityLevel = determinarMaturidade(
              ultimaAvaliacao.eixo_x_tecnico_geral,
              ultimaAvaliacao.eixo_y_comportamental
            );
          }

          return {
            id: profile.id,
            name: profile.nome,
            role: cargo?.nome_cargo || 'Sem cargo',
            email: profile.email,
            initials,
            maturityLevel,
            cargo_id: ultimaAvaliacao?.id_cargo || '',
            lider_id: profile.lider_id || '',
            areas: ['BIG DATA/IA', 'Machine Learning'], // Mock - em produção viria das especializações
            ultima_avaliacao: ultimaAvaliacao ? {
              id_avaliacao: ultimaAvaliacao.id_avaliacao,
              eixo_x_tecnico_geral: ultimaAvaliacao.eixo_x_tecnico_geral,
              eixo_y_comportamental: ultimaAvaliacao.eixo_y_comportamental,
              data_avaliacao: ultimaAvaliacao.data_avaliacao,
            } : undefined,
          };
        });

        setData(lideradosComAvaliacao);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    }, 500); // Simula 500ms de latência

    return () => clearTimeout(timer);
  }, [liderId]);

  return { data, isLoading, error };
}

/**
 * Hook mockado para buscar um liderado específico
 */
export function useMockTeamMember(memberId: string): QueryResult<TeamMemberWithEvaluation> {
  const { data: allMembers, isLoading, error } = useMockTeamMembers();
  
  const member = allMembers?.find(m => m.id === memberId) || null;
  
  return { data: member, isLoading, error };
}
