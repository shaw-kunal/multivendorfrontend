import React from "react";
import Header from "../components/Layout/Header.jsx";
import Hero from "../components/Route/Hero/Hero.jsx";
import Catagories from "../components/Route/Catagories/Catagories.jsx";
import BestDeals from "../components/Route/BestDeals/BestDeals.jsx";
import Events from "../components/Route/Events/Events.jsx";
import FeaturedProducts from "../components/Route/FeaturedProducts/FeaturedProducts.jsx";
import Sponsored from "../components/Route/Sponsored/Sponsored.jsx";
import Footer from "../components/Layout/Footer.jsx";
const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Catagories />
      <BestDeals />
      <Events />
      {/* <FeaturedProducts /> */}
      <Sponsored />
      <Footer />
    </div>
  );
};

export default HomePage;
