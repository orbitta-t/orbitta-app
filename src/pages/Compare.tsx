import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts";
import { useMockComparison } from "@/hooks/useMockComparison";

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
                    <span className="text-sm font-semibold text-foreground">{comp.pontuacao}/5</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500" 
                      style={{ width: `${(comp.pontuacao / 5) * 100}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-br from-card to-card/50">
        <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
          Comparação Visual - Competências
        </h2>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Análise comparativa de desempenho entre liderados selecionados
        </p>
        
        <ResponsiveContainer width="100%" height={550}>
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
              domain={[0, 5]} 
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
    </div>
  );
}
