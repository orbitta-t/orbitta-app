// Hook mockado para buscar template de competências por cargo

import { useState, useEffect } from 'react';
import type { TemplateCompetencia, QueryResult } from '@/types/database.types';
import { mockTemplateCompetencia } from '@/services/mockData';

/**
 * Hook mockado para buscar template de competências ideal por cargo
 * 
 * Quando migrar para Supabase, trocar por:
 * ```ts
 * const { data } = useQuery({
 *   queryKey: ['template-competencia', cargoId],
 *   queryFn: async () => {
 *     const { data } = await supabase
 *       .from('template_competencia')
 *       .select(`*, competencia:id_competencia(*)`)
 *       .eq('id_cargo', cargoId);
 *     return data;
 *   }
 * });
 * ```
 */
export function useMockTemplateCompetencia(cargoId: string): QueryResult<TemplateCompetencia[]> {
  const [data, setData] = useState<TemplateCompetencia[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!cargoId) {
      setData(null);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      try {
        // Buscar templates do cargo específico
        const templates = mockTemplateCompetencia.filter(t => t.id_cargo === cargoId);
        setData(templates);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [cargoId]);

  return { data, isLoading, error };
}

/**
 * Helper para buscar nota ideal de uma competência específica
 */
export function getNotaIdeal(
  templates: TemplateCompetencia[] | null,
  competenciaId: string
): number {
  if (!templates) return 5; // Default se não houver template
  
  const template = templates.find(t => t.id_competencia === competenciaId);
  return template?.nota_ideal ?? 5;
}
