import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MaturityCardProps {
  nivel: 'M1' | 'M2' | 'M3' | 'M4';
}

const maturityConfig = {
  M1: {
    label: 'M1 - Iniciante',
    description: 'Ainda desenvolvendo competências básicas. Requer orientação constante.',
    variant: 'secondary' as const,
    className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
  },
  M2: {
    label: 'M2 - Intermediário',
    description: 'Possui competências fundamentais. Trabalha com supervisão moderada.',
    variant: 'default' as const,
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
  },
  M3: {
    label: 'M3 - Avançado',
    description: 'Domina competências chave. Trabalha de forma autônoma.',
    variant: 'default' as const,
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
  },
  M4: {
    label: 'M4 - Especialista',
    description: 'Excelência em todas as competências. Referência e mentor.',
    variant: 'default' as const,
    className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
  }
};

export const MaturityCard = ({ nivel }: MaturityCardProps) => {
  const config = maturityConfig[nivel];

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg">Nível de Maturidade</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Badge className={`text-base px-4 py-2 ${config.className}`}>
          {config.label}
        </Badge>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {config.description}
        </p>
      </CardContent>
    </Card>
  );
};
