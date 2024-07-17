import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3 mt-5">
            <Skeleton className="h-[280px] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-5 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );
}
