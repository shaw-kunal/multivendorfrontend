import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./Routes.js";
import "./App.css";
import SignUp from "./components/signUp/SignUp.jsx";
import ActivationPage from "./pages/ActivationPage.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/activation/:activation_token" element={<ActivationPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
