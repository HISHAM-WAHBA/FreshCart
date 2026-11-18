import HomeCategoriesSkeleton from "./HomeCategoriesSkeleton";
import HomeDealsSkeleton from "./HomeDealsSkeleton";
import HomeFeaturedProductSkeleton from "./HomeFeaturedProductSkeleton";

export default function HomeSkeleton() {
  return (
    <section className="container py-6 space-y-10">
      {/* Hero slider placeholder */}
      <div className="h-64 sm:h-80 lg:h-96 w-full rounded-3xl bg-gray-200 animate-pulse" />

      {/* Home features placeholder */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm animate-pulse"
          >
            <div className="size-10 rounded-full bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
              <div className="h-3 w-1/2 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>

      <HomeCategoriesSkeleton />
      <HomeDealsSkeleton />
      <HomeFeaturedProductSkeleton />
    </section>
  );
}
