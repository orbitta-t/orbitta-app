// Fonte única de verdade para dados mockados
// Usa UUIDs e estrutura alinhada com o MER 2.0

import type { 
  Profile, 
  Cargo, 
  Competencia, 
  TemplateCompetencia, 
  Avaliacao,
  PontuacaoAvaliacao,
  Categoria,
  Especializacao
} from '@/types/database.types';

// ============= USUÁRIO LÍDER ATUAL =============
export const CURRENT_USER_ID = "550e8400-e29b-41d4-a716-446655440001";

// ============= CARGOS =============
export const mockCargos: Cargo[] = [
  { id_cargo: "cargo-estagiario", nome_cargo: "Estagiário" },
  { id_cargo: "cargo-junior", nome_cargo: "Junior" },
  { id_cargo: "cargo-pleno", nome_cargo: "Pleno" },
  { id_cargo: "cargo-senior", nome_cargo: "Senior" },
  { id_cargo: "cargo-especialista-1", nome_cargo: "Especialista I" },
  { id_cargo: "cargo-especialista-2", nome_cargo: "Especialista II" },
];

// ============= PERFIS (LIDERADOS) =============
export const mockProfiles: Profile[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    nome: "Ana Silva",
    email: "ana.silva@orbitta.com",
    lider_id: CURRENT_USER_ID,
    organization_id: "org-orbitta",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    nome: "Pedro Santos",
    email: "pedro.santos@orbitta.com",
    lider_id: CURRENT_USER_ID,
    organization_id: "org-orbitta",
    created_at: "2024-02-10T10:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    nome: "Mariana Costa",
    email: "mariana.costa@orbitta.com",
    lider_id: CURRENT_USER_ID,
    organization_id: "org-orbitta",
    created_at: "2024-01-20T10:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440013",
    nome: "Roberto Lima",
    email: "roberto.lima@orbitta.com",
    lider_id: CURRENT_USER_ID,
    organization_id: "org-orbitta",
    created_at: "2024-03-05T10:00:00Z",
  },
];

// ============= COMPETÊNCIAS COMPORTAMENTAIS =============
export const mockCompetenciasComportamentais: Competencia[] = [
  { id_competencia: "comp-comportamental-01", nome_competencia: "Comunicação", tipo: "comportamental", peso: 2 },
  { id_competencia: "comp-comportamental-02", nome_competencia: "Trabalho em Equipe", tipo: "comportamental", peso: 3 },
  { id_competencia: "comp-comportamental-03", nome_competencia: "Capacidade de Aprendizado", tipo: "comportamental", peso: 3 },
  { id_competencia: "comp-comportamental-04", nome_competencia: "Iniciativa", tipo: "comportamental", peso: 1 },
  { id_competencia: "comp-comportamental-05", nome_competencia: "Adaptabilidade", tipo: "comportamental", peso: 2 },
];

// ============= CATEGORIAS =============
export const mockCategorias: Categoria[] = [
  { id_categoria: "cat-big-data-ia", nome_categoria: "BIG DATA/IA" },
  { id_categoria: "cat-desenvolvimento-web", nome_categoria: "Desenvolvimento Web" },
  { id_categoria: "cat-devops", nome_categoria: "DevOps" },
  { id_categoria: "cat-mobile", nome_categoria: "Desenvolvimento Mobile" },
  { id_categoria: "cat-product-design", nome_categoria: "Product Design" },
];

// ============= ESPECIALIZAÇÕES E COMPETÊNCIAS TÉCNICAS =============
export const mockEspecializacoes: Especializacao[] = [
  { id_especializacao: "esp-big-data-ia", nome_especializacao: "BIG DATA/IA", id_categoria: "cat-big-data-ia" },
  { id_especializacao: "esp-desenvolvimento-web", nome_especializacao: "Desenvolvimento Web", id_categoria: "cat-desenvolvimento-web" },
  { id_especializacao: "esp-devops", nome_especializacao: "DevOps", id_categoria: "cat-devops" },
  { id_especializacao: "esp-mobile", nome_especializacao: "Desenvolvimento Mobile", id_categoria: "cat-mobile" },
  { id_especializacao: "esp-product-design", nome_especializacao: "Product Design", id_categoria: "cat-product-design" },
];

export const mockCompetenciasTecnicas: Competencia[] = [
  // BIG DATA/IA
  { id_competencia: "comp-tecnica-python", nome_competencia: "Python", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-sql", nome_competencia: "SQL", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-ml", nome_competencia: "Machine Learning", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-data-viz", nome_competencia: "Visualização de Dados", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-statistics", nome_competencia: "Estatística", tipo: "tecnica", peso: 1 },
  
  // Desenvolvimento Web
  { id_competencia: "comp-tecnica-html-css", nome_competencia: "HTML/CSS", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-javascript", nome_competencia: "JavaScript", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-react", nome_competencia: "React", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-nodejs", nome_competencia: "Node.js", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-apis", nome_competencia: "APIs REST", tipo: "tecnica", peso: 1 },
  
  // DevOps
  { id_competencia: "comp-tecnica-docker", nome_competencia: "Docker", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-kubernetes", nome_competencia: "Kubernetes", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-ci-cd", nome_competencia: "CI/CD", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-cloud", nome_competencia: "Cloud Computing", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-monitoring", nome_competencia: "Monitoramento", tipo: "tecnica", peso: 1 },
  
  // Mobile
  { id_competencia: "comp-tecnica-react-native", nome_competencia: "React Native", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-ios", nome_competencia: "iOS (Swift)", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-android", nome_competencia: "Android (Kotlin)", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-mobile-ui", nome_competencia: "UI/UX Mobile", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-mobile-testing", nome_competencia: "Testes Mobile", tipo: "tecnica", peso: 1 },
  
  // Product Design
  { id_competencia: "comp-tecnica-figma", nome_competencia: "Figma", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-ux-research", nome_competencia: "UX Research", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-prototyping", nome_competencia: "Prototipação", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-design-systems", nome_competencia: "Design Systems", tipo: "tecnica", peso: 1 },
  { id_competencia: "comp-tecnica-accessibility", nome_competencia: "Acessibilidade", tipo: "tecnica", peso: 1 },
];

// ============= TEMPLATES POR CARGO =============
// Define perfis ideais para cada cargo
export const mockTemplateCompetencia: TemplateCompetencia[] = [
  // Estagiário - Expectativas mais baixas
  ...mockCompetenciasComportamentais.map(comp => ({
    id_cargo: "cargo-estagiario",
    id_competencia: comp.id_competencia,
    peso: comp.peso || 1,
    nota_ideal: comp.id_competencia === "comp-comportamental-04" ? 3 : 4, // Iniciativa = 3, resto = 4
  })),
  
  // Senior - Expectativas altas
  ...mockCompetenciasComportamentais.map(comp => ({
    id_cargo: "cargo-senior",
    id_competencia: comp.id_competencia,
    peso: comp.peso || 1,
    nota_ideal: 5,
  })),
  
  // Pleno - Expectativas médias-altas
  ...mockCompetenciasComportamentais.map(comp => ({
    id_cargo: "cargo-pleno",
    id_competencia: comp.id_competencia,
    peso: comp.peso || 1,
    nota_ideal: comp.id_competencia === "comp-comportamental-04" ? 4 : 5, // Iniciativa = 4, resto = 5
  })),
];

// ============= AVALIAÇÕES MOCKADAS =============
export const mockAvaliacoes: Avaliacao[] = [
  {
    id_avaliacao: "aval-01",
    data_avaliacao: "2024-06-15T10:00:00Z",
    id_liderado: "550e8400-e29b-41d4-a716-446655440010", // Ana Silva
    id_lider: CURRENT_USER_ID,
    id_cargo: "cargo-estagiario",
    eixo_x_tecnico_geral: 2.5, // DENORMALIZADO
    eixo_y_comportamental: 4.0, // DENORMALIZADO
  },
  {
    id_avaliacao: "aval-02",
    data_avaliacao: "2024-06-16T10:00:00Z",
    id_liderado: "550e8400-e29b-41d4-a716-446655440011", // Pedro Santos
    id_lider: CURRENT_USER_ID,
    id_cargo: "cargo-especialista-1",
    eixo_x_tecnico_geral: 4.1,
    eixo_y_comportamental: 3.8,
  },
  {
    id_avaliacao: "aval-03",
    data_avaliacao: "2024-06-17T10:00:00Z",
    id_liderado: "550e8400-e29b-41d4-a716-446655440012", // Mariana Costa
    id_lider: CURRENT_USER_ID,
    id_cargo: "cargo-senior",
    eixo_x_tecnico_geral: 4.5,
    eixo_y_comportamental: 4.6,
  },
  {
    id_avaliacao: "aval-04",
    data_avaliacao: "2024-06-18T10:00:00Z",
    id_liderado: "550e8400-e29b-41d4-a716-446655440013", // Roberto Lima
    id_lider: CURRENT_USER_ID,
    id_cargo: "cargo-pleno",
    eixo_x_tecnico_geral: 3.8,
    eixo_y_comportamental: 3.5,
  },
];

// ============= PONTUAÇÕES DETALHADAS =============
export const mockPontuacoes: PontuacaoAvaliacao[] = [
  // Ana Silva - Comportamentais
  { id_avaliacao: "aval-01", id_competencia: "comp-comportamental-01", pontuacao: 4 },
  { id_avaliacao: "aval-01", id_competencia: "comp-comportamental-02", pontuacao: 5 },
  { id_avaliacao: "aval-01", id_competencia: "comp-comportamental-03", pontuacao: 3 },
  { id_avaliacao: "aval-01", id_competencia: "comp-comportamental-04", pontuacao: 4 },
  { id_avaliacao: "aval-01", id_competencia: "comp-comportamental-05", pontuacao: 4 },
];

// ============= HELPER PARA BUSCAR DADOS =============
export const getProfileById = (id: string): Profile | undefined => {
  return mockProfiles.find(p => p.id === id);
};

export const getCargoById = (id: string): Cargo | undefined => {
  return mockCargos.find(c => c.id_cargo === id);
};

export const getAvaliacoesByLiderado = (lideradoId: string): Avaliacao[] => {
  return mockAvaliacoes.filter(a => a.id_liderado === lideradoId);
};

export const getUltimaAvaliacao = (lideradoId: string): Avaliacao | undefined => {
  const avaliacoes = getAvaliacoesByLiderado(lideradoId);
  return avaliacoes.sort((a, b) => 
    new Date(b.data_avaliacao).getTime() - new Date(a.data_avaliacao).getTime()
  )[0];
};

export const getPontuacoesByAvaliacao = (avaliacaoId: string): PontuacaoAvaliacao[] => {
  return mockPontuacoes.filter(p => p.id_avaliacao === avaliacaoId);
};
