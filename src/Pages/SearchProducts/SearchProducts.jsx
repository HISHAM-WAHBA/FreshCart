import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRotateLeft,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";

import { getAllProducts } from "../../Services/Product-service";
import useCategories from "../../Hooks/useCategories";
import Card from "../../Components/Card/Card";
import CardSkeleton from "../../Components/Skeleton/CardSkeleton";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

export default function SearchProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const max = searchParams.get("max") || "";

  const [term, setTerm] = useState(keyword);
  const { categories } = useCategories();

  useEffect(() => {
    setTerm(keyword);
  }, [keyword]);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  function clearFilters() {
    setSearchParams({});
    setTerm("");
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", "search", keyword, category, sort, max],
    queryFn: () =>
      getAllProducts({
        keyword,
        category,
        sortedBy: sort,
        priceLessThan: max,
      }),
  });

  const products = data?.data?.data || [];
  const hasFilters = Boolean(keyword || category || sort || max);

  return (
    <>
      <PageMetaData
        title="Search Products | MartCart"
        description="Find exactly what you need across thousands of fresh products."
      />

      <main className="page-enter min-h-[70vh] py-8 md:py-12">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <span className="eyebrow">Browse the catalogue</span>
            <h1 className="section-title mt-2">
              {keyword ? (
                <>
                  Results for <span className="gradient-text">“{keyword}”</span>
                </>
              ) : (
                <>
                  Explore <span className="gradient-text">all products</span>
                </>
              )}
            </h1>
            <p className="section-subtitle">
              Search, filter and discover your next favourite — in seconds.
            </p>
          </div>

          {/* Search + filters */}
          <div className="card-surface p-4 md:p-6 mb-8 space-y-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateParam("q", term.trim());
              }}
              className="relative"
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search for fresh products, brands, categories..."
                className="form-control !py-4 !pl-12 !pr-28 !rounded-2xl shadow-sm"
              />
              <button
                type="submit"
                className="btn absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white hover:bg-primary-700 px-4 md:px-6"
              >
                Search
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                <FontAwesomeIcon icon={faSliders} className="text-primary-600" />
                Filters
              </span>

              <select
                value={category}
                onChange={(e) => updateParam("category", e.target.value)}
                className="form-control !w-auto !py-2 !rounded-full !text-sm"
                aria-label="Filter by category"
              >
                <option value="">All categories</option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => updateParam("sort", e.target.value)}
                className="form-control !w-auto !py-2 !rounded-full !text-sm"
                aria-label="Sort products"
              >
                <option value="">Sort: Default</option>
                <option value="-ratingsAverage">Top rated</option>
                <option value="price">Price: low to high</option>
                <option value="-price">Price: high to low</option>
              </select>

              <input
                type="number"
                min="1"
                value={max}
                onChange={(e) => updateParam("max", e.target.value)}
                placeholder="Max price (EGP)"
                className="form-control !w-auto !py-2 !rounded-full !text-sm"
                aria-label="Maximum price"
              />

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="chip hover:bg-red-50 hover:text-red-600"
                >
                  <FontAwesomeIcon icon={faRotateLeft} />
                  Clear all
                </button>
              )}

              {!isLoading && (
                <span className="ms-auto text-sm text-gray-500">
                  {products.length} product{products.length === 1 ? "" : "s"}
                </span>
              )}
            </div>
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, idx) => (
                <CardSkeleton key={idx} />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-20">
              <p className="text-red-500 font-semibold">
                Something went wrong while loading products.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="btn mt-4 bg-primary-600 text-white hover:bg-primary-700"
              >
                Try again
              </button>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((product) => (
                <Card key={product._id || product.id} productDetails={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 card-surface">
              <div className="size-20 mx-auto rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-3xl mb-4">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
              <h2 className="text-xl font-bold">No products found</h2>
              <p className="text-gray-500 mt-2 mb-6">
                Try a different keyword or clear your filters.
              </p>
              <button
                onClick={clearFilters}
                className="btn bg-primary-600 text-white hover:bg-primary-700"
              >
                Show all products
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
