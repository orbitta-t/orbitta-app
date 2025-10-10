// Skeleton loading state para lista de liderados

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TeamSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <Card key={i} className="p-6 pt-20">
          <div className="flex flex-col items-center text-center mb-4">
            <Skeleton className="w-16 h-16 rounded-full mb-3" />
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="space-y-2 pt-4 border-t border-border">
            <Skeleton className="h-3 w-full mb-2" />
            <Skeleton className="h-3 w-3/4 mx-auto" />
            <Skeleton className="h-3 w-2/3 mx-auto" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export function MemberCardSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </Card>
  );
}

export function ChartSkeleton() {
  return (
    <Card className="p-6">
      <Skeleton className="h-6 w-48 mb-4 mx-auto" />
      <Skeleton className="h-[400px] w-full rounded-lg" />
    </Card>
  );
}
