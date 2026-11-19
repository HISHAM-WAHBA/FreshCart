import { useContext } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBox,
  faCartShopping,
  faHeart,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../../Context/Auth.context";
import { CartContext } from "../../Context/Cart.context";
import { WishListContext } from "../../Context/WishList.context";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

export default function Account() {
  const { logOut } = useContext(AuthContext);
  const { cartinfo } = useContext(CartContext);
  const { wishListInfo } = useContext(WishListContext);

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  const initials = (user?.name || "Fresh Cart")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const cards = [
    {
      title: "My orders",
      desc: "Track deliveries & view history",
      icon: faBox,
      to: "/Orders",
      tone: "from-primary-500 to-primary-700",
    },
    {
      title: "Wishlist",
      desc: `${wishListInfo?.count ?? 0} saved items`,
      icon: faHeart,
      to: "/WishList",
      tone: "from-rose-400 to-rose-600",
    },
    {
      title: "Favourites",
      desc: "Products you love in one place",
      icon: faHeart,
      to: "/Favourites",
      tone: "from-pink-400 to-fuchsia-600",
    },
    {
      title: "Shopping cart",
      desc: `${cartinfo?.numOfCartItems ?? 0} items waiting`,
      icon: faCartShopping,
      to: "/Cart",
      tone: "from-amber-400 to-orange-600",
    },
  ];

  return (
    <>
      <PageMetaData title="My Account | MartCart" />
      <main className="page-enter py-8 md:py-12 min-h-[70vh]">
        <div className="container">
          {/* Profile banner */}
          <div className="relative overflow-hidden rounded-3xl bg-primary-50 p-6 md:p-10 mb-8">
            <div className="absolute -right-16 -top-20 size-64 rounded-full bg-primary-200/60 blur-2xl" />
            <div className="absolute -bottom-24 left-1/4 size-56 rounded-full bg-primary-200/50 blur-2xl" />
            <div className="relative flex flex-col sm:flex-row items-center gap-5">
              <div className="size-20 rounded-2xl bg-primary-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-primary-600/30 shrink-0">
                {initials}
              </div>
              <div className="text-center sm:text-start">
                <span className="eyebrow">Your space</span>
                <h1 className="section-title mt-1">
                  Hello,{" "}
                  <span className="gradient-text">{user?.name || "there"}</span>
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {user?.email || "Welcome back to MartCart"}
                </p>
              </div>
              <button
                onClick={logOut}
                className="btn sm:ms-auto mt-4 sm:mt-0 bg-white text-red-600 border border-red-100 hover:bg-red-50"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                Log out
              </button>
            </div>
          </div>

          {/* Quick links */}
          <div className="mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FontAwesomeIcon icon={faUser} className="text-primary-600" />
              Quick access
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((card) => (
              <Link
                key={card.title}
                to={card.to}
                className="group card-surface p-5 block"
              >
                <div
                  className={`size-12 rounded-2xl bg-gradient-to-br ${card.tone} text-white flex items-center justify-center text-lg mb-4 shadow-md`}
                >
                  <FontAwesomeIcon icon={card.icon} />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{card.desc}</p>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-primary-600 mt-4 group-hover:translate-x-1 transition-transform"
                />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
