import React from 'react'
import { RxPerson } from 'react-icons/rx'
import { CiInboxIn, CiLogout, CiShoppingCart } from "react-icons/ci";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { FaAddressCard, FaLocationDot } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';


const ProfileSideBar = ({ active, setActive }) => {
    const navigate = useNavigate();

    const logoutHandler = () =>{
        axios.get(import.meta.env.VITE_PROXY+ "/user/logout",{withCredentials:true}).then((res)=>{
            toast.success(res.data.message);
            window.location.reload(true);
            navigate("/login")

        }).catch((error)=>toast.error("Interval Server error"))
    }


    return (
        <div className='w-full bg-white shadow-sm rounded-lg p-4 pt-8 sticky top-14 '>
            <div onClick={() => setActive(1)} className='flex items-center cursor-pointer w-full mb-8'>
                <RxPerson size={20} color={active === 1 ? "red" : ""}  fontWeight={"600"}/>
                <span className={`pl-3  font-Poppins font-semibold ${active === 1 ? "text-red-500" : ""}  hidden 800px:block`}>Profile</span>
            </div>
            <div onClick={() => setActive(2)} className='flex items-center cursor-pointer w-full mb-8'>
                <CiShoppingCart size={20} color={active === 2 ? "red" : ""} fontWeight={"600"} />
                <span className={`pl-3  font-Poppins font-semibold ${active === 2 ? "text-red-500" : ""} hidden 800px:block`}>Orders</span>
            </div>
            {/* <div onClick={() => setActive(3)} className='flex items-center cursor-pointer w-full mb-8'>
                <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} fontWeight={"600"} />
                <span className={`pl-3  font-Poppins font-semibold ${active === 3 ? "text-red-500" : ""} hidden 800px:block`}>Reunds</span>
            </div>
            <div onClick={() => setActive(4)|| navigate("/inbox")} className='flex items-center cursor-pointer w-full mb-8'>
                <CiInboxIn size={20} color={active === 4 ? "red" : ""} fontWeight={"600"} />
                <span className={`pl-3  font-Poppins font-semibold ${active === 4? "text-red-500" : ""} hidden 800px:block`}>Inbox</span>
            </div>
            <div onClick={() => setActive(5)} className='flex items-center cursor-pointer w-full mb-8'>
                <FaLocationDot size={20} color={active === 5 ? "red" : ""}  />
                <span className={`pl-3  font-Poppins font-semibold ${active === 5? "text-red-500" : ""} hidden 800px:block`}>Track Order</span>
            </div> */}
            <div onClick={() => setActive(6)} className='flex items-center cursor-pointer w-full mb-8'>
                <MdPayment size={20} color={active === 6 ? "red" : ""}  />
                <span className={`pl-3  font-Poppins font-semibold ${active === 6? "text-red-500" : ""} hidden 800px:block`}>Change Password</span>
            </div>
            <div onClick={() => setActive(7)} className='flex items-center cursor-pointer w-full mb-8'>
                <FaAddressCard size={20} color={active === 7 ? "red" : ""}  />
                <span className={`pl-3  font-Poppins font-semibold ${active === 7? "text-red-500" : ""} hidden 800px:block`}>Address</span>
            </div>
            <div onClick={() => setActive(8) || logoutHandler()} className='flex items-center cursor-pointer w-full mb-8'>
                <CiLogout size={20} color={active === 8 ? "red" : ""}  />
                <span className={`pl-3  font-Poppins font-semibold ${active === 8? "text-red-500" : ""} hidden 800px:block`}>Logout</span>
            </div>

        </div>
    )
}

export default ProfileSideBar