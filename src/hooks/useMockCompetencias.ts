// Hook mockado para buscar competências

import { useState, useEffect } from 'react';
import type { Competencia, QueryResult } from '@/types/database.types';
import { mockCompetenciasComportamentais, mockCompetenciasTecnicas } from '@/services/mockData';

/**
 * Hook mockado para buscar competências comportamentais
 */
export function useMockCompetenciasComportamentais(): QueryResult<Competencia[]> {
  const [data, setData] = useState<Competencia[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockCompetenciasComportamentais);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading, error };
}

/**
 * Hook mockado para buscar competências técnicas por especialização
 */
export function useMockCompetenciasTecnicas(especializacaoId?: string): QueryResult<Competencia[]> {
  const [data, setData] = useState<Competencia[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Se especializacao fornecida, filtrar (mock: retorna primeiras 5)
      // Em produção, viria de especializacao_competencia table
      const competencias = especializacaoId 
        ? mockCompetenciasTecnicas.slice(0, 5)
        : mockCompetenciasTecnicas;
      
      setData(competencias);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [especializacaoId]);

  return { data, isLoading, error };
}

/**
 * Hook mockado para buscar todas as competências
 */
export function useMockCompetencias(): QueryResult<Competencia[]> {
  const [data, setData] = useState<Competencia[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData([...mockCompetenciasComportamentais, ...mockCompetenciasTecnicas]);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading, error };
}
