import React, { useState } from "react";
import { IoAdd, IoBagHandle, IoRemove } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";

import { RxCrossCircled } from "react-icons/rx"
import { Link } from "react-router-dom";
const Wishlist = ({ setOpenWishlist }) => {
  const cartData = [{
    id: 1,
    name: "Iphone 14 pro max 256 gb ssd and 8gb RAM silver color ",
    description: "test",
    price: 999,
    img: ""
  }]
  return <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] z-40">

    <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col  shadow-md z-50 ">


      <div className="absolute right-5 top-5">
        <RxCrossCircled size={30} on onClick={() => setOpenWishlist(false)} />
      </div>
      <div>

        <div className="flex items-center p-4 mt-10 ">
          <IoBagHandle size={30} />
          <h5 className="pl-2  text-[20px] font-[500]">3Items</h5>
        </div>

        <div className="w-full border-t">
          {
            cartData.map((data) => (
              <WishlistSingle data={data} key={data.id}
              />
            ))
          }
        </div>
        
        </div>
   

    </div>
  </div>
};

export default Wishlist;


const WishlistSingle = ({ data }) => {

  return (
    <div className="border-b p-5  my-4">
      <div className="w-full flex items-center gap-3">
      <RxCrossCircled size={"40px"}/>
        <img className="w-[70px] h-[70px] ml-2 rounded-sm" src={"https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=400"} alt="not found" />
        <div className="pl-2">
          <h1 className="mb-1">{data.name}</h1>
           <h3 className="font-[600] text-[17px] text-[#ed1212] font-Roboto">US${data.price}</h3>
        </div>
<FaCartShopping className="cursor-pointer" size={"50px"} />

</div>



    </div>

  )
}