import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faChartBar,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Rating from "../Rating/Rating";

const TABS = [
  { id: "overview", label: "Overview", icon: faBox },
  { id: "specs", label: "Specifications", icon: faChartBar },
  { id: "reviews", label: "Reviews", icon: faStar },
];

export default function ProductDetailsTabs({ productDetails }) {
  const [active, setActive] = useState("overview");

  const specs = [
    ["Category", productDetails.category?.name || "—"],
    ["Brand", productDetails.brand?.name || "MartCart Select"],
    ["Available stock", `${productDetails.quantity ?? 0} units`],
    ["Product ID", productDetails._id || productDetails.id],
    ["Rating", `${productDetails.ratingsAverage ?? 0} / 5`],
  ];

  return (
    <section className="container py-8 md:py-12">
      <div className="card-surface overflow-hidden">
        {/* Tab bar */}
        <div className="flex overflow-x-auto border-b border-gray-100 px-2 sm:px-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative flex items-center gap-2 whitespace-nowrap px-4 sm:px-6 py-4 text-sm font-semibold transition-colors duration-300 ${
                active === tab.id
                  ? "text-primary-700"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <FontAwesomeIcon icon={tab.icon} />
              {tab.label}
              {active === tab.id && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary-600" />
              )}
            </button>
          ))}
        </div>

        {/* Panels */}
        <div className="p-5 sm:p-8 min-h-48 animate-fade-up">
          {active === "overview" && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-xl font-bold mb-3">About this product</h2>
                <p className="text-gray-600 leading-8">
                  {productDetails.description ||
                    "Carefully selected for freshness and quality. Add it to your cart and enjoy doorstep delivery with MartCart."}
                </p>
              </div>
              <div className="rounded-2xl bg-primary-50 p-5 space-y-3">
                <h3 className="font-bold text-primary-800">Why you'll love it</h3>
                {[
                  "Hand-picked for premium quality",
                  "Fast, fresh doorstep delivery",
                  "Secure checkout & easy returns",
                ].map((point) => (
                  <p
                    key={point}
                    className="flex items-start gap-2 text-sm text-primary-900/80"
                  >
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-primary-500 mt-1"
                    />
                    {point}
                  </p>
                ))}
              </div>
            </div>
          )}

          {active === "specs" && (
            <div>
              <h2 className="text-xl font-bold mb-5">Product details</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {specs.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 px-4 py-3"
                  >
                    <span className="text-sm text-gray-500">{label}</span>
                    <span className="text-sm font-semibold text-gray-800 text-end break-all">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "reviews" && (
            <div>
              <h2 className="text-xl font-bold mb-5">
                What customers are saying
              </h2>
              <div className="flex flex-wrap items-center gap-6 mb-6 rounded-2xl bg-gray-50 p-5">
                <p className="text-4xl font-bold text-primary-700">
                  {productDetails.ratingsAverage ?? 0}
                </p>
                <div>
                  <Rating rating={productDetails.ratingsAverage ?? 0} />
                  <p className="text-sm text-gray-500 mt-1">
                    Based on {productDetails.ratingsQuantity ?? 0} reviews
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    name: "Sarah M.",
                    text: "Excellent quality and arrived fresher than expected. Delivery was quick too!",
                  },
                  {
                    name: "Ahmed K.",
                    text: "Great value for the price. I've already added it to my regular weekly order.",
                  },
                ].map((review) => (
                  <div
                    key={review.name}
                    className="rounded-2xl border border-gray-100 p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="size-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                        {review.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{review.name}</p>
                        <Rating rating={5} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-7">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
