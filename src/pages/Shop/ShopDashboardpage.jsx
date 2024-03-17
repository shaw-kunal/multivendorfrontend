import React, { useState } from 'react'
import DashboardHeader from "../../components/Dashboard/Layout/DashboardHeader.jsx"
import DashboardSideBar from "../../components/Dashboard/Layout/DashboardSideBar.jsx"
import { Outlet } from 'react-router-dom'
const ShopDashboardpage = ({outlet}) => {
 


return (
    <div>
      <DashboardHeader/>
      <div className="flex  justify-between  w-full">
        <div className=" w-fit mx-2  800px:w-[20%] ">
          <DashboardSideBar  />
        </div>
        <div className='w-full p-4 mx-4 flex justify-center'>
        
        <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default ShopDashboardpage