import { useMemo } from 'react';
import { 
  mockProfiles, 
  mockAvaliacoes, 
  mockCargos, 
  mockPontuacoes,
  mockCompetenciasComportamentais,
  mockCompetenciasTecnicas,
  mockTemplateCompetencia,
  getUltimaAvaliacao,
  mockEspecializacoes,
  mockCategorias
} from '@/services/mockData';
import { determinarMaturidade } from '@/utils/calcularEixos';

/**
 * Hook para buscar detalhes completos de um liderado
 * Inclui competências comportamentais, técnicas e especializações
 */
export function useMockMemberDetail(memberId: string) {
  const memberData = useMemo(() => {
    const profile = mockProfiles.find(p => p.id === memberId);
    if (!profile) return null;

    const ultimaAvaliacao = getUltimaAvaliacao(profile.id);
    if (!ultimaAvaliacao) return null;

    const cargo = mockCargos.find(c => c.id_cargo === ultimaAvaliacao.id_cargo);
    const pontuacoes = mockPontuacoes.filter(p => p.id_avaliacao === ultimaAvaliacao.id_avaliacao);

    // Competências Comportamentais com comparação ao ideal
    const competenciasComportamentais = mockCompetenciasComportamentais.map(comp => {
      const pontuacao = pontuacoes.find(p => p.id_competencia === comp.id_competencia);
      const template = mockTemplateCompetencia.find(
        t => t.id_cargo === ultimaAvaliacao.id_cargo && t.id_competencia === comp.id_competencia
      );

      return {
        nome: comp.nome_competencia,
        atual: pontuacao?.pontuacao || 0,
        ideal: template?.nota_ideal || 5,
      };
    });

    // Competências Técnicas agrupadas por especialização
    const pontuacoesTecnicas = pontuacoes.filter(p => 
      mockCompetenciasTecnicas.some(ct => ct.id_competencia === p.id_competencia)
    );

    // Agrupar por categoria/especialização
    const especializacoesDoMembro: Record<string, any> = {};
    
    pontuacoesTecnicas.forEach(pont => {
      const competencia = mockCompetenciasTecnicas.find(c => c.id_competencia === pont.id_competencia);
      if (!competencia) return;

      // Determinar a categoria da competência (simulado)
      let categoriaId = '';
      if (['comp-tecnica-python', 'comp-tecnica-sql', 'comp-tecnica-ml', 'comp-tecnica-data-viz', 'comp-tecnica-statistics'].includes(pont.id_competencia)) {
        categoriaId = 'cat-big-data-ia';
      } else if (['comp-tecnica-html-css', 'comp-tecnica-javascript', 'comp-tecnica-react', 'comp-tecnica-nodejs', 'comp-tecnica-apis'].includes(pont.id_competencia)) {
        categoriaId = 'cat-desenvolvimento-web';
      } else if (['comp-tecnica-docker', 'comp-tecnica-kubernetes', 'comp-tecnica-ci-cd', 'comp-tecnica-cloud', 'comp-tecnica-monitoring'].includes(pont.id_competencia)) {
        categoriaId = 'cat-devops';
      }

      const categoria = mockCategorias.find(c => c.id_categoria === categoriaId);
      if (!categoria) return;

      if (!especializacoesDoMembro[categoria.nome_categoria]) {
        especializacoesDoMembro[categoria.nome_categoria] = {
          categoria: categoria.nome_categoria,
          competencias: [],
          mediaGeral: 0,
        };
      }

      especializacoesDoMembro[categoria.nome_categoria].competencias.push({
        nome: competencia.nome_competencia,
        pontuacao: pont.pontuacao,
      });
    });

    // Calcular médias e níveis de maturidade por especialização
    Object.keys(especializacoesDoMembro).forEach(cat => {
      const competencias = especializacoesDoMembro[cat].competencias;
      const media = competencias.reduce((sum: number, c: any) => sum + c.pontuacao, 0) / competencias.length;
      especializacoesDoMembro[cat].mediaGeral = media;
      especializacoesDoMembro[cat].nivel = determinarMaturidade(media, 0); // Apenas para visualização
    });

    const maturityLevel = determinarMaturidade(
      ultimaAvaliacao.eixo_x_tecnico_geral,
      ultimaAvaliacao.eixo_y_comportamental
    );

    return {
      id: profile.id,
      name: profile.nome,
      email: profile.email,
      role: cargo?.nome_cargo || 'Sem cargo',
      maturityLevel,
      competenciasComportamentais,
      especializacoes: Object.values(especializacoesDoMembro),
      areas: Object.keys(especializacoesDoMembro),
    };
  }, [memberId]);

  return {
    data: memberData,
    isLoading: false,
    error: null,
  };
}
