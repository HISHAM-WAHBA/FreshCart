import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { getAllProducts } from "../../Services/Product-service";
import Card from "../../Components/Card/Card";
import HomeFeaturedProductSkeleton from "../../Components/Skeleton/HomeFeaturedProductSkeleton";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

export default function RecentlyAdded() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", "recent"],
    queryFn: () => getAllProducts({ sortedBy: "-createdAt" }),
  });

  const products = data?.data?.data || [];

  return (
    <>
      <PageMetaData
        title="Recently Added | MartCart"
        description="The newest arrivals in the MartCart store."
      />

      <main className="page-enter py-8 md:py-12 min-h-[70vh]">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-primary-50 p-6 md:p-10 mb-8">
            <div className="absolute -right-14 -top-16 size-52 rounded-full bg-primary-200/60 blur-2xl" />
            <div className="relative">
              <span className="eyebrow">
                <FontAwesomeIcon icon={faStar} />
                Just landed
              </span>
              <h1 className="section-title mt-2">
                Recently <span className="gradient-text">added</span>
              </h1>
              <p className="section-subtitle">
                Be the first to discover our newest arrivals.
              </p>
            </div>
          </div>

          {isLoading ? (
            <HomeFeaturedProductSkeleton />
          ) : isError ? (
            <div className="card-surface text-center py-20 text-red-500">
              Failed to load new arrivals. Please try again later.
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((product) => (
                <Card key={product._id || product.id} productDetails={product} />
              ))}
            </div>
          ) : (
            <div className="card-surface text-center py-20 text-gray-500">
              No products available yet.
            </div>
          )}
        </div>
      </main>
    </>
  );
}
