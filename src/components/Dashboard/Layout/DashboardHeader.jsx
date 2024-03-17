import React from 'react'
import {  AiOutlineGift, AiOutlineShopping } from 'react-icons/ai'
import { BiMessageSquareDetail, BiPackage } from 'react-icons/bi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const DashboardHeader = () => {
  const { seller } = useSelector(state => state.seller)
  console.log(seller);
  return (
    <div>
      <div className="w-full h-[80px] bg-white shadow  sticky top-0 z-30 flex items-center justify-between ">
        <div >
          <Link to="/" >

            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt=""
            />

          </Link>
        </div>

        <div className="flex items-center mr-4">
          <div className="flex items-center">
            <Link to={"/dashboard/coupon"} className='hidden 800px:block'>
              <AiOutlineGift color='#555' size={30} className='mx-5 cursor-pointer' />
            </Link>
            <Link to={"/dashboard-events"} className='hidden 800px:block'>
              <MdOutlineLocalOffer color='#555' size={30} className='mx-5 cursor-pointer' />
            </Link>
            <Link to={"/dashboard-products"} className='hidden 800px:block'>
              <AiOutlineShopping color='#555' size={30} className='mx-5 cursor-pointer' />
            </Link>
            <Link to={"/dashboard-products"} className='hidden 800px:block'>
              <BiPackage color='#555' size={30} className='mx-5 cursor-pointer' />
            </Link>
            <Link to={"/dashboard-messages"} className='hidden 800px:block'>
              <BiMessageSquareDetail color='#555' size={30} className='mx-5 cursor-pointer' />
            </Link>
            <Link to={`/shop/${seller?._id}`}>
            <img src={import.meta.env.VITE_IMAGE +`${seller?.avatar}`} alt="Avatar" className='w-8 h-8 rounded-full' />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DashboardHeader