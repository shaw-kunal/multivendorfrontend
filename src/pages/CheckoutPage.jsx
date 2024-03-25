import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import CheckoutStep from '../components/checkout/CheckoutStep'
import Checkout from '../components/checkout/Checkout.jsx'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Layout/Footer.jsx'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Hidden } from '@mui/material'

const CheckoutPage = () => {

  const [active,setActive] = useState(3)
  const { cart } = useSelector(state => state.cart);
  const [subtotal, setSubtotal] = useState(0)
  const [shippingCost, setShippingCost] = useState(0)
  const [discountPrice, setDiscountPrice] = useState(0)
  const [couponCode, setCouponCode] = useState(null)
  const [couponCodeData, setCouponCodeData] = useState(null);


  const {pathname}  = useLocation();

  useEffect(()=>{
    const path = pathname.split('/').pop();

    console.log(path)
    if(path==="shipping")
      setActive(1);
    else if(path=='payment')
     setActive(2);
    else if(path==='success')
     setActive(3)
  },[pathname])




  const discountPercentenge = couponCodeData ? discountPrice : 0;
  const totalPrice = couponCodeData ? (subtotal + shippingCost - discountPercentenge).toFixed(2)
    : (subtotal + shippingCost).toFixed(2);

  console.log(couponCode)
  useEffect(() => {
    const subtotalPrice = cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0);
    setSubtotal(subtotalPrice);
    setShippingCost(subtotalPrice * 0.1);
  }, [cart])


  const handlSubmit = async (e) => {
    e.preventDefault();


    if (!couponCode) {
      toast.error("Please enter coupon code")
      return;
    }

    await axios.get(import.meta.env.VITE_PROXY + `/coupon/get-coupon-value/${couponCode}`)
      .then((res) => {

        const shopId = res.data.couponCode?.shopId;
        const couponCodeValue = res.data.couponCode?.value;
        if (res.data.couponCode !== null) {
          const isCouponValid = cart.filter(item => item.shopId === shopId);
          if (isCouponValid.length === 0) {
            toast.error("Coupon code is not valid for this shop");
            setCouponCode("");
          }
          else {
            const eligiblePrice = isCouponValid.reduce(
              (acc, item) => acc + item.qty * item.discountPrice, 0)
            const discountPrice = (eligiblePrice * couponCodeValue) / 100;
            setDiscountPrice(discountPrice);
            setCouponCodeData(res.data.couponCode);
          }
        }
        else {
          setCouponCodeData(null)
          toast.error("Coupon code doesn't exists!");
          setCouponCode("");
        }


      })


  }



  return (
    <div >
      <Header />
      <CheckoutStep active={active} />
      <div className='flex flex-col-reverse 800px:flex-row mx-4 gap-4'>
        <div className='flex-[3]'>
          <Outlet
            context={[subtotal,totalPrice,discountPrice,shippingCost]}
          />

        </div>
        <div className='flex-1'>

          <CartData
            subtotal={subtotal}
            shippingCost={shippingCost}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
            totalPrice={totalPrice}
            applycouponCode={handlSubmit}
            visible={active}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CheckoutPage

const CartData = ({ subtotal, shippingCost, couponCode, setCouponCode, discountPercentenge, totalPrice, applycouponCode,visible=1 }) => {
  return (
    <div className={`bg-white text-gray-600 font-Poppins p-5 m-4 rounded-md  flex flex-col gap-3 ${visible==3 && "hidden"}`}>
      <div className='flex justify-between mb-3 text-xl '>
        <span>subtotal</span>
        <span className='font-semibold'>${subtotal.toFixed(2)}</span>
      </div>
      <div className='flex justify-between mb-3 text-xl '>
        <span>Shipping</span>
        <span className='font-semibold'>${shippingCost.toFixed(2)}</span>
      </div>
      <div className='flex justify-between mb-4 text-xl '>
        <span>Discount</span>
        <span className='font-semibold '>-{discountPercentenge.toFixed(2)}</span>
      </div>
      <div className='w-full border mb-2'></div>
      <div className='flex justify-between mb-4 text-xl '>
        <span>Total</span>
        <div>
          <span className='font-normal line-through text-red-500'>{discountPercentenge !== 0 && `${Number(totalPrice) + Number(discountPercentenge)}`}</span>
          <span className='font-normal text-green-600 ml-4'>${totalPrice}</span>

        </div>
      </div>
      <div>
        <input
          type="text"
          className='w-full border p-2'
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder='Coupon Code' />
      </div>
      <div>
        <button className='bg-[#f63b60] p-2 w-full text-white mt-4 rounded-sm' onClick={applycouponCode}>{couponCode ? "Coupon Code Applied" : "Apply  coupon code"}</button>
      </div>

    </div>
  )
}