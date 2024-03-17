import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./../../styles/styles.js"
import { useNavigate, useParams } from 'react-router-dom'
import { sellerLogout } from '../../redux/actions/seller.js'
import axios from 'axios'

const ShopInfo = ({ isOwner }) => {
  const { seller } = useSelector(state => state.seller);
  const [shopInfo, setShopInfo] = useState(seller);
  const { shopId } = useParams();
  console.log(shopId)
  useEffect(() => {
    if (!isOwner) {
    const fetchSellerInfo = async () => {
      try {
        const {data} = await axios.get(import.meta.env.VITE_PROXY+ `/shop/${shopId}` ,{withCredentials:true})
        setShopInfo(data.seller)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchSellerInfo();
    }
  },[shopId])


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    dispatch(sellerLogout(navigate))
  }
  return (
    <div className='w-full py-5 font-Poppins'>
      <div className="w-full flex items-center justify-center ">
        <img src={import.meta.env.VITE_IMAGE + seller?.avatar} alt="not found"
          className='w-[150px] h-[150px] object-cover rounded-full bg-purple-500'
        />
      </div>
      <h3 className='text-center py-2  text-xl'> {shopInfo?.name}</h3>
      <p className='text-md font-Poppins text-slate-800 p-3 flex items-center'>{seller?.descripttion || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text "}</p>
      <div className="p-3">
        <h5 className='font-medium'> Address</h5>
        <h4 className='text-slate-600'>{shopInfo?.address}</h4>
      </div>
      <div className="p-3">
        <h5 className='font-medium'> Phone Number</h5>
        <h4 className='text-slate-600'>{shopInfo?.phoneNumber}</h4>
      </div>
      <div className="p-3">
        <h5 className='font-medium'> Total Product</h5>
        <h4 className='text-slate-600'>10</h4>
      </div>
      <div className="p-3">
        <h5 className='font-medium'> Joined On</h5>
        <h4 className='text-slate-600'>{shopInfo?.createdAt.slice(0,10)}</h4>
      </div>
      {
        isOwner && (
          <div className='p-3'>
            <div className={`${styles.button} w-full`} ><span className='text-white'>Edit Shop</span></div>
            <div className={`${styles.button} w-full`} onClick={logoutHandler}><span className='text-white'>Logout</span></div>
          </div>
        )
      }
    </div>
  )
}

export default ShopInfo