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
  ShopPreviewPage
} from "./routes/Routes.js";

import {
  ShopDashboardpage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  DashboardHomePage,
  ShopAllEvents,
  ShopAllCoupon,
  ShopAllOrders,
  ShopOrderDetails,
} from "./routes/ShopRoutes.js"
import "./App.css";
import SignUp from "./components/signUp/SignUp.jsx";
import ActivationPage from "./pages/ActivationPage.jsx";
import Store from "./redux/store.js";
import { loadUser } from "./redux/actions/user.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.jsx";
import ProtectedRoute from "./routes/protectedRoute.jsx";
import { loadSeller } from "./redux/actions/seller.js";
import Shipping from "./components/checkout/Shipping.jsx";
import Payment from "./components/checkout/Payment.jsx";
import PaymentSuccess from "./components/checkout/PaymentSuccess.jsx";

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
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
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/Faq" element={<FaqPage />} />

        {/* shop route */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShoploginPage />} />
        <Route path="/shop/preview/:shopId" element={<ShopPreviewPage />} />

        <Route path="/shop/:id" element={
          <SellerProtectedRoute>
            <ShopHomePage />
          </SellerProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <SellerProtectedRoute>
            <ShopDashboardpage />
          </SellerProtectedRoute>
        }>
          <Route index element={
            <DashboardHomePage />
          } />
          <Route path="create-product" element={
            <ShopCreateProduct />
          } />
          <Route path="products" element={
            <ShopAllProducts />
          } />
          <Route path="all-orders" element={
            <ShopAllOrders />
          } />
          
          <Route path="order/:id" element={
            <ShopOrderDetails />
          } />
          
          <Route path="create-event" element={
            <ShopCreateEvents />
          } />
          <Route path="events" element={
            <ShopAllEvents />
          } />
          <Route path="coupons" element={
            <ShopAllCoupon />
          } />
         
        </Route>


        <Route path="/checkout" element={
          <ProtectedRoute >
            <CheckoutPage />
          </ProtectedRoute>
        } >
          <Route path="shipping" element=<Shipping /> />
          <Route path="payment" element=<Payment /> />
          <Route path="success" element={<PaymentSuccess /> }/>
        </Route>

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
