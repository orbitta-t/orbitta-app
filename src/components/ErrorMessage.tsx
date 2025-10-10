// Componente reutilizável para exibir erros

import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  error: Error | { message: string } | null;
  retry?: () => void;
  title?: string;
}

export function ErrorMessage({ error, retry, title = "Ops! Algo deu errado" }: ErrorMessageProps) {
  return (
    <Card className="p-8 text-center">
      <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">
        {error?.message || 'Erro ao carregar dados'}
      </p>
      {retry && (
        <Button onClick={retry} variant="outline">
          Tentar Novamente
        </Button>
      )}
    </Card>
  );
}

export function InlineError({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 text-destructive text-sm p-3 rounded-lg bg-destructive/10 border border-destructive/20">
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}
