import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { productData } from '../../static/data';
import styles from '../../styles/styles';
import { IoAdd, IoRemove } from 'react-icons/io5';
import { BiHeart, BiMessageAltDots, BiSolidMessageAltDots } from 'react-icons/bi';
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';

const ProductDetails = ({data}) => {

    const [select, setSelect] = useState(0)
    const [click, setClick] = useState(false)
    const [count, setCount] = useState(1)


    const incrementCount = () => {
        setCount(count + 1)
    }

    const decrementCount = () => {
        if (count > 1)
            setCount(count - 1)
    }
  
    return (
        <div className='w-11/12 mx-auto 800px:w-[80%] min-h-fit my-20 '>

            {data ? <div>
                <div className='flex  flex-col 800px:flex-row gap-3 px-2 py-2'>
                    <div className='flex-1 flex flex-col gap-4 '>
                        <div className='w-full'>
                            <img className='w-[80%] mx-auto' src={data?.image_Url[select].url} alt="" />
                        </div>
                        <div className='flex gap-2'>
                            <div onClick={() => setSelect(0)} className={`w-full ${select === 0 ? "border" : ""} cursor-pointer border-cyan-400`}> <img src={data?.image_Url[0].url} alt="not found" /></div>
                            <div onClick={() => setSelect(1)} className={`w-full ${select === 1 ? "border" : ''} cursor-pointer border-cyan-400`}> <img src={data?.image_Url[1].url} alt="not found" /></div>
                        </div>

                    </div>
                    <div className='flex-1 pt-5 px-3 flex flex-col gap-5'>
                        <h1 className={`${styles.productTitle}`}>{data?.name}</h1>
                        <p className={`${styles.description} leading-[150%] `}>{data?.description}</p>
                        <div>
                            <span className={`${styles.discount_price}`}>{data?.discount_price}$</span>
                            <span className={`${styles.price}`}>{data?.price ? data.price + "$" : null}</span>
                        </div>

                        <div className='flex justify-between mt-6 mb-3'>
                            <div className='flex gap-[1px]'  >
                                <div onClick={incrementCount} className='w-8 h-8 flex items-center justify-center bg-gradient-to-r from-teal-400 shadow-lg rounded-sm to-teal-600 cursor-pointer '><IoAdd color='white' /></div>
                                <div className='w-8 h-8 flex items-center justify-center bg-slate-200 shadow-lg rounded-sm '>{count}</div>
                                <div onClick={decrementCount} className='w-8 h-8 flex items-center justify-center bg-gradient-to-r from-teal-400 to-teal-600  shadow-lg rounded-sm  cursor-pointer'><IoRemove color='white' /></div>
                            </div>
                            {click ? (
                                <AiFillHeart
                                    size={22}
                                    className="cursor-pointer "
                                    onClick={() => setClick(false)}
                                    color={click ? "red" : "#333"}
                                    title="Remove from wishlist"
                                />
                            ) : (
                                <AiOutlineHeart
                                    size={22}
                                    className="cursor-pointer "
                                    onClick={() => setClick(true)}
                                    color={click ? "red" : "#333"}
                                    title="Add to wishlist"
                                />
                            )}
                        </div>

                        <div className={`${styles.button} mt-6 rounded-mdh-11 flex items-center bg-gradient-to-l from-slate-800 `}>

                            <span className='text-[#fff] flex items-center '>
                                Add to cart <AiOutlineShoppingCart className='ml-1' size={'25px'} />
                            </span>
                        </div>

                        <div className='mt-10 flex  items-center'>

                            <img className="w-10 h-10 rounded-full" src={data.shop.shop_avatar.url} alt="" />

                            <div className='ml-4'>
                                <p className='text-blue-400'>{data.shop.name}</p>
                                <p>({data.shop.ratings}) Ratings</p>
                            </div>
                            <button className={` py-2 px-3 ml-6 rounded bg-violet-800 text-white flex gap-2 items-center cursor-pointer`}>Send Message <BiSolidMessageAltDots /></button>
                        </div>
                    </div>
                </div>
                <ProductDetailsInfo data={data} />

            </div> : ""}

        </div>
    )
}

export default ProductDetails

const ProductDetailsInfo = ({
    data
   }) => {
    const [active, setActive] = useState(1);

    return (
        <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
            <div className="w-full flex justify-between border-b pt-10 pb-2">
                <div className="relative">
                    <h5
                        className={
                            "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                        }
                        onClick={() => setActive(1)}
                    >
                        Product Details
                    </h5>
                    {active === 1 ? (
                        <div className={`${styles.active_indicator}`} />
                    ) : null}
                </div>
                <div className="relative">
                    <h5
                        className={
                            "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                        }
                        onClick={() => setActive(2)}
                    >
                        Product Reviews
                    </h5>
                    {active === 2 ? (
                        <div className={`${styles.active_indicator}`} />
                    ) : null}
                </div>
                <div className="relative">
                    <h5
                        className={
                            "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
                        }
                        onClick={() => setActive(3)}
                    >
                        Seller Information
                    </h5>
                    {active === 3 ? (
                        <div className={`${styles.active_indicator}`} />
                    ) : null}
                </div>
            </div>
            {active === 1 ? (
                <>
                    <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
                        {data.description}
                    </p>
                </>
            ) : null}

            {active === 2 ? (
                <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
                    <p>No Review Yet</p>
                </div>
            ) : null}

            {active === 3 && (
                <div className="w-full bg-slate-300 rounded-b-md flex flex-col 800px:flex-row  gap-5 p-5 space-y-6">
                    <div className="w-full 800px:w-2/3 ">
                        <div className='flex  items-center'>

                            <img className="w-10 h-10 rounded-full" src={data.shop.shop_avatar.url} alt="" />

                            <div className='m-4 '>
                                <p className='text-blue-400'>{data.shop.name}</p>
                                <p className='font-semibold'>({data.shop.ratings}) Ratings</p>
                            </div>

                        </div>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit id earum doloribus soluta odio maxime alias laudantium? Unde odit rerum numquam quibusdam sunt voluptatum. Quidem, nostrum ipsum. Minus, fuga necessitatibus.</p>
                    </div>
                    <div className="w-full 800px:w-1/3  flex flex-col items-end font-semibold gap-2 font-Poppins">
                      <p>Join on :25 Feb,2023</p>
                      <p>Total Products:1,223</p>
                      <p>Total Reviews:324</p>
                      <Link to="/">
                        <button className={`py-2 px-6 rounded-md  text-white cursor-pointer bg-gradient-to-r from-black to-slate-700`}>Visit Shop</button>
                      </Link>
                    </div>

                </div>
            )}
        </div>
    );
};
