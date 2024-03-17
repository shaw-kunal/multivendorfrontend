import React, { useEffect, useState } from 'react'
import { productData } from "../../static/data"
import ProductCard from '../Route/ProductCard/ProductCard';
import { Link, useParams } from 'react-router-dom';
import styles from '../../styles/styles';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ShopProfileData = ({ isOwner }) => {
  console.log(isOwner)
  const [active, setActive] = useState(1);
  const { seller } = useSelector(state => state.seller)
  const [products, setAllProducts] = useState([]);
  const { shopId } = useParams();


  useEffect(() => {
    const id = isOwner ? seller._id : shopId;
    const fetchAllProduct = async () => {
      try {
        const { data } = await axios.get(import.meta.env.VITE_PROXY + `/product/get-all-products-shop/${id}`);
        setAllProducts(data.products)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }
    fetchAllProduct();


  }, [shopId, seller])

  return (
    <div className='w-full'>
      <div className="flex  items-center justify-between  gap-2">
        <div className='flex justify-between w-full'>
          <div className='flex items-center'>
            <h5 className={`font-medium text-lg   ${active == 1 ? " text-red-500 " : " text-slate-500 "}  cursor-pointer `} onClick={() => setActive(1)}> Shop Product</h5>
          </div>
          <div className='flex items-center'>
            <h5 className={`font-medium text-lg  ${active == 2 ? " text-red-500 " : " text-slate-500 "} cursor-pointer`} onClick={() => setActive(2)}> Running Event</h5>
          </div>
          <div className='flex items-center'>
            <h5 className={`font-medium text-lg ${active == 3 ? " text-red-500 " : " text-slate-500 "} cursor-pointer`} onClick={() => setActive(3)}> Shop View</h5>
          </div>
        </div>
        <div>
          {
            isOwner &&
            <Link to="/dashboard">
              <div className={`${styles.button} !rounded-1`}>
                <span className='text-white'>Go Dashboard</span>
              </div>
            </Link>
          }
        </div>
      </div>

      <br />

      <div className='grid grid-cols-1 gap-5 md:grid-cols-2  lg:grid-cols-3  xl:grid-cols-4 xxl:grid-col-5 mb-10 '>
        {
          products.map((i, index) => (
            <ProductCard data={i} key={index} ishop={true} />
          ))

        }
      </div>

    </div>
  )
}

export default ShopProfileData