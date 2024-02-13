import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 p-2">
      <Skeleton className="h-[125px] rounded-xl w-[310px] md:w-[330px]" />
      <div className="space-y-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[200px]" />
      </div>
    </div>
  );
}
