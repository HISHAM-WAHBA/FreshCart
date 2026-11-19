import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBolt,
  faPercent,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

import useProducts from "../../Hooks/useProducts";
import { calcTimeLeft } from "../../Utils/CounterDown";
import Card from "../../Components/Card/Card";
import HomeDealsSkeleton from "../../Components/Skeleton/HomeDealsSkeleton";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

export default function Offers() {
  const { isLoading, products } = useProducts();
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const offers = Array.isArray(products)
    ? products.filter((product) => product.priceAfterDiscount)
    : [];

  const parts = [
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.Minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <>
      <PageMetaData
        title="Offers & Deals | MartCart"
        description="Grab the best limited-time offers on MartCart."
      />

      <main className="page-enter py-8 md:py-12">
        <div className="container">
          {/* Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white p-7 md:p-12 mb-10">
            <div className="absolute -right-20 -top-24 size-80 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-24 right-1/3 size-56 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur">
                  <FontAwesomeIcon icon={faBolt} />
                  Limited time only
                </span>
                <h1 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
                  Fresh deals,
                  <br /> fresher prices.
                </h1>
                <p className="mt-3 text-white/80 max-w-md">
                  Save big on hand-picked products. Once the clock runs out,
                  they're gone.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 md:p-6">
                <p className="text-sm text-white/80 mb-3">Offers end in</p>
                <div className="flex gap-3">
                  {parts.map((part) => (
                    <div key={part.label} className="text-center">
                      <div className="size-14 md:size-16 rounded-xl bg-white text-primary-700 font-bold text-xl md:text-2xl flex items-center justify-center shadow-lg">
                        {String(part.value).padStart(2, "0")}
                      </div>
                      <p className="text-[11px] mt-2 text-white/70">
                        {part.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: faPercent, text: "Up to 40% off" },
              { icon: faTruck, text: "Free delivery over 50 EGP" },
              { icon: faBolt, text: "New deals daily" },
              { icon: faArrowRight, text: "Easy checkout" },
            ].map((perk) => (
              <div
                key={perk.text}
                className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3"
              >
                <FontAwesomeIcon
                  icon={perk.icon}
                  className="text-primary-600"
                />
                <span className="text-sm font-medium">{perk.text}</span>
              </div>
            ))}
          </div>

          {/* Deals grid */}
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="section-title">All offers</h2>
              <p className="section-subtitle">
                {isLoading ? "Loading deals..." : `${offers.length} products on sale`}
              </p>
            </div>
            <Link
              to="/Deals"
              className="hidden sm:inline-flex items-center gap-2 text-primary-600 font-semibold hover:underline"
            >
              View daily deals
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>

          {isLoading ? (
            <HomeDealsSkeleton />
          ) : offers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {offers.map((product) => (
                <Card key={product._id || product.id} productDetails={product} />
              ))}
            </div>
          ) : (
            <div className="card-surface text-center py-20">
              <p className="text-gray-500">No active offers right now.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
