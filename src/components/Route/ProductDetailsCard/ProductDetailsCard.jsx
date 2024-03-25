import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    setClick(wishlist.some(item => item._id === data._id))
  }, [wishlist])



  const handleMessageSubmit = () => { };

  const incrementCount = () => {
    if (data.stock > count) {
      setCount(count + 1);
    } else {
      toast.error(`Stock limit exceeds${data.stock} ${count}`);
    }
  };
  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleAddToCart = () => {
    console.log(cart);
    const isItemExist =
      cart && cart.find((i) => i._id === data._id && i.qty === count);

    if (isItemExist) {
      toast.error("item is already in cart!");
    } else {
      const cartData = { ...data, qty: count };
      dispatch(addToCart(cartData));
      toast.success("Item added to cart");
    }
  };

  const wishlishHandler = () => {
    if (!click) {
      dispatch(addToWishlist(data));
      setClick(true);
    } else {
      dispatch(removeFromWishlist(data));
      setClick(false);
    }
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%] overflow-hidden">
                <img
                  className="mb-3"
                  src={import.meta.env.VITE_IMAGE + data.images[0]}
                  alt="product_img"
                />
                <div className="flex items-center">
                  <img
                    // src={data.shop.shop_avatar.url }
                    src={
                      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
                    }
                    alt="shop_avatar"
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <Link to={`/shop/preview/${data?.shopId}`}>
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                    </Link>
                    <h5 className="pb-3 text-[15px]">
                      {data?.shop?.ratings} Ratings
                    </h5>
                  </div>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5">
                  ({data.total_sell}) Sold out
                </h5>
              </div>
              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data?.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data?.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {/* issue here price not showing */}
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2 mx-1 rounded">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>

                  <div>
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer"
                      color={click ? "red" : "#333"}
                      title={
                        click ? "Added to wishlist" : "Removed from wishlist"
                      }
                      onClick={wishlishHandler}
                    />
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span
                    className="text-[#fff] flex items-center"
                    onClick={handleAddToCart}
                  >
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
