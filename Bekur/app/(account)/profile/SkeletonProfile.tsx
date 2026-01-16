import { Skeleton } from "@/components/ui/skeleton";


function SkeletonProfile() { 
    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 ">
        <div className="w-full max-w-md">
          <div className="p-6 rounded-2xl border border-gray-100">
            <div className="text-center">
              <div className="flex flex-col items-center gap-4">
                <Skeleton className="w-24 h-24 rounded-full" />

                <Skeleton className="w-32 h-8 rounded-md" />

                <Skeleton className="w-40 h-5 rounded-md" />
                <Skeleton className="w-30 h-10 rounded-md" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="w-32 h-8 rounded-md" />
                <Skeleton className="w-32 h-8 rounded-md" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="w-32 h-8 rounded-md" />
                <Skeleton className="w-38 h-8 rounded-md" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="w-30 h-8 rounded-md" />
                <Skeleton className="w-10 h-8 rounded-md" />
              </div>

              <div className="flex justify-center pt-6">
                <Skeleton className="w-30 h-10 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
     )
}

export default SkeletonProfile;