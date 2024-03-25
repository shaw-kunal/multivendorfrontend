import axios from 'axios';
import { Country } from 'country-state-city';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShopOrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(import.meta.env.VITE_PROXY + `/order/get-order/${id}`);
                setOrder(data.order);
            } catch (error) {
                console.log("something went wrong");
            }
            finally {
                setLoading(false)
            }
        };
        fetchData();
    }, []);

    console.log(order);
    return (
        <div className='mx-5 mt-5 w-full font-Roboto'>

            {
                order && <div className='w-[90%] 1100px:w-1/2 bg-white shadow-lg px-5 py-5 rounded-lg'>
                    <div className='flex justify-end w-full'>
                        <button className=' bg-teal-500 text-white px-4 py-2 shadow-md rounded-sm'>update</button>
                    </div>
                    {order && order.cart.map((item) => (
                        <div key={item._id} className='flex mt-6 items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <div className='w-[40px] h-[40px]'>
                                    <img className='w-full h-full rounded-full object-fit' src={import.meta.env.VITE_IMAGE + item.images[0]} alt="" />
                                </div>
                                <div>
                                    <div className='font-Poppins text-teal-400'>{item.name}</div>
                                </div>
                            </div>
                            <div className='font-Roboto text-slate-700 flex gap-2'>
                                <span>${item.discountPrice}</span>
                                <span>X</span>
                                <span>{item.qty}</span>
                            </div>
                        </div>
                    ))}
                    {/* Remaining fields */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold">Shipping Address</h2>
                        <p>Address Line 1: {order.shippingAddress.address1}</p>
                        <p>Address Line 2: {order.shippingAddress.address2}</p>
                        <p>Zip Code: {order.shippingAddress.zipCode}</p>
                        <p>Country: Country.getCountryByCode(order.shippingAddress.country)</p>
                        <p>State: {order.shippingAddress.state}</p>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold">Payment Information</h2>
                        <p>ID: {order.paymentInfo.id}</p>
                        <p>Status: {order.paymentInfo.status}</p>
                        <p>Type: {order.paymentInfo.type}</p>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold">User Information</h2>
                        <p>Name: {order.user.name}</p>
                        <p>Email: {order.user.email}</p>
                        <p>Phone Number: {order.user.phoneNumber}</p>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold">Order Details</h2>
                        <p>Total Price: ${order.totalPrice}</p>
                        <p>Order Status: {order.orderStatus}</p>
                        <p>Paid At: {Date(order.paidAt).slice(0,21)}</p>
                    </div>
                </div>

            }
        </div>
    );
};

export default ShopOrderDetails;
