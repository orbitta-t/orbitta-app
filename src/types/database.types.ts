// Tipos que espelham a estrutura SQL do MER 2.0
// Quando migrar para Supabase, estes tipos serão gerados automaticamente

// ============= USUÁRIOS E PERFIS =============
export interface Profile {
  id: string; // UUID
  nome: string;
  email: string;
  lider_id: string | null;
  organization_id: string;
  created_at: string;
}

export interface UserRole {
  id: string;
  user_id: string; // FK -> profiles.id
  role: 'lider' | 'liderado';
}

// ============= CARGOS =============
export interface Cargo {
  id_cargo: string; // UUID
  nome_cargo: string;
}

// ============= COMPETÊNCIAS =============
export interface Competencia {
  id_competencia: string; // UUID
  nome_competencia: string;
  tipo: 'comportamental' | 'tecnica';
  peso?: number;
}

// ============= CATEGORIAS E ESPECIALIZAÇÕES =============
export interface Categoria {
  id_categoria: string; // UUID
  nome_categoria: string;
}

export interface Especializacao {
  id_especializacao: string; // UUID
  nome_especializacao: string;
  id_categoria: string; // FK -> categorias.id
}

export interface EspecializacaoCompetencia {
  id_especializacao: string; // FK
  id_competencia: string; // FK
}

// ============= TEMPLATES DE CARGO =============
export interface TemplateCompetencia {
  id_cargo: string; // FK
  id_competencia: string; // FK
  peso: number;
  nota_ideal: number;
}

// ============= AVALIAÇÕES =============
export interface Avaliacao {
  id_avaliacao: string; // UUID
  data_avaliacao: string; // ISO string
  id_liderado: string; // FK -> profiles.id
  id_lider: string; // FK -> profiles.id
  id_cargo: string; // FK -> cargos.id
  eixo_x_tecnico_geral: number; // DENORMALIZADO (0-5)
  eixo_y_comportamental: number; // DENORMALIZADO (0-5)
  created_at?: string;
  updated_at?: string;
}

export interface PontuacaoAvaliacao {
  id_avaliacao: string; // FK
  id_competencia: string; // FK
  pontuacao: number; // 0-5 para comportamentais, 1-4 para técnicas
}

// ============= BLOCOS TÉCNICOS =============
export interface BlocoTecnico {
  id_bloco: string; // UUID
  id_avaliacao: string; // FK
  id_especializacao: string; // FK
  created_at: string;
  status: 'draft' | 'completed';
}

export interface PontuacaoBloco {
  id_bloco: string; // FK
  id_competencia: string; // FK
  pontuacao: number;
}

// ============= TIPOS COMPOSTOS PARA UI =============
export interface AvaliacaoDetalhada extends Avaliacao {
  liderado: Profile;
  cargo: Cargo;
  pontuacoes: PontuacaoAvaliacao[];
}

export interface ProfileWithRole extends Profile {
  user_roles: UserRole[];
  cargo?: Cargo;
  ultima_avaliacao?: Avaliacao;
}

export interface CompetenciaWithCategoria extends Competencia {
  categoria?: Categoria;
  especializacao?: Especializacao;
}

// ============= HELPER TYPES =============
export type MaturityLevel = 'M1' | 'M2' | 'M3' | 'M4';

export interface TeamMemberWithEvaluation {
  id: string;
  name: string;
  role: string;
  email: string;
  initials: string;
  maturityLevel: MaturityLevel;
  cargo_id: string;
  lider_id: string;
  areas: string[];
  ultima_avaliacao?: {
    id_avaliacao: string;
    eixo_x_tecnico_geral: number;
    eixo_y_comportamental: number;
    data_avaliacao: string;
  };
}

// ============= QUERY RESULT TYPES =============
export interface QueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export interface MutationResult<T> {
  mutate: (data: T) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}
