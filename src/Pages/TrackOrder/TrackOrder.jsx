import { useState } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBox,
  faCheckCircle,
  faMagnifyingGlass,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

import StaticPage from "../../Components/StaticPage/StaticPage";

const steps = [
  { title: "Order placed", desc: "We've received your order", icon: faCheckCircle },
  { title: "Preparing", desc: "Picking your items fresh", icon: faBox },
  { title: "On the way", desc: "Our rider is heading to you", icon: faTruck },
  { title: "Delivered", desc: "Enjoy your order!", icon: faCheckCircle },
];

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [tracked, setTracked] = useState("");

  return (
    <StaticPage
      eyebrow="Order tracking"
      title="Track Your Order"
      lead="Enter your order number to see where your delivery is right now."
      sections={[]}
    >
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Search card */}
        <div className="lg:col-span-2 card-surface p-6 md:p-8 h-fit">
          <h2 className="text-xl font-bold mb-2">Find your order</h2>
          <p className="text-sm text-gray-500 mb-6">
            Your order number is included in your confirmation email.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setTracked(orderId.trim());
            }}
            className="relative"
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
              placeholder="e.g. 66f1a2b3c4d5"
              className="form-control !pl-11"
            />
            <button
              type="submit"
              className="btn mt-4 w-full bg-primary-600 text-white hover:bg-primary-700"
            >
              Track order
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-5 text-center">
            Already have an account?{" "}
            <Link to="/Orders" className="text-primary-600 hover:underline">
              View all my orders
            </Link>
          </p>
        </div>

        {/* Result / timeline */}
        <div className="lg:col-span-3 card-surface p-6 md:p-8">
          {tracked ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
                <div>
                  <p className="text-xs text-gray-500">Tracking order</p>
                  <h2 className="text-lg font-bold">#{tracked.toUpperCase()}</h2>
                </div>
                <span className="chip bg-primary-50 text-primary-700">
                  <FontAwesomeIcon icon={faTruck} />
                  In progress
                </span>
              </div>

              <ol className="relative border-s-2 border-dashed border-primary-200 ms-3 space-y-8">
                {steps.map((step, idx) => (
                  <li key={step.title} className="ps-8 relative">
                    <span
                      className={`absolute -start-[19px] size-9 rounded-full flex items-center justify-center text-sm ${
                        idx <= 1
                          ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <FontAwesomeIcon icon={step.icon} />
                    </span>
                    <p
                      className={`font-semibold ${
                        idx <= 1 ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <div className="h-full min-h-72 flex flex-col items-center justify-center text-center">
              <div className="size-20 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center text-3xl mb-4">
                <FontAwesomeIcon icon={faTruck} />
              </div>
              <h2 className="text-xl font-bold">No order selected</h2>
              <p className="text-gray-500 mt-2 max-w-sm">
                Enter an order number on the left to follow its journey from
                our store to your door.
              </p>
            </div>
          )}
        </div>
      </div>
    </StaticPage>
  );
}
