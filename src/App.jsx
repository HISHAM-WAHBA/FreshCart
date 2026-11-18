import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Layout from "./Components/Layout/Layout";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProtectVerifyResetCode from "./Components/ProtectedRoute/ProtectVerifyResetCode";
import OffLineScreen from "./Components/OffLineScreen/OffLineScreen";
import Loading from "./Components/Loading/Loading";

import AuthProvider from "./Context/Auth.context";
import CartProvider from "./Context/Cart.context";
import WishListProvider from "./Context/WishList.context";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import VerifyResetCode from "./Pages/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import NotFound from "./Pages/NotFound/NotFound";
import WishList from "./Pages/WishList/WishList";
import Favourites from "./Pages/Favourites/Favourites";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import Account from "./Pages/Account/Account";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Categories from "./Pages/Categories/Categories";
import CategoryProducts from "./Pages/CategoryProducts/CategoryProducts";
import Brands from "./Pages/Brands/Brands";
import Deals from "./Pages/Deals/Deals";
import Offers from "./Pages/Offers/Offers";
import FeaturedProducts from "./Pages/FeaturedProducts/FeaturedProducts";
import RecentlyAdded from "./Pages/RecentlyAdded/RecentlyAdded";
import SearchProducts from "./Pages/SearchProducts/SearchProducts";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Terms from "./Pages/Terms/Terms";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import ShippingPolicy from "./Pages/ShippingPolicy/ShippingPolicy";
import TrackOrder from "./Pages/TrackOrder/TrackOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },

      // Authentication
      { path: "Login", element: <Login /> },
      { path: "SignUp", element: <SignUp /> },
      { path: "ForgetPassword", element: <ForgetPassword /> },
      { path: "VerifyEmail", element: <VerifyEmail /> },
      {
        path: "VerifyResetCode",
        element: (
          <ProtectVerifyResetCode>
            <VerifyResetCode />
          </ProtectVerifyResetCode>
        ),
      },
      {
        path: "ResetPassword",
        element: (
          <ProtectVerifyResetCode>
            <ResetPassword />
          </ProtectVerifyResetCode>
        ),
      },

      // Shopping
      { path: "Product/:id", element: <ProductDetails /> },
      { path: "Categories", element: <Categories /> },
      { path: "Category/:id", element: <CategoryProducts /> },
      { path: "Brands", element: <Brands /> },
      { path: "SearchProducts", element: <SearchProducts /> },
      { path: "Deals", element: <Deals /> },
      { path: "Offers", element: <Offers /> },
      { path: "FeaturedProducts", element: <FeaturedProducts /> },
      { path: "RecentlyAdded", element: <RecentlyAdded /> },

      // Protected
      {
        path: "Cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "Checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "WishList",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "Favourites",
        element: (
          <ProtectedRoute>
            <Favourites />
          </ProtectedRoute>
        ),
      },
      {
        path: "Orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "Account",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
      { path: "track-order", element: <TrackOrder /> },

      // Informational
      { path: "About", element: <About /> },
      { path: "Contact", element: <Contact /> },
      { path: "Terms", element: <Terms /> },
      { path: "Privacy-Policy", element: <PrivacyPolicy /> },
      { path: "ShippingPolicy", element: <ShippingPolicy /> },

      // Dev
      { path: "Loading", element: <Loading /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <OffLineScreen>
        <AuthProvider>
          <WishListProvider>
            <CartProvider>
              <RouterProvider router={router} />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                closeButton={false}
                closeOnClick={true}
              />
            </CartProvider>
          </WishListProvider>
        </AuthProvider>
      </OffLineScreen>
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}

export default App;
