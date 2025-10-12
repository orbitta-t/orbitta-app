import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertCircle } from "lucide-react";

interface CompetencySummaryProps {
  pontoFortes: string[];
  areasAtencao: string[];
}

export const CompetencySummary = ({ pontoFortes, areasAtencao }: CompetencySummaryProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
            <TrendingUp className="h-5 w-5" />
            Pontos Fortes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pontoFortes.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {pontoFortes.map((comp, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                >
                  {comp}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Continue desenvolvendo suas competências para identificar pontos fortes.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <AlertCircle className="h-5 w-5" />
            Áreas de Atenção
          </CardTitle>
        </CardHeader>
        <CardContent>
          {areasAtencao.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {areasAtencao.map((comp, index) => (
                <Badge 
                  key={index}
                  variant="secondary"
                  className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                >
                  {comp}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Parabéns! Você está alinhado com o perfil ideal do cargo.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
