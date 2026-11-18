export function PopularSubCategoriesSkeleton() {
  const skeletonCount = 4;

  return (
    <section className="bg-gray-100 py-6">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-60 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-3 justify-center items-center">
            <div className="size-10 rounded-full bg-gray-200 animate-pulse" />
            <div className="size-10 rounded-full bg-gray-200 animate-pulse" />
          </div>
        </div>

        <div className="py-4 flex gap-4 overflow-hidden">
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <div
              key={idx}
              className="card flex flex-col items-center justify-between gap-2 bg-white p-6 rounded-xl shadow-lg animate-pulse w-40 shrink-0"
            >
              <div className="size-12 bg-gray-200 rounded-full mb-2" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularSubCategoriesSkeleton;
