import { ArrowLeft, Target, Code2, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, useNavigate } from "react-router-dom";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from "recharts";
import { useMockMemberDetail } from "@/hooks/useMockMemberDetail";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function MemberDetail() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const { data: member, isLoading } = useMockMemberDetail(memberId || '');

  if (isLoading) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!member) {
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
        <p className="text-muted-foreground">Membro não encontrado</p>
      </div>
    );
  }

  // Categorias disponíveis
  const categories = ["all", ...member.especializacoes.map((esp: any) => esp.categoria)];
  
  // Filtrar competências por categoria
  const filteredCompetencias = selectedCategory === "all" 
    ? member.especializacoes.flatMap((esp: any) => 
        esp.competencias.map((comp: any) => ({
          nome: comp.nome,
          atual: comp.pontuacao,
          ideal: 4, // Nota ideal padrão
          categoria: esp.categoria
        }))
      )
    : member.especializacoes
        .filter((esp: any) => esp.categoria === selectedCategory)
        .flatMap((esp: any) => 
          esp.competencias.map((comp: any) => ({
            nome: comp.nome,
            atual: comp.pontuacao,
            ideal: 4,
            categoria: esp.categoria
          }))
        );


  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-8">
      <Button 
        variant="ghost" 
        className="mb-6 gap-2 hover:bg-muted/50"
        onClick={() => navigate("/team")}
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para Liderados
      </Button>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {member.name}
          </h1>
          <div className="flex items-center justify-center gap-3 mb-3">
            <Badge variant="secondary" className="text-base px-4 py-1">
              {member.role}
            </Badge>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-base px-4 py-1">
              {member.maturityLevel}
            </Badge>
          </div>
          <p className="text-muted-foreground">{member.email}</p>
        </div>

        <Card className="p-8 mb-6 backdrop-blur-sm bg-card/50 border-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Radar Chart */}
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Mapa de Competências
              </h2>
              
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={member.competenciasComportamentais}>
                  <PolarGrid stroke="hsl(var(--muted-foreground) / 0.2)" />
                  <PolarAngleAxis 
                    dataKey="nome" 
                    tick={{ fill: 'hsl(var(--foreground))', fontSize: 11, fontWeight: 500 }}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 4]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Radar
                    name="Avaliação Atual"
                    dataKey="atual"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Meta Ideal"
                    dataKey="ideal"
                    stroke="hsl(var(--muted-foreground))"
                    fill="transparent"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    fillOpacity={0}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="circle"
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Right Side - Competency Details */}
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Análise de Competências
              </h2>
              
              <div className="space-y-4 flex-1">
                {member.competenciasComportamentais.map((item) => (
                  <div key={item.nome} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className={`mt-0.5 ${item.atual >= item.ideal ? 'text-primary' : 'text-muted-foreground'}`}>
                      {item.atual >= item.ideal ? '✓' : '→'}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-1">{item.nome}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{item.atual} / 4</span>
                        <span className="text-xs">vs. meta {item.ideal}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-5 h-5 text-muted-foreground" />
                  <p className="text-sm font-medium text-muted-foreground">Áreas de Atuação</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {member.areas.map((area) => (
                    <Badge key={area} variant="secondary" className="text-sm px-3 py-1">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Competências Técnicas com Filtro por Categoria */}
        <Card className="p-8 backdrop-blur-sm bg-card/50 border-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Code2 className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                Competências Técnicas
              </h2>
            </div>
            
            {/* Filtro de Categoria */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrar por categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  {member.especializacoes.map((esp: any) => (
                    <SelectItem key={esp.categoria} value={esp.categoria}>
                      {esp.categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {member.especializacoes
              .filter((esp: any) => selectedCategory === "all" || esp.categoria === selectedCategory)
              .map((esp: any) => (
                <div key={esp.categoria} className="p-4 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{esp.categoria}</h3>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      {esp.nivel}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {esp.competencias.map((comp: any) => (
                      <div key={comp.nome} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span>{comp.nome}</span>
                        </div>
                        <span className="text-foreground font-medium">{comp.pontuacao}/4</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          {/* Gráfico de Barras Comparativo */}
          {filteredCompetencias.length > 0 && (
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Análise Comparativa: Atual vs Ideal
                {selectedCategory !== "all" && ` - ${selectedCategory}`}
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredCompetencias}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="nome" 
                    tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis 
                    domain={[0, 4]}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <RechartsTooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="atual" name="Nota Atual" fill="hsl(var(--primary))" />
                  <Bar dataKey="ideal" name="Nota Ideal" fill="hsl(var(--chart-2))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
