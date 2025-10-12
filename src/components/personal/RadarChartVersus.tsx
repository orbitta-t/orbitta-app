import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CompetenciaData {
  nome: string;
  pontuacao: number;
  nota_ideal: number;
}

interface RadarChartVersusProps {
  competencias: CompetenciaData[];
}

export const RadarChartVersus = ({ competencias }: RadarChartVersusProps) => {
  // Transformar dados para formato do Recharts
  const chartData = competencias.map(comp => ({
    competencia: comp.nome,
    'Seu Desempenho': comp.pontuacao,
    'Perfil Ideal': comp.nota_ideal
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Desempenho vs Perfil Ideal</CardTitle>
        <p className="text-sm text-muted-foreground">
          Comparação entre suas competências atuais e o perfil ideal do cargo
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={chartData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis 
              dataKey="competencia" 
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 10]}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Radar
              name="Seu Desempenho"
              dataKey="Seu Desempenho"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Perfil Ideal"
              dataKey="Perfil Ideal"
              stroke="hsl(var(--chart-2))"
              fill="hsl(var(--chart-2))"
              fillOpacity={0.1}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
