import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FaqPage,
  ProductDetailsPage,
  ProfilePage,
  CheckoutPage,
  ShopCreatePage,
  SellerActivationPage,
  ShoploginPage,
  ShopHomePage,
  ShopDashboardpage
} from "./routes/Routes.js";
import "./App.css";
import SignUp from "./components/signUp/SignUp.jsx";
import ActivationPage from "./pages/ActivationPage.jsx";
import Store from "./redux/store.js";
import { loadUser } from "./redux/actions/user.js";
import { useSelector } from "react-redux";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.jsx";
import ProtectedRoute from "./routes/protectedRoute.jsx";

const App = () => {

  useEffect(() => {
    Store.dispatch(loadUser());
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/Faq" element={<FaqPage />} />

        {/* shop route */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShoploginPage />} />
        <Route path="/shop/:id" element={
          <SellerProtectedRoute>
            <ShopHomePage/>
          </SellerProtectedRoute>
        } />

        <Route  path="/dashboard" element={

        <SellerProtectedRoute>
            <ShopDashboardpage/>
          </SellerProtectedRoute>
        }/>

        <Route path="/checkout" element={
          <ProtectedRoute >
            <CheckoutPage />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute >
            <ProfilePage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
