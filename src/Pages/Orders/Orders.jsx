import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBoxOpen,
  faCheckCircle,
  faClock,
  faMapLocationDot,
  faReceipt,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

import useOrders from "../../Hooks/useOrders";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

function OrderSkeleton() {
  return (
    <div className="card-surface p-5 animate-pulse space-y-4">
      <div className="flex justify-between">
        <div className="h-5 w-40 bg-gray-200 rounded" />
        <div className="h-5 w-24 bg-gray-200 rounded-full" />
      </div>
      <div className="h-4 w-2/3 bg-gray-200 rounded" />
      <div className="flex gap-3">
        <div className="size-14 bg-gray-200 rounded-xl" />
        <div className="size-14 bg-gray-200 rounded-xl" />
        <div className="size-14 bg-gray-200 rounded-xl" />
      </div>
      <div className="h-4 w-32 bg-gray-200 rounded ms-auto" />
    </div>
  );
}

export default function Orders() {
  const { orders, isLoading, isError } = useOrders();

  const delivered = orders.filter((order) => order.isDelivered).length;
  const spent = orders.reduce(
    (sum, order) => sum + (order.totalOrderPrice || 0),
    0
  );

  const stats = [
    {
      label: "Total orders",
      value: orders.length,
      icon: faReceipt,
      tone: "bg-primary-50 text-primary-600",
    },
    {
      label: "Delivered",
      value: delivered,
      icon: faCheckCircle,
      tone: "bg-primary-50 text-primary-600",
    },
    {
      label: "Pending",
      value: Math.max(orders.length - delivered, 0),
      icon: faClock,
      tone: "bg-amber-50 text-amber-600",
    },
    {
      label: "Total spent",
      value: `${spent.toLocaleString()} EGP`,
      icon: faBoxOpen,
      tone: "bg-blue-50 text-blue-600",
    },
  ];

  return (
    <>
      <PageMetaData
        title="My Orders | MartCart"
        description="Track and review every order you've placed with MartCart."
      />

      <main className="page-enter py-8 md:py-12 min-h-[70vh]">
        <div className="container">
          <div className="mb-8">
            <span className="eyebrow">Your purchase history</span>
            <h1 className="section-title mt-2">
              My <span className="gradient-text">orders</span>
            </h1>
            <p className="section-subtitle">
              Everything you've ordered, all in one place.
            </p>
          </div>

          {!isLoading && orders.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {stats.map((stat) => (
                <div key={stat.label} className="card-surface p-4 md:p-5">
                  <div
                    className={`size-10 rounded-xl flex items-center justify-center text-lg mb-3 ${stat.tone}`}
                  >
                    <FontAwesomeIcon icon={stat.icon} />
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {isLoading ? (
            <div className="space-y-5">
              {Array.from({ length: 3 }).map((_, idx) => (
                <OrderSkeleton key={idx} />
              ))}
            </div>
          ) : isError ? (
            <div className="card-surface text-center py-20">
              <p className="text-red-500 font-semibold">
                We couldn't load your orders right now.
              </p>
            </div>
          ) : orders.length === 0 ? (
            <div className="card-surface text-center py-20 px-6">
              <div className="size-24 mx-auto rounded-full bg-primary-50 text-primary-500 flex items-center justify-center text-4xl mb-5">
                <FontAwesomeIcon icon={faBoxOpen} />
              </div>
              <h2 className="text-2xl font-bold">No orders yet</h2>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                When you place your first order, you'll be able to follow its
                progress right here.
              </p>
              <Link
                to="/"
                className="btn mt-6 bg-primary-600 text-white hover:bg-primary-700"
              >
                Start shopping
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => {
                const items = order.cartItems || order.orderItems || [];
                return (
                  <article
                    key={order._id}
                    className="card-surface p-5 md:p-6 hover:translate-y-0"
                  >
                    {/* Order header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
                      <div>
                        <h2 className="font-bold text-gray-900">
                          Order #{order._id?.slice(-8).toUpperCase()}
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`chip ${
                            order.isPaid
                              ? "bg-primary-50 text-primary-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={order.isPaid ? faCheckCircle : faClock}
                          />
                          {order.isPaid ? "Paid" : "Pending payment"}
                        </span>
                        <span
                          className={`chip ${
                            order.isDelivered
                              ? "bg-primary-50 text-primary-700"
                              : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          <FontAwesomeIcon icon={faTruck} />
                          {order.isDelivered ? "Delivered" : "On the way"}
                        </span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="py-5 flex flex-wrap gap-4">
                      {items.map((item) => (
                        <div
                          key={item._id || item.product?._id}
                          className="flex items-center gap-3 bg-gray-50 rounded-xl p-2 pe-4"
                        >
                          <img
                            src={item.product?.imageCover}
                            alt={item.product?.title || "Product"}
                            className="size-14 object-cover rounded-lg"
                          />
                          <div className="max-w-[160px]">
                            <p className="text-sm font-semibold line-clamp-1">
                              {item.product?.title || "Product"}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty {item.count} × {item.price} EGP
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t border-gray-100">
                      <p className="flex items-start gap-2 text-sm text-gray-500">
                        <FontAwesomeIcon
                          icon={faMapLocationDot}
                          className="text-primary-600 mt-1"
                        />
                        <span>
                          {order.shippingAddress?.details},{" "}
                          {order.shippingAddress?.city}
                        </span>
                      </p>
                      <p className="text-lg font-bold text-primary-700">
                        {order.totalOrderPrice?.toLocaleString()} EGP
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
