import React, { useState } from "react";
import { IoAdd, IoBagHandle, IoRemove } from "react-icons/io5";

import { RxCrossCircled } from "react-icons/rx"
import { Link } from "react-router-dom";
const Cart = ({ setOpenCart }) => {
  const cartData = [{
    id: 1,
    name: "Iphone 14 pro max 256 gb ssd and 8gb RAM silver color ",
    description: "test",
    price: 999,
    img: ""
  }]
  return <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b]  z-40">

    <div className="fixed top-0 right-0 min-h-full  w-[35%]  bg-white    flex flex-col   shadow-md z-50 ">


      <div className="absolute right-5 top-5">
        <RxCrossCircled size={30} on onClick={() => setOpenCart(false)} />
      </div>
      <div>

        <div className="flex items-center p-4 mt-10 ">
          <IoBagHandle size={30} />
          <h5 className="pl-2  text-[20px] font-[500]">3Items</h5>
        </div>

        <div className="w-full border-t">
          {
            cartData.map((data) => (
              <CartSingle data={data} key={data.id}
              />
            ))
          }
        </div>
          {/* check out button */}
          <Link to="/checkout" >
            <button className="h-[45px] bg-red-600  w-fit px-6 text-white rounded-md  m-4 hover:opacity-90 ">Checkout Now (USD $1080)</button>
          </Link>
        
        </div>
   

    </div>
  </div>
};

export default Cart;


const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);


  return (
    <div className="border-b p-5 relative">
      <div className="w-full flex items-center gap-3">
        <div className="flex flex-col gap-3 w-[20%] items-center">
          <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center cursor-pointer"><IoAdd color="white" fontWeight={"600"} /></div>
          <p className="">{value}</p>
          <div className="w-6 h-6 bg-slate-300 rounded-full flex items-center justify-center cursor-pointer"><IoRemove color="white" fontWeight={"600"} /></div>

        </div>

        <img className="w-[80px] h-[80px] ml-2 rounded-sm" src={"https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=400"} alt="not found" />
        <div className="pl-2">
          <h1 className="mb-1">{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082] mb-1">${data.price}*{value}</h4>
           <h3 className="font-[600] text-[17px] text-[#ed1212] font-Roboto">US${data.price*value}</h3>
        </div>

        <div className=" absolute  top-2 right-2 cursor"><RxCrossCircled/></div>


      </div>



    </div>

  )
}