import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/imgs/freshcart-logo.svg";
import miniLogo from "../../assets/imgs/mini-logo.png";
import {
  faFacebookF,
  faInstagram,
  faPinterestP,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import useCategories from "../../Hooks/useCategories";

const quickLinks = [
  { label: "About Us", to: "/About" },
  { label: "Contact Us", to: "/Contact" },
  { label: "Track Order", to: "/track-order" },
  { label: "Privacy Policy", to: "/Privacy-Policy" },
  { label: "Terms of Service", to: "/Terms" },
  { label: "Shipping Policy", to: "/ShippingPolicy" },
];

const serviceLinks = [
  { label: "My Account", to: "/Account" },
  { label: "My Orders", to: "/Orders" },
  { label: "Wish List", to: "/WishList" },
  { label: "Favourites", to: "/Favourites" },
  { label: "Shopping Cart", to: "/Cart" },
  { label: "Help Center", to: "/Contact" },
];

const socials = [
  { icon: faFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: faTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: faInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: faPinterestP, href: "https://pinterest.com", label: "Pinterest" },
];

export default function Footer() {
  const { categories } = useCategories();

  return (
    <footer className="relative overflow-hidden bg-gray-950 text-gray-300 pt-14 pb-6">
      <div className="absolute -top-32 right-1/4 size-72 rounded-full bg-primary-500/10 blur-3xl" />
      <div className="absolute -bottom-40 left-0 size-80 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="container relative">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 pb-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <img src={Logo} alt="FreshCart logo" className="w-40 brightness-0 invert" />
            <p className="text-sm leading-7 text-gray-400 max-w-sm">
              FreshCart is a versatile e-commerce platform offering a wide range
              of products — from fresh groceries to electronics — with a smooth,
              delightful shopping experience.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-600 hover:border-primary-600 transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h2 className="font-bold text-white mb-5">Categories</h2>
            <ul className="space-y-3 text-sm">
              {(categories?.length ? categories.slice(0, 5) : []).map(
                (category) => (
                  <li key={category._id}>
                    <Link
                      to={`/Category/${category._id}`}
                      className="text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                )
              )}
              <li>
                <Link
                  to="/Categories"
                  className="text-primary-400 font-semibold hover:text-primary-300 transition-colors"
                >
                  View all →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h2 className="font-bold text-white mb-5">Quick Links</h2>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h2 className="font-bold text-white mb-5">Customer Service</h2>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5 border-t border-white/10">
          <p className="text-sm text-gray-400 text-center sm:text-start">
            &copy; {new Date().getFullYear()}{" "}
            <strong className="text-white">Mahmoud Osman</strong> FreshCart. All
            rights reserved.
          </p>
          <img
            src={miniLogo}
            alt="FreshCart"
            className="w-9 rounded-lg animate-float"
          />
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-50 size-11 rounded-full bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-900/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </footer>
  );
}
