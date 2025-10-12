import { useMockPersonalDevelopment } from "@/hooks/useMockPersonalDevelopment";
import { useAuth } from "@/contexts/AuthContext";
import { UserHeader } from "@/components/personal/UserHeader";
import { RadarChartVersus } from "@/components/personal/RadarChartVersus";
import { MaturityCard } from "@/components/personal/MaturityCard";
import { CompetencySummary } from "@/components/personal/CompetencySummary";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PersonalDevelopment = () => {
  const { user } = useAuth();
  const lideradoId = user?.userId || "550e8400-e29b-41d4-a716-446655440010";
  
  const { data, isLoading, error } = useMockPersonalDevelopment(lideradoId);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto p-6">
        <Card className="border-destructive">
          <CardContent className="p-6">
            <p className="text-destructive">Erro ao carregar dados de avaliação.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      {/* Header do Usuário */}
      <UserHeader
        nome={data.usuario.nome}
        cargo={data.usuario.cargo}
        dataUltimaAvaliacao={data.usuario.data_ultima_avaliacao}
      />

      {/* Grid Principal */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Gráfico de Radar - ocupa 2 colunas */}
        <div className="lg:col-span-2">
          <RadarChartVersus competencias={data.competencias} />
        </div>

        {/* Card de Maturidade */}
        <div className="lg:col-span-1">
          <MaturityCard nivel={data.usuario.nivel_maturidade} />
        </div>
      </div>

      {/* Resumo de Competências */}
      <CompetencySummary
        pontoFortes={data.pontoFortes}
        areasAtencao={data.areasAtencao}
      />
    </div>
  );
};

export default PersonalDevelopment;
