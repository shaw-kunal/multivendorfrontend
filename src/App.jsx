import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./Routes.js";
import "./App.css";
import SignUp from "./components/signUp/SignUp.jsx";
import ActivationPage from "./pages/ActivationPage.jsx";
import Home from "./pages/Home.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const App = () => {

  useEffect(() => {
    axios.get(import.meta.env.VITE_PROXY+ "/user/getuser",{withCredentials:true})
    .then((req)=>console.log(req))
    .catch(err=>toast.error("please Login to continue"))

  }, [])
  
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
