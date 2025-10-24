import { ArrowLeft, TrendingUp, AlertCircle, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts";
import { useMockComparison } from "@/hooks/useMockComparison";

// Função para gerar análise comparativa inteligente
function generateComparativeAnalysis(members: any[]) {
  if (members.length < 2) return "";
  
  // Calcular score médio de cada membro
  const membersWithAverage = members.map(member => {
    const avg = member.competencias.reduce((sum: number, c: any) => sum + c.pontuacao, 0) / member.competencias.length;
    return { ...member, average: avg };
  });
  
  // Ordenar por score médio
  const sorted = [...membersWithAverage].sort((a, b) => b.average - a.average);
  const best = sorted[0];
  const others = sorted.slice(1);
  
  // Identificar pontos fortes de cada um
  let analysis = `**${best.name}** demonstra maior proficiência geral (score médio **${best.average.toFixed(1)}/4**), `;
  
  // Encontrar competência mais forte do melhor
  const bestStrength = best.competencias.reduce((max: any, c: any) => 
    c.pontuacao > max.pontuacao ? c : max, best.competencias[0]);
  
  analysis += `destacando-se especialmente em **${bestStrength.nome}** (${bestStrength.pontuacao}/4). `;
  
  // Comparar com outros
  others.forEach((other, index) => {
    const otherStrength = other.competencias.reduce((max: any, c: any) => 
      c.pontuacao > max.pontuacao ? c : max, other.competencias[0]);
    
    if (index === 0) {
      analysis += `\n\n**${other.name}** (score médio **${other.average.toFixed(1)}/4**) `;
    } else {
      analysis += `\n\n**${other.name}** `;
    }
    
    analysis += `possui competência superior em **${otherStrength.nome}** (${otherStrength.pontuacao}/4)`;
    
    // Comparar gaps
    const gap = best.average - other.average;
    if (gap > 0.5) {
      analysis += `, mas apresenta diferença significativa no desempenho geral`;
    } else if (gap > 0.2) {
      analysis += `, com desempenho próximo ao líder`;
    }
    analysis += ".";
  });
  
  return analysis;
}

export default function Compare() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const memberIds = searchParams.get("members")?.split(",") || [];
  
  const { members, radarData, isLoading } = useMockComparison(memberIds);

  if (isLoading) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (members.length < 2) {
    return (
      <div className="p-8">
        <Button 
          variant="ghost" 
          className="mb-6 gap-2"
          onClick={() => navigate("/team")}
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Liderados
        </Button>
        <p className="text-muted-foreground">Selecione pelo menos 2 membros para comparar</p>
      </div>
    );
  }

  const colors = ["hsl(var(--primary))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];
  const analysis = generateComparativeAnalysis(members);

  return (
    <div className="p-8">
      <Button 
        variant="ghost" 
        className="mb-6 gap-2"
        onClick={() => navigate("/team")}
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para Liderados
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Comparação de Liderados</h1>
        <p className="text-muted-foreground">
          {members.length} colaboradores selecionados para comparação
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {members.map((member) => (
          <Card key={member.id} className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">{member.initials}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <div className="flex gap-2 items-center">
                  <Badge variant="secondary">{member.role}</Badge>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    {member.maturityLevel}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {member.competencias.map((comp) => (
                  <div key={comp.nome}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">{comp.nome}</span>
                    <span className="text-sm font-semibold text-foreground">{comp.pontuacao}/4</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500" 
                      style={{ width: `${(comp.pontuacao / 4) * 100}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Gráfico de Radar - 2 colunas */}
        <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-card to-card/50">
          <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
            Comparação Visual - Competências
          </h2>
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Análise comparativa de desempenho entre liderados selecionados
          </p>
          
          <ResponsiveContainer width="100%" height={500}>
            <RadarChart data={radarData}>
              <PolarGrid 
                stroke="hsl(var(--muted-foreground) / 0.3)" 
                strokeWidth={1}
              />
              <PolarAngleAxis 
                dataKey="competency" 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 13, fontWeight: 500 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 4]} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                stroke="hsl(var(--muted-foreground) / 0.3)"
              />
              {members.map((member, index) => (
                <Radar
                  key={member.id}
                  name={member.name}
                  dataKey={member.name}
                  stroke={colors[index]}
                  fill={colors[index]}
                  fillOpacity={0.4}
                  strokeWidth={2}
                />
              ))}
              <Legend 
                wrapperStyle={{ paddingTop: '30px' }}
                iconType="circle"
                iconSize={12}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Análise Inteligente - 1 coluna */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Análise Inteligente
            </h3>
          </div>
          
          <Alert className="mb-4 border-primary/20 bg-primary/5">
            <TrendingUp className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm text-foreground">
              Interpretação automática baseada nos dados de competências
            </AlertDescription>
          </Alert>

          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            {analysis.split('\n\n').map((paragraph, index) => (
              <p key={index} className="whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground italic">
              💡 Esta análise ajuda a identificar rapidamente quem é mais adequado para cada tipo de tarefa ou projeto.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
