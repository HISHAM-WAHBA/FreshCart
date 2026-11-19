import { useContext } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHeart } from "@fortawesome/free-solid-svg-icons";

import { WishListContext } from "../../Context/WishList.context";
import Card from "../../Components/Card/Card";
import CardSkeleton from "../../Components/Skeleton/CardSkeleton";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

export default function Favourites() {
  const { wishListInfo, isLoading } = useContext(WishListContext);

  const items = wishListInfo?.data || [];

  return (
    <>
      <PageMetaData
        title="My Favourites | MartCart"
        description="All the products you love, saved in one place."
      />

      <main className="page-enter py-8 md:py-12">
        <div className="container">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-3xl bg-primary-50 p-6 md:p-10 mb-8">
            <div className="absolute -right-10 -top-16 size-56 rounded-full bg-primary-200/50 blur-2xl" />
            <div className="absolute -bottom-20 left-1/3 size-44 rounded-full bg-primary-200/50 blur-2xl" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="eyebrow">Saved for later</span>
                <h1 className="section-title mt-2">
                  Your <span className="gradient-text">favourites</span>
                </h1>
                <p className="section-subtitle">
                  {items.length > 0
                    ? `${wishListInfo?.count ?? items.length} item${
                        wishListInfo?.count === 1 ? "" : "s"
                      } you can't stop thinking about.`
                    : "Keep everything you love close — right here."}
                </p>
              </div>
              <Link
                to="/"
                className="btn w-fit bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/20"
              >
                Keep exploring
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, idx) => (
                <CardSkeleton key={idx} />
              ))}
            </div>
          ) : items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {items.map((product) => (
                <Card
                  key={product._id || product.id}
                  productDetails={product}
                />
              ))}
            </div>
          ) : (
            <div className="card-surface text-center py-20 px-6">
              <div className="size-24 mx-auto rounded-full bg-primary-50 text-primary-500 flex items-center justify-center text-4xl mb-5">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <h2 className="text-2xl font-bold">Nothing saved yet</h2>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                Tap the heart on any product to add it here. Your favourites
                will be waiting for you whenever you come back.
              </p>
              <Link
                to="/FeaturedProducts"
                className="btn mt-6 bg-primary-600 text-white hover:bg-primary-700"
              >
                Browse featured products
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
