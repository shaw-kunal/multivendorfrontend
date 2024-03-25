import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import { productData } from "../static/data";
import axios from "axios";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);


  useEffect(() => {
    // Define a function to fetch data from the API
    const fetchData = async () => {
      try {

        if (categoryData) {
          const { data } = await axios.get(import.meta.env.VITE_PROXY + `/product?category=${categoryData}`);
          setData(data.products); // Update state with fetched data


        } else {

          const { data } = await axios.get(import.meta.env.VITE_PROXY + `/product/`);
          setData(data.products); // Update state with fetched data

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();

    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0);
  }, [categoryData]); //
  console.log("product>>", data)
  return (
    <>
      <div>
        <Header activeHeading={2} />
        <br />
        <br />
        <div className={`${styles.section}`}>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {
              data.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
          {data.length === 0 ? (
            <h1 className="text-center w-full pb-[100px] text-[20px]">
              No products Found!
            </h1>
          ) : null}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProductsPage;
