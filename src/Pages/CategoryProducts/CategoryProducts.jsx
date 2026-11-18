import { useState } from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

import { getAllProducts } from "../../Services/Product-service";
import useCategories from "../../Hooks/useCategories";
import Card from "../../Components/Card/Card";
import HomeFeaturedProductSkeleton from "../../Components/Skeleton/HomeFeaturedProductSkeleton";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

export default function CategoryProducts() {
  const { id } = useParams();
  const [sort, setSort] = useState("");
  const { categories } = useCategories();

  const activeCategory = categories?.find((cat) => cat._id === id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", "category", id, sort],
    queryFn: () => getAllProducts({ category: id, sortedBy: sort }),
  });

  const products = data?.data?.data || [];

  return (
    <>
      <PageMetaData
        title={`${activeCategory?.name || "Category"} | FreshCart`}
        description={`Shop all products in ${activeCategory?.name || "this category"}.`}
      />

      <main className="page-enter py-8 md:py-12 min-h-[70vh]">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-primary-600">
              Home
            </Link>
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            <Link to="/Categories" className="hover:text-primary-600">
              Categories
            </Link>
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            <span className="font-semibold text-gray-800">
              {activeCategory?.name || "Products"}
            </span>
          </nav>

          {/* Header */}
          <div className="relative overflow-hidden rounded-3xl bg-primary-50 p-6 md:p-10 mb-8 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="absolute -right-14 -top-16 size-52 rounded-full bg-primary-200/60 blur-2xl" />
            {activeCategory?.image && (
              <img
                src={activeCategory.image}
                alt=""
                className="relative size-20 rounded-2xl object-cover bg-white shadow-md"
              />
            )}
            <div className="relative">
              <span className="eyebrow">Browse collection</span>
              <h1 className="section-title mt-1">
                {activeCategory?.name || "Category products"}
              </h1>
              <p className="section-subtitle">
                {isLoading
                  ? "Loading products..."
                  : `${products.length} product${
                      products.length === 1 ? "" : "s"
                    } in this category`}
              </p>
            </div>
          </div>

          {/* Sort */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <Link
              to="/Categories"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary-600"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              All categories
            </Link>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="form-control !w-auto !py-2 !pe-10 !rounded-full !text-sm appearance-none"
                aria-label="Sort products"
              >
                <option value="">Sort: Default</option>
                <option value="-ratingsAverage">Top rated</option>
                <option value="price">Price: low to high</option>
                <option value="-price">Price: high to low</option>
              </select>
              <FontAwesomeIcon
                icon={faAngleDown}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {isLoading ? (
            <HomeFeaturedProductSkeleton />
          ) : isError ? (
            <div className="card-surface text-center py-20 text-red-500">
              Failed to load this category. Please try again later.
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((product) => (
                <Card key={product._id || product.id} productDetails={product} />
              ))}
            </div>
          ) : (
            <div className="card-surface text-center py-20">
              <h2 className="text-xl font-bold mb-2">No products here yet</h2>
              <p className="text-gray-500 mb-6">
                Try another category while we restock this one.
              </p>
              <Link
                to="/Categories"
                className="btn bg-primary-600 text-white hover:bg-primary-700"
              >
                Browse categories
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
