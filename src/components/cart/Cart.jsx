import React, { useState } from "react";
import { IoAdd, IoBagHandle, IoRemove } from "react-icons/io5";

import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { changeQty, removeItem } from "../../redux/actions/cart";
const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b]  z-40">
      <div className="fixed top-0 right-0 min-h-full  w-[35%]  bg-white    flex flex-col   shadow-md z-50 ">
        <div className="absolute right-5 top-5">
          <RxCrossCircled size={30} on onClick={() => setOpenCart(false)} />
        </div>
        <div>
          <div className="flex items-center p-4 mt-10 ">
            <IoBagHandle size={30} />
            <h5 className="pl-2  text-[20px] font-[500]">{cart.length}  Items</h5>
          </div>

          <div className="w-full border-t">
            {cart.map((data) => (
              <CartSingle data={data} key={data.id} />
            ))}
          </div>
          {/* check out button */}
          {cart && cart.length > 0 ?(
            <Link to="/checkout/shipping">
              <button className="h-[45px] bg-green-600  w-fit px-6 text-white rounded-md  m-4 hover:opacity-90 ">
                Checkout Now 
              </button>
            </Link>
          ):<p className="p-2 font-Poppins bg-teal-400 m-2 rounded-md text-white ">Cart is Empty</p> 
          
          }
        </div>
      </div>
    </div>
  );
};

export default Cart;

const CartSingle = ({ data }) => {
  const [qty, setQty] = useState(data.qty);

  const dispatch = useDispatch();

  const handleChangeQty = (a) => {
    if (a === 1) {
      if (qty >= data.stock) {
        toast.error("Quantity exceeds the stock limit");
        return;
      } else {
        setQty(qty + 1);
        dispatch(changeQty({ ...data, qty: data.qty + 1 }));
      }
    } else {
      if (qty <= 1) return;
      setQty(qty - 1);
      dispatch(changeQty({ ...data, qty: data.qty - 1 }));
    }
  };

  const handleItemRemove = () => {
    dispatch(removeItem(data._id));
  };

  return (
    <div className="border-b p-5 relative">
      <div className="w-full flex items-center gap-3">
        <div className="flex flex-col gap-3 w-[20%] items-center">
          <div
            onClick={() => handleChangeQty(1)}
            className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center cursor-pointer"
          >
            <IoAdd color="white" fontWeight={"600"} />
          </div>
          <p className="font-Poppins">{qty}</p>
          <div
            className="w-6 h-6 bg-slate-300 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => handleChangeQty(0)}
          >
            <IoRemove color="white" fontWeight={"600"} />
          </div>
        </div>

        <img
          className="w-[80px] h-[80px] ml-2 rounded-lg"
          src={import.meta.env.VITE_IMAGE + data.images[0]}
          alt="not found"
        />
        <div className="pl-2">
          <h1 className="mb-1">{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082] mb-1">
            ${data.discountPrice}*{qty}
          </h4>
          <h3 className="font-[600] text-[17px] text-green-500 font-Poppins">
            US${data.discountPrice * qty}
          </h3>
        </div>

        <div
          onClick={handleItemRemove}
          className=" absolute  top-2 right-2 cursor"
        >
          <RxCrossCircled />
        </div>
      </div>
    </div>
  );
};
