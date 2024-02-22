import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FaqPage,
} from "./Routes.js";
import "./App.css";
import SignUp from "./components/signUp/SignUp.jsx";
import ActivationPage from "./pages/ActivationPage.jsx";
const App = () => {
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
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/Faq" element={<FaqPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
