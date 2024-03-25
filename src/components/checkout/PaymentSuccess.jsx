import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useOutletContext } from 'react-router-dom'


const PaymentSuccess = () => {

  const { user } = useSelector(state => state.user)
  const { state:{orderId,orderData} } = useLocation();
  const [subtotal, totalPrice, discountPrice, shippingCost] = useOutletContext();
  


  return (

    <div className='bg-red-white mt-5 mb-10 flex items-center justify-center'>
      <div className='w-4/5 min-h-[400px] bg-white rounded-md shadow-lg p-8 '>
        <div className='flex justify-between items-end mb-5'>
          <div >
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt=""
            />        </div>
          <p className='font-Poppins font-normal text-gray-400'>Order Confirmation</p>
        </div>
        <div>
          <h1 className='text-teal-300 font-Roboto  font-medium text-2xl'>Hello  {user.name}</h1>
          <p className='text-gray-500 font-Roboto'>Thanks you for shopping with us. We'll send a confirmation when your item ships.</p>
        </div>

        <div>
          <div className='mt-8 flex items-center justify-between pb-4 border-b-2'>
            <div className='flex gap-2 font-Roboto text-slate-500 text-xl'>
              <p>Order: </p>
              <span>{ orderId || "#00000jwlkcennknn"}</span>
            </div>
            <button className='font-Poppins bg-teal-500 text-white px-2 1100:px-4 py-3 rounded-md text-sm '>Manage Order</button>

          </div>

          {
            orderData.cart.map((item) => (
              <div key={item._id} className='flex mt-6 items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='w-[40px] h-[40px]  '>
                    <img className='w-full h-full rounded-full object-fit' src={import.meta.env.VITE_IMAGE + item.images[0]} alt="" />
                  </div>
                  <div>
                    <div className='font-Poppins text-teal-400 '>{item.name}</div>
                  </div>
                </div>
                <div className='font-Roboto text-slate-700  flex gap-2'>
                  <span> ${item.discountPrice}</span>
                  <span>X</span>
                  <span>{item.qty}</span>
                </div>
              </div>


            ))
          }
        </div>
        <div className='mt-4  w-full flex flex-col items-end gap-4'>
          <div className='font-Roboto flex w-[250px] justify-between'>
            <span>total:</span>
            <span>${orderData.subtotal}</span>
          </div>
          <div className='font-Roboto flex w-[250px] justify-between'>
            <span>Shipping:</span>
            <span>${orderData.shippingCost}</span>
          </div>
          <div className='font-Roboto flex w-[250px] justify-between'>
            <span>Discount:</span>
            <span>-${orderData.discountPrice}</span>
          </div>
          <div className='font-Roboto flex w-[250px] justify-between'>
            <span>Total Price:</span>
            <span>${orderData.totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess

