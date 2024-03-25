import React, { useState } from 'react'
import {  AiOutlineFolder, AiOutlineGift, AiOutlineMoneyCollect, AiOutlineRadiusSetting, AiOutlineSetting, AiOutlineShopping } from 'react-icons/ai'
import { BiMessage, BiPackage } from 'react-icons/bi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { RxDashboard } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { RiRefund2Line } from "react-icons/ri";


const DashboardSideBar = () => {

    const [active,setActive] = useState(1)
    return (
        <div className='w-full  bg-white min-h-[89vh]  shadow-sm  sticky top-0 left-0 z-10'>
            {/* single item */}
            <div className="w-full flex items-center p-4">
                <Link to="/dashboard" className="w-full  flex items-center" onClick={()=>setActive(1)}>
                    <RxDashboard size={25} color={`${active == 1 ? "red" : "#555"}`} />
                    <h5 className={`hidden 800px:flex pl-2 text-sm 800px:text-lg  font-Poppins ${active == 1 ? "text-[crimson]" : "text-gray-600"}`}>Dashboard</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="all-orders" className="w-full  flex items-center" onClick={()=>setActive(2)}>
                    <AiOutlineShopping size={25} color={`${active == 2 ? "red" : "#555"}`} />
                    <h5 className={`hidden 800px:flex pl-2 text-sm 800px:text-lg  font-Poppins ${active == 2 ? "text-[crimson]" : "text-gray-600"}`}>All order</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="products" className="w-full  flex items-center" onClick={()=>setActive(3)}>
                    <BiPackage size={25} color={`${active == 3 ? "red" : "#555"}`} />
                    <h5 className={`hidden 800px:flex pl-2 text-sm 800px:text-lg  font-Poppins ${active == 3 ? "text-[crimson]" : "text-gray-600"}`}>All Product</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="create-product" className="w-full  flex items-center" onClick={()=>setActive(4)}>
                    <AiOutlineFolder size={25} color={`${active === 4 ? "red" : "#555"}`} />
                    <h5 className={`hidden 800px:flex pl-2 text-sm 800px:text-lg  font-Poppins ${active == 4 ? "text-[crimson]" : "text-gray-600"}`}>Create Products</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="events" className="w-full  flex items-center" onClick={()=>setActive(5)}>
                    <MdOutlineLocalOffer size={25} color={`${active == 5 ? "red" : "#555"}`} />
                    <h5 className={`hidden 800px:flex pl-2 text-sm 800px:text-lg  font-Poppins ${active == 5 ? "text-[crimson]" : "text-gray-600"}`}>All Events</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="create-event" className="w-full  flex items-center" onClick={()=>setActive(6)}>
                    <MdOutlineLocalOffer size={25} color={`${active == 6 ? "red" : "#555"}`} />
                    <h5 className={`hidden 800px:flex pl-2 text-sm 800px:text-lg  font-Poppins ${active == 6 ? "text-[crimson]" : "text-gray-600"}`}>Create Events</h5>
                </Link>
            </div>
            {/* <div className="w-full flex items-center p-4">
                <Link to="withdraw-money" className="w-full  flex items-center" onClick={()=>setActive(7)}>
                    <AiOutlineMoneyCollect size={25} color={`${active == 7 ? "red" : "#555"}`} />
                    <h5 className={`hidden 800px:flex pl-2 text-sm 800px:text-lg  font-Poppins ${active == 7 ? "text-[crimson]" : "text-gray-600"}`}>WidthDraw Money</h5>
                </Link>
            </div> */}

            {/* <div className="w-full flex items-center p-4">
                <Link to="message" className="w-full  flex items-center" onClick={()=>setActive(8)}>
                    <BiMessage size={25} color={`${active == 8 ? "red" : "#555"}`} />
                    <h5 className={`hidden 800px:flex pl-2 text-sm 800px:text-lg  font-Poppins ${active == 8 ? "text-[crimson]" : "text-gray-600"}`}>Shop Inbox</h5>
                </Link>
            </div> */}

            <div className="w-full flex items-center p-4">
                <Link to="coupons" className="w-full  flex items-center" onClick={()=>setActive(9)}>
                    <AiOutlineGift size={25} color={`${active == 9 ? "red" : "#555"}`} />
                    <h5 className={`hidden 800px:flex pl-2 text-sm 800px:text-lg  font-Poppins ${active == 9 ? "text-[crimson]" : "text-gray-600"}`}>Discount Code</h5>
                </Link>
            </div>
            {/* <div className="w-full flex items-center p-4">
                <Link to="coupon" className="w-full  flex items-center" onClick={()=>setActive(10)}>
                    <RiRefund2Line size={25} color={`${active == 10 ? "red" : "#555"}`} />
                    <h5 className={`hidden 800px:flex pl-2 text-sm 800px:text-lg  font-Poppins ${active == 10 ? "text-[crimson]" : "text-gray-600"}`}>Order Refund</h5>
                </Link>
            </div>
            <div className="w-full flex items-center p-4">
                <Link to="setting" className="w-full  flex items-center" onClick={()=>setActive(11)}>
                    <AiOutlineRadiusSetting size={25} color={`${active == 11 ? "red" : "#555"}`} />
                    <h5 className={`hidden 800px:flex pl-2 text-sm 800px:text-lg  font-Poppins ${active == 11 ? "text-[crimson]" : "text-gray-600"}`}>Settings</h5>
                </Link>
            </div> */}

        </div>
    )
}

export default DashboardSideBar