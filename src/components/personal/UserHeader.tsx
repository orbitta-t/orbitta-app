interface UserHeaderProps {
  nome: string;
  cargo: string;
  dataUltimaAvaliacao: string;
}

export const UserHeader = ({ nome, cargo, dataUltimaAvaliacao }: UserHeaderProps) => {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold text-foreground">{nome}</h1>
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-medium">Cargo:</span>
          <span>{cargo}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Última Avaliação:</span>
          <span>{dataUltimaAvaliacao}</span>
        </div>
      </div>
    </div>
  );
};
