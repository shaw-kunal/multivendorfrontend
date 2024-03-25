import React, { useState } from "react";
import { IoAdd, IoBagHandle, IoRemove } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addToCart } from "../../redux/actions/cart";

const Wishlist = ({ setOpenWishlist }) => {
const dispatch = useDispatch();
  const { wishlist } = useSelector(state => state.wishlist);
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] z-40">
      <div className="fixed top-0 right-0 min-h-full w-[350px] 800px:w-[25%]  bg-white flex flex-col  shadow-md z-50 ">
        <div className="absolute right-5 top-5">
          <RxCrossCircled size={30} on onClick={() => setOpenWishlist(false)} />
        </div>
        <div>
          <div className="flex items-center p-4 mt-10 ">
            <IoBagHandle size={30} />
            <h5 className="pl-2  text-[20px] font-[500]">{wishlist.length} Items</h5>
          </div>

          <div className="w-full border-t">
            {wishlist.length > 0 ? wishlist.map((data) => (
              <WishlistSingle data={data} key={data.id} />
            )) : <p className="p-2 bg-teal-400 text-white m-2 font-Poppins rounded">No Item added  in your wishlist</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;



const WishlistSingle = ({ data }) => {

const dispatch = useDispatch();

const removeItem = () => {
    dispatch(removeFromWishlist(data))
  }
const handleClick = ()=>{
    dispatch(addToCart({...data,qty:1}))
    dispatch(removeFromWishlist(data))

  }



  return (
    <div className="border-b px-3 py-4 my-4">
      <div className="w-full flex items-center gap-3">
        <RxCrossCircled size={"40px"} fill="gray" cursor={"pointer"} onClick={removeItem} />
        <div className="w-[70px] h-[70px] ml-2 rounded-full overflow-hidden">
          <img
            className="w-full h-full "
            src={import.meta.env.VITE_IMAGE + data.images[0]}
            alt="not found"
          />
        </div>
        <div className="pl-2">
          <h1 className="mb-1">{data.name}</h1>
          <h3 className="font-[600] text-[17px] text-green-600 font-Roboto">
            US${data.discountPrice}
          </h3>
        </div>
        <div onClick={handleClick}>
          <FaCartShopping className="cursor-pointer" size={"30px"} fill="gray" />
        </div>
      </div>
    </div>
  );
};
