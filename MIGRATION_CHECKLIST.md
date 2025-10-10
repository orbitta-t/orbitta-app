# Checklist de Migração para Supabase

Este documento serve como guia para a migração incremental dos dados mockados para o Supabase real.

## ✅ Preparação (Já Implementado)

- [x] Todos os dados mockados usam UUIDs válidos
- [x] Tipos TypeScript mapeiam schema SQL do MER 2.0
- [x] Hooks mockados com interface idêntica ao TanStack Query
- [x] Função de cálculo de eixos implementada e testável
- [x] Componentes de loading state (Skeleton) criados
- [x] Componentes de error handling criados
- [x] Estrutura de dados centralizada em `src/services/mockData.ts`

## 📋 Antes de Iniciar a Migração

### 1. Validar Estrutura Atual
- [ ] Todos os componentes funcionando com dados mockados
- [ ] Nenhum erro de console relacionado a tipos
- [ ] Loading states visíveis durante "carregamento" mock
- [ ] Error handling testado (simular erros manualmente)

### 2. Preparar Backend
- [ ] Criar schema completo no Supabase usando migrations
- [ ] Implementar RLS policies conforme especificado no MER
- [ ] Popular tabelas de referência (cargos, competências, templates)
- [ ] Configurar autenticação (signup/login)
- [ ] Testar queries SQL manualmente no Supabase Dashboard

## 🔄 Migração Incremental (Por Módulo)

### FASE 1: Autenticação e Perfis
- [ ] Implementar signup/login usando Supabase Auth
- [ ] Criar contexto de autenticação (`AuthContext`)
- [ ] Proteger rotas que exigem autenticação
- [ ] Substituir `CURRENT_USER_ID` por `auth.user().id`
- [ ] Testar fluxo completo de auth

**Arquivo:** `src/contexts/AuthContext.tsx`

### FASE 2: Liderados (Profiles)
- [ ] Substituir `useMockTeamMembers` por query real:
  ```ts
  const { data } = useQuery({
    queryKey: ['liderados'],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select(`
          *,
          avaliacoes!inner(
            eixo_x_tecnico_geral,
            eixo_y_comportamental,
            data_avaliacao
          )
        `)
        .eq('lider_id', user.id)
        .order('nome');
      return data;
    }
  });
  ```
- [ ] Atualizar `src/pages/Team.tsx`
- [ ] Atualizar `src/pages/Home.tsx`
- [ ] Testar listagem, busca e filtros

### FASE 3: Competências
- [ ] Substituir `useMockCompetencias` por queries reais
- [ ] Carregar competências de tabela `competencias`
- [ ] Atualizar `src/pages/Evaluation.tsx`
- [ ] Validar que templates técnicos carregam corretamente

### FASE 4: Avaliações (Parte 1 - Leitura)
- [ ] Criar hook `useAvaliacoes(lideradoId)`
- [ ] Buscar histórico de avaliações por liderado
- [ ] Atualizar `src/pages/MemberDetail.tsx` para usar dados reais
- [ ] Atualizar gráfico radar com pontuações reais

### FASE 5: Avaliações (Parte 2 - Escrita)
- [ ] Implementar salvamento de avaliação completa:
  ```ts
  const { mutate: salvarAvaliacao } = useMutation({
    mutationFn: async (avaliacao) => {
      // 1. Calcular eixos usando calcularEixos()
      const eixos = calcularEixos(pontuacoes, competencias);
      
      // 2. Inserir em avaliacoes com eixos denormalizados
      const { data: avaliacaoData } = await supabase
        .from('avaliacoes')
        .insert({
          id_liderado: memberId,
          id_lider: user.id,
          id_cargo: cargoId,
          eixo_x_tecnico_geral: eixos.eixo_x,
          eixo_y_comportamental: eixos.eixo_y,
        })
        .select()
        .single();
      
      // 3. Inserir pontuações granulares
      await supabase
        .from('pontuacao_avaliacao')
        .insert(pontuacoes.map(p => ({
          id_avaliacao: avaliacaoData.id,
          id_competencia: p.id_competencia,
          pontuacao: p.pontuacao,
        })));
    }
  });
  ```
- [ ] Testar fluxo completo de avaliação
- [ ] Validar que eixos são salvos corretamente

### FASE 6: Gráfico de Maturidade
- [ ] Atualizar `CompetencyMatrixChart` para usar eixos do banco:
  ```ts
  const { data: teamPositions } = useQuery({
    queryKey: ['team-maturity'],
    queryFn: async () => {
      const { data } = await supabase
        .from('avaliacoes')
        .select(`
          eixo_x_tecnico_geral,
          eixo_y_comportamental,
          profiles!inner(nome)
        `)
        .eq('id_lider', user.id);
      return data;
    }
  });
  ```
- [ ] Remover cálculos inline de quadrantX/quadrantY
- [ ] Testar plotagem com dados reais

### FASE 7: Templates e Ideal Dinâmico
- [ ] Substituir `useMockTemplateCompetencia` por query real
- [ ] Implementar seleção de cargo na avaliação
- [ ] Atualizar radar chart para usar `nota_ideal` dinâmica
- [ ] Testar comparação atual vs ideal por cargo

### FASE 8: Blocos Técnicos Persistíveis
- [ ] Criar tabela `blocos_tecnicos` se não existir
- [ ] Implementar salvamento individual de blocos
- [ ] Permitir adição dinâmica de especializações
- [ ] Expandir gráfico radar conforme blocos adicionados

### FASE 9: Funcionalidades Avançadas
- [ ] Implementar comparação de múltiplos liderados
- [ ] Adicionar filtros temporais (última avaliação vs anterior)
- [ ] Exportar relatórios em PDF
- [ ] Dashboard analítico do líder

## 🧪 Testes por Fase

Após cada fase, validar:

- [ ] Nenhum erro de console
- [ ] Loading states funcionando
- [ ] Error handling exibindo mensagens corretas
- [ ] Dados persistem após refresh da página
- [ ] Performance aceitável (< 2s para queries principais)
- [ ] RLS policies impedindo acesso não autorizado

## ⚠️ Pontos Críticos de Atenção

### 1. Denormalização dos Eixos
**CRÍTICO:** Os valores `eixo_x_tecnico_geral` e `eixo_y_comportamental` DEVEM ser:
- Calculados usando `calcularEixos()` no momento da avaliação
- Salvos como campos na tabela `avaliacoes`
- NUNCA recalculados dinamicamente após salvamento

### 2. Segurança (RLS)
Validar políticas:
- Líder só vê liderados onde `profiles.lider_id = auth.uid()`
- Liderado só vê próprias avaliações
- Roles armazenados em tabela separada `user_roles`

### 3. Performance
Otimizações necessárias:
- Indexar: `lider_id`, `id_liderado`, `data_avaliacao`
- Usar `.select()` seletivo (não `*`)
- Implementar paginação para listas > 50 itens
- Cache de queries com `staleTime` apropriado

### 4. Tipos TypeScript
- Após cada migration, rodar:
  ```bash
  npx supabase gen types typescript --project-id <PROJECT_ID> > src/integrations/supabase/types.ts
  ```
- Adaptar hooks para usar tipos gerados

## 📊 Métricas de Sucesso

Considerar migração bem-sucedida quando:

- [ ] 100% das funcionalidades mockadas funcionam com Supabase
- [ ] Nenhum dado mockado sendo usado em produção
- [ ] Todos os arquivos em `src/services/mockData.ts` podem ser removidos
- [ ] Performance < 2s para carregamento inicial
- [ ] RLS policies testadas e validadas
- [ ] Autenticação funcionando sem falhas

## 🎉 Pós-Migração

- [ ] Remover arquivos mockados:
  - `src/services/mockData.ts`
  - `src/hooks/useMock*.ts`
- [ ] Limpar comentários de código antigo
- [ ] Atualizar README com instruções de setup do Supabase
- [ ] Documentar schema final do banco
- [ ] Criar seeds de dados de exemplo para desenvolvimento

---

**Data de Início:** _____/_____/_____  
**Data de Conclusão:** _____/_____/_____  
**Responsável:** _____________________
