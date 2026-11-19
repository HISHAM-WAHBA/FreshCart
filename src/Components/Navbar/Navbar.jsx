import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faChevronDown,
  faCircleInfo,
  faClockRotateLeft,
  faEllipsis,
  faHouse,
  faMagnifyingGlass,
  faPhone,
  faRightFromBracket,
  faSpinner,
  faTag,
  faTruck,
  faUserPlus,
  faWifi,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faAddressCard,
  faEnvelope,
  faHeart,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import Logo from "../../assets/imgs/freshcart-logo.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/Auth.context";
import { CartContext } from "../../Context/Cart.context";
import { WishListContext } from "../../Context/WishList.context";
import { useOnlineStatus } from "../../Hooks/useOnlineStatus";
import useCategories from "../../Hooks/useCategories";

const mobileLinkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
    isActive
      ? "bg-primary-50 text-primary-700"
      : "text-gray-700 hover:bg-gray-100 hover:text-primary-700"
  }`;

const sectionTitleClass =
  "mb-2 px-3 text-[11px] font-bold uppercase tracking-widest text-gray-400";

function MenuSection({ title, children }) {
  return (
    <div>
      <h3 className={sectionTitleClass}>{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function MobileLink({ to, icon, badge, children, onClick }) {
  return (
    <NavLink to={to} onClick={onClick} className={mobileLinkClass}>
      {icon && (
        <FontAwesomeIcon icon={icon} className="w-5 text-primary-600" fixedWidth />
      )}
      <span>{children}</span>
      {badge !== undefined && (
        <span className="ms-auto rounded-full bg-primary-600 px-2 py-0.5 text-xs font-bold text-white">
          {badge}
        </span>
      )}
    </NavLink>
  );
}

export default function Navbar() {
  const { isOnline } = useOnlineStatus();
  const navigate = useNavigate();
  const location = useLocation();
  const { categories } = useCategories();

  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const categoriesRef = useRef(null);

  const { wishListInfo, isLoading: isWishlistLoading } =
    useContext(WishListContext);
  const { cartinfo, isLoading: isCartLoading } = useContext(CartContext);
  const { logOut, token } = useContext(AuthContext);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen((open) => !open);
  }

  function closeCategories() {
    setIsCategoriesOpen(false);
  }

  function handleSearch(event) {
    event.preventDefault();
    const query = searchTerm.trim();
    if (query) navigate(`/SearchProducts?q=${encodeURIComponent(query)}`);
    closeMenu();
    closeCategories();
  }

  function handleLogOut() {
    logOut();
    closeMenu();
  }

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isCategoriesOpen) return undefined;

    function handlePointerDown(event) {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setIsCategoriesOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") setIsCategoriesOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCategoriesOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 glass shadow-sm">
        <div className="container">
          {/* Top Navbar */}
          <div className="hidden lg:flex items-center justify-between border-b border-gray-300 py-2 text-sm">
            <ul className="flex items-center justify-center gap-5">
              <li className="flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faPhone} />
                <a href="tel:+18001234567">+1 (800) 123-4567</a>
              </li>
              <li className="flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} />
                <a href="mailto:support@freshcart.com">support@freshcart.com</a>
              </li>
              <li
                className={`flex items-center justify-center gap-2 ${
                  isOnline ? "text-primary-600" : "text-red-600"
                }`}
              >
                <FontAwesomeIcon icon={faWifi} />
                <span>{isOnline ? "Online" : "Offline"}</span>
              </li>
            </ul>
            <ul className="flex items-center justify-center gap-3">
              <li>
                <Link to="/track-order">Track order</Link>
              </li>
              <li>
                <Link to="/About">About</Link>
              </li>
              <li>
                <Link to="/Contact">Contact</Link>
              </li>
              <li>
                <select aria-label="Currency" className="cursor-pointer" defaultValue="EGP">
                  <option value="EGP">EGP</option>
                  <option value="SAR">SAR</option>
                  <option value="AED">AED</option>
                </select>
              </li>
              <li>
                <select aria-label="Language" className="cursor-pointer" defaultValue="en">
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </li>
            </ul>
          </div>

          {/* Main Navbar */}
          <nav className="flex items-center justify-between py-5 gap-2">
            <div className="flex items-center">
              <Link to="/" aria-label="FreshCart home">
                <img src={Logo} className="w-40" alt="freshCart logo" />
              </Link>
            </div>

            <form onSubmit={handleSearch} className="hidden lg:block relative">
              <input
                className="form-control min-w-60 !pe-12"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search for products..."
                aria-label="Search for products"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                title="Search"
                aria-label="Search"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>

            <ul className="hidden lg:flex items-center gap-8">
              <li>
                <NavLink
                  to="/WishList"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-primary-600" : ""
                    } flex flex-col items-center gap-1 hover:text-primary-600 transition-colors duration-300`
                  }
                >
                  <div className="relative">
                    <FontAwesomeIcon icon={faHeart} className="text-xl" />
                    <span className="absolute -right-2 top-0 -translate-y-1/2 size-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
                      {isWishlistLoading ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                      ) : (
                        wishListInfo?.count ?? 0
                      )}
                    </span>
                  </div>
                  <span className="text-sm">Wishlist</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/Cart"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-primary-600" : ""
                    } flex flex-col items-center gap-1 hover:text-primary-600 transition-colors duration-300`
                  }
                >
                  <div className="relative">
                    <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
                    <span className="absolute -right-2 top-0 -translate-y-1/2 size-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
                      {isCartLoading ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                      ) : (
                        cartinfo?.numOfCartItems ?? 0
                      )}
                    </span>
                  </div>
                  <span className="text-sm">Cart</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/Account"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-primary-600" : ""
                    } flex flex-col items-center gap-1 hover:text-primary-600 transition-colors duration-300`
                  }
                >
                  <FontAwesomeIcon icon={faUser} className="text-xl" />
                  <span className="text-sm">Account</span>
                </NavLink>
              </li>

              {!token ? (
                <>
                  <li>
                    <NavLink
                      to="/SignUp"
                      className={({ isActive }) =>
                        `${
                          isActive ? "text-primary-600" : ""
                        } flex flex-col items-center gap-1 hover:text-primary-600 transition-colors duration-300`
                      }
                    >
                      <FontAwesomeIcon icon={faUserPlus} className="text-xl" />
                      <span className="text-sm">Sign up</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/Login"
                      className={({ isActive }) =>
                        `${
                          isActive ? "text-primary-600" : ""
                        } flex flex-col items-center gap-1 hover:text-primary-600 transition-colors duration-300`
                      }
                    >
                      <FontAwesomeIcon icon={faAddressCard} className="text-xl" />
                      <span className="text-sm">Login</span>
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    type="button"
                    onClick={handleLogOut}
                    className="flex flex-col items-center gap-1 text-gray-700 hover:text-primary-600 transition-colors duration-300"
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} className="text-xl" />
                    <span className="text-sm">Logout</span>
                  </button>
                </li>
              )}
            </ul>

            <button
              type="button"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="btn bg-primary-600 text-white text-xl block lg:hidden"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
            </button>
          </nav>
        </div>

        {/* Category Navbar */}
        <nav className="bg-gray-100/80 py-3 hidden lg:block border-t border-gray-200">
          <div className="container flex items-center gap-6">
            <div className="relative" ref={categoriesRef}>
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={isCategoriesOpen}
                aria-controls="categories-menu"
                onClick={() => setIsCategoriesOpen((open) => !open)}
                className="btn bg-primary-600 text-white hover:bg-primary-600/90 flex gap-3 items-center justify-center"
              >
                <FontAwesomeIcon icon={faBars} />
                <span>All Categories</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-transform duration-300 ${
                    isCategoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                id="categories-menu"
                className={`absolute top-full start-0 z-50 w-72 rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl transition-all duration-200 origin-top ${
                  isCategoriesOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0 pointer-events-none"
                }`}
              >
                <p className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  Shop by category
                </p>
                <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                  {!categories ? (
                    <li className="px-3 py-3 text-sm text-gray-500">
                      Loading categories…
                    </li>
                  ) : (
                    categories.map((category) => (
                      <li key={category._id}>
                        <Link
                          to={`/Category/${category._id}`}
                          onClick={closeCategories}
                          className="flex gap-3 items-center text-sm text-gray-700 px-3 py-2.5 hover:bg-primary-50 hover:text-primary-700 transition-colors rounded-lg"
                        >
                          <img
                            src={category.image}
                            alt=""
                            className="size-7 rounded-full object-cover bg-gray-100"
                          />
                          <span>{category.name}</span>
                        </Link>
                      </li>
                    ))
                  )}
                  <li>
                    <Link
                      to="/Categories"
                      onClick={closeCategories}
                      className="flex gap-3 items-center text-sm font-semibold text-primary-600 px-3 py-2.5 hover:bg-primary-50 transition-colors rounded-lg"
                    >
                      <FontAwesomeIcon icon={faEllipsis} fixedWidth />
                      <span>View all categories</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <ul className="flex items-center justify-center gap-8">
              <li>
                <NavLink to="/" end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/RecentlyAdded">Recently Added</NavLink>
              </li>
              <li>
                <NavLink to="/FeaturedProducts">Featured Products</NavLink>
              </li>
              <li>
                <NavLink to="/Offers">Offers</NavLink>
              </li>
              <li>
                <NavLink to="/Brands">Brands</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile / tablet off-canvas menu. Rendered outside the glass header so
          `position: fixed` is relative to the viewport, not the blurred header. */}
      {isMenuOpen && (
        <>
          <div
            aria-hidden="true"
            onClick={toggleMenu}
            className="fixed inset-0 z-[60] bg-slate-950/60"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className="fixed inset-y-0 left-0 z-[61] w-[88vw] max-w-sm overflow-y-auto overscroll-contain bg-white p-5 shadow-2xl animate-slide-in"
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <Link to="/" onClick={closeMenu} aria-label="FreshCart home">
                <img src={Logo} alt="FreshCart logo" className="w-36" />
              </Link>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="btn size-10 p-0 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <form onSubmit={handleSearch} className="relative mt-5">
              <input
                className="form-control !pe-12"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search for products..."
                aria-label="Search for products"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                aria-label="Search"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>

            <nav aria-label="Mobile navigation" className="space-y-7 pt-6 pb-8">
              <MenuSection title="Shop">
                <MobileLink to="/" icon={faHouse} onClick={closeMenu}>
                  Home
                </MobileLink>
                <MobileLink to="/Categories" icon={faBars} onClick={closeMenu}>
                  All Categories
                </MobileLink>
                <MobileLink
                  to="/RecentlyAdded"
                  icon={faClockRotateLeft}
                  onClick={closeMenu}
                >
                  Recently Added
                </MobileLink>
                <MobileLink to="/FeaturedProducts" icon={faTag} onClick={closeMenu}>
                  Featured Products
                </MobileLink>
                <MobileLink to="/Offers" icon={faTag} onClick={closeMenu}>
                  Offers &amp; Deals
                </MobileLink>
                <MobileLink to="/Brands" icon={faEllipsis} onClick={closeMenu}>
                  Brands
                </MobileLink>
              </MenuSection>

              <MenuSection title="Categories">
                {!categories ? (
                  <p className="px-3 text-sm text-gray-500">Loading categories…</p>
                ) : (
                  categories.map((category) => (
                    <MobileLink
                      key={category._id}
                      to={`/Category/${category._id}`}
                      icon={faBars}
                      onClick={closeMenu}
                    >
                      {category.name}
                    </MobileLink>
                  ))
                )}
              </MenuSection>

              <MenuSection title="Your account">
                <MobileLink
                  to="/WishList"
                  icon={faHeart}
                  badge={isWishlistLoading ? "…" : wishListInfo?.count ?? 0}
                  onClick={closeMenu}
                >
                  Wishlist
                </MobileLink>
                <MobileLink
                  to="/Cart"
                  icon={faCartShopping}
                  badge={isCartLoading ? "…" : cartinfo?.numOfCartItems ?? 0}
                  onClick={closeMenu}
                >
                  Cart
                </MobileLink>
                <MobileLink to="/Account" icon={faUser} onClick={closeMenu}>
                  Account
                </MobileLink>
                {!token ? (
                  <>
                    <MobileLink to="/SignUp" icon={faUserPlus} onClick={closeMenu}>
                      Sign up
                    </MobileLink>
                    <MobileLink
                      to="/Login"
                      icon={faAddressCard}
                      onClick={closeMenu}
                    >
                      Login
                    </MobileLink>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleLogOut}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className="w-5 text-red-500"
                      fixedWidth
                    />
                    <span>Logout</span>
                  </button>
                )}
              </MenuSection>

              <MenuSection title="Help & support">
                <MobileLink to="/track-order" icon={faTruck} onClick={closeMenu}>
                  Track Order
                </MobileLink>
                <MobileLink to="/About" icon={faCircleInfo} onClick={closeMenu}>
                  About Us
                </MobileLink>
                <MobileLink to="/Contact" icon={faEnvelope} onClick={closeMenu}>
                  Contact Us
                </MobileLink>
                <MobileLink
                  to="/ShippingPolicy"
                  icon={faTruck}
                  onClick={closeMenu}
                >
                  Shipping Policy
                </MobileLink>
                <MobileLink to="/Terms" icon={faAddressCard} onClick={closeMenu}>
                  Terms of Service
                </MobileLink>
                <MobileLink
                  to="/Privacy-Policy"
                  icon={faAddressCard}
                  onClick={closeMenu}
                >
                  Privacy Policy
                </MobileLink>
              </MenuSection>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
