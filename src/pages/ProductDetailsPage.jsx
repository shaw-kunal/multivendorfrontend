import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductDetails from '../components/Products/ProductDetails.jsx'
import SuggestedProduct from "../components/Products/SuggestedProduct.jsx"
import { useParams } from 'react-router-dom'
import { productData } from '../static/data.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
const ProductDetailsPage = () => {

  const [data, setData] = useState('')
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(import.meta.env.VITE_PROXY + `/product/${id}`)
        setData(data?.product);
      } catch (error) {
        console.log(error)
        toast.error(error.reponse.data.message);
      }

    }
    fetchData();
  }, [])

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {
        data && <SuggestedProduct data={data} />
      }
      <Footer />
    </div>
  )
}

export default ProductDetailsPage